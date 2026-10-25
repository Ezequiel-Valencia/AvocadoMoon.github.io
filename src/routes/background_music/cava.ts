// A port of the bar engine from cava (https://github.com/karlstav/cava), the terminal audio
// visualizer: cavacore.c turns audio into bar heights and cava.c's monstercat_filter can join
// neighboring bars into slopes. Kept close to the original so its look carries over; the
// names of cava's own steps are noted alongside.

/** cava's FFT length for mids and treble at this sample rate; the bass one is twice as long */
function fftSize(rate: number): number {
  let size = 512;
  if (rate > 8125 && rate <= 16250) size *= 2;
  else if (rate > 16250 && rate <= 32500) size *= 4;
  else if (rate > 32500 && rate <= 75000) size *= 8;
  else if (rate > 75000 && rate <= 150000) size *= 16;
  else if (rate > 150000 && rate <= 300000) size *= 32;
  else if (rate > 300000) size *= 64;
  return size;
}

/** How many of the most recent samples cava reads each frame (the bass FFT's length) */
export function cavaInputSize(rate: number): number {
  return fftSize(rate) * 2;
}

export interface CavaOptions {
  /** Lowest and highest frequencies the bars cover; cava's defaults are 50Hz and 10kHz */
  lowCutOff?: number;
  highCutOff?: number;
  /** cava's noise_reduction, 0-1: higher is smoother and slower. Its default is 0.77 */
  noiseReduction?: number;
  /** cava's monstercat smoothing: 0 is off (cava's default), 1 slopes each bar to its peaks */
  monstercat?: number;
}

// cava hands FFTW 16-bit samples; the browser gives -1 to 1, so they're scaled up to match
// the numbers its EQ expects
const SAMPLE_SCALE = 32768;
const BASS_CUT_OFF = 100;

export class Cava {
  readonly bars: number;
  private rate: number;
  private noiseReduction: number;
  private monstercat: number;

  private bassSize: number;
  private size: number;
  private bassWindow: Float32Array;
  private window: Float32Array;
  private bassFft: Fft;
  private fft: Fft;

  private lower: Int32Array;
  private upper: Int32Array;
  private eq: Float64Array;
  private bassCutOffBar = 0;

  private sens = 1;
  private sensInit = true;
  private framerate = 75;
  private out: Float64Array;
  private prevOut: Float64Array;
  private mem: Float64Array;
  private peak: Float64Array;
  private fall: Float64Array;

  constructor(bars: number, rate: number, options: CavaOptions = {}) {
    this.bars = bars;
    this.rate = rate;
    this.noiseReduction = options.noiseReduction ?? 0.77;
    this.monstercat = options.monstercat ?? 0;

    this.size = fftSize(rate);
    this.bassSize = this.size * 2;
    // Hann windows
    const hann = (length: number) =>
      Float32Array.from(
        { length },
        (_, i) => 0.5 * (1 - Math.cos((2 * Math.PI * i) / (length - 1)))
      );
    this.bassWindow = hann(this.bassSize);
    this.window = hann(this.size);
    this.bassFft = new Fft(this.bassSize);
    this.fft = new Fft(this.size);

    this.out = new Float64Array(bars);
    this.prevOut = new Float64Array(bars);
    this.mem = new Float64Array(bars);
    this.peak = new Float64Array(bars);
    this.fall = new Float64Array(bars);

    this.lower = new Int32Array(bars + 1);
    this.upper = new Int32Array(bars + 1);
    this.eq = new Float64Array(bars);
    this.distribute(options.lowCutOff ?? 50, options.highCutOff ?? 10000);
  }

  // "calculate cutoff frequencies and eq": spreads the bars exponentially between the cut-offs
  // and picks which FFT bins each one sums, taken from the longer bass FFT below 100Hz
  private distribute(lowerCutOff: number, upperCutOff: number) {
    const { bars, rate, bassSize, size, lower, upper } = this;
    const cutOff = new Float64Array(bars + 1);
    const relative = new Float64Array(bars + 1);
    const frequencyConstant = Math.log10(lowerCutOff / upperCutOff) / (1 / (bars + 1) - 1);
    const minBandwidth = rate / bassSize;
    let firstBar = true;

    for (let n = 0; n < bars + 1; n++) {
      let coefficient = -frequencyConstant;
      coefficient += ((n + 1) / (bars + 1)) * frequencyConstant;
      cutOff[n] = upperCutOff * 10 ** coefficient;

      if (n > 0 && cutOff[n - 1] >= cutOff[n]) cutOff[n] = cutOff[n - 1] + minBandwidth;

      // remember nyquist!
      relative[n] = cutOff[n] / (rate / 2);

      if (cutOff[n] < BASS_CUT_OFF) {
        // BASS
        lower[n] = Math.trunc(relative[n] * (bassSize / 2));
        this.bassCutOffBar++;
        if (this.bassCutOffBar > 1) firstBar = false;
        if (lower[n] > bassSize / 2) lower[n] = bassSize / 2;
      } else {
        // MID + TREBLE
        lower[n] = Math.ceil(relative[n] * (size / 2));
        if (n === this.bassCutOffBar) {
          firstBar = true;
          if (n > 0) upper[n - 1] = Math.trunc(relative[n] * (bassSize / 2) - 1);
        } else {
          firstBar = false;
        }
        if (lower[n] > size / 2) lower[n] = size / 2;
      }

      if (n > 0) {
        if (!firstBar) {
          upper[n - 1] = lower[n] - 1;

          // pushing the spectrum up if the exponential function gets "clumped" in the bass
          if (lower[n] <= lower[n - 1]) {
            const limit = n < this.bassCutOffBar ? bassSize / 2 + 1 : size / 2 + 1;
            if (lower[n - 1] + 1 < limit) {
              lower[n] = lower[n - 1] + 1;
              upper[n - 1] = lower[n] - 1;
            }
          }
        } else if (upper[n - 1] < lower[n - 1]) {
          upper[n - 1] = lower[n - 1] + 1;
        }
      }

      // calculate actual cut off frequency
      relative[n] = n < this.bassCutOffBar ? lower[n] / (bassSize / 2) : lower[n] / (size / 2);
      cutOff[n] = relative[n] * (rate / 2);
    }

    // hard coded eq: scales the FFT's huge numbers down and boosts the treble
    for (let n = 0; n < bars; n++) {
      let eq = 1 / 2 ** 28;
      eq *= cutOff[n + 1] ** 0.85;
      eq /= Math.log2(n < this.bassCutOffBar ? bassSize : size);
      eq /= upper[n] - lower[n] + 1;
      this.eq[n] = eq;
    }
  }

  /**
   * One frame: `samples` is the most recent audio, oldest first, at least cavaInputSize long;
   * `dt` is the seconds since the last frame. Returns each bar's height, 0-1, lowest first.
   */
  execute(samples: Float32Array, dt: number): Float64Array {
    const { bars, bassSize, size, out } = this;
    const recent = samples.subarray(samples.length - bassSize);

    let silence = true;
    for (let i = 0; i < recent.length; i++) {
      if (recent[i]) {
        silence = false;
        break;
      }
    }

    // process: approximate actual framerate
    this.framerate -= this.framerate / 64;
    this.framerate += 1 / Math.max(dt, 1 / 1000) / 64;

    // Hann window, then FFT; the shorter FFT reads the newest samples
    const bass = this.bassFft.magnitudes(recent, this.bassWindow);
    const rest = this.fft.magnitudes(recent.subarray(bassSize - size), this.window);

    // process: separate frequency bands
    for (let n = 0; n < bars; n++) {
      const bins = n < this.bassCutOffBar ? bass : rest;
      let sum = 0;
      for (let i = this.lower[n]; i <= this.upper[n]; i++) sum += bins[i];
      out[n] = sum * SAMPLE_SCALE * this.eq[n];
    }

    // applying sens
    for (let n = 0; n < bars; n++) out[n] *= this.sens;

    // process [smoothing]
    let overshoot = false;
    const framerateMod = 66 / this.framerate;
    const gravityMod = (framerateMod ** 2.5 * 2) / this.noiseReduction;
    const integralMod = framerateMod ** 0.1;

    for (let n = 0; n < bars; n++) {
      // falloff: a falling bar drops from its last peak, faster the longer it falls
      if (out[n] < this.prevOut[n] && this.noiseReduction > 0.1) {
        out[n] = this.peak[n] * (1 - this.fall[n] * this.fall[n] * gravityMod);
        if (out[n] < 0) out[n] = 0;
        this.fall[n] += 0.028;
      } else {
        this.peak[n] = out[n];
        this.fall[n] = 0;
      }
      this.prevOut[n] = out[n];

      // integral: blends in what the bar was last frame
      out[n] = (this.mem[n] * this.noiseReduction) / integralMod + out[n];
      this.mem[n] = out[n];

      // check if we overshoot target height
      if (out[n] > 1) {
        overshoot = true;
        out[n] = 1;
      }
    }

    // calculating automatic sense adjustment: back off quickly when a bar would go past the
    // top, otherwise creep up so the music keeps filling the space
    if (overshoot) {
      this.sens *= 1 - 0.02 * framerateMod;
      this.sensInit = false;
    } else if (!silence) {
      this.sens *= 1 + 0.001 * framerateMod;
      if (this.sensInit) this.sens *= 1 + 0.1 * framerateMod;
    }

    if (this.monstercat > 0) monstercatFilter(out, this.monstercat);
    return out;
  }
}

// cava.c's monstercat smoothing: every bar is raised to at least each other bar divided by
// 1.5 per step between them, so peaks slope down to their neighbors
function monstercatFilter(bars: Float64Array, monstercat: number) {
  const base = monstercat * 1.5;
  for (let z = 0; z < bars.length; z++) {
    for (let m = z - 1; m >= 0; m--) bars[m] = Math.max(bars[z] / base ** (z - m), bars[m]);
    for (let m = z + 1; m < bars.length; m++)
      bars[m] = Math.max(bars[z] / base ** (m - z), bars[m]);
  }
}

// A radix-2 FFT of real input, returning each bin's magnitude (cava's hypot of FFTW's output)
class Fft {
  private n: number;
  private re: Float64Array;
  private im: Float64Array;
  private cos: Float64Array;
  private sin: Float64Array;
  private reversed: Uint32Array;
  private mags: Float64Array;

  constructor(n: number) {
    this.n = n;
    this.re = new Float64Array(n);
    this.im = new Float64Array(n);
    this.mags = new Float64Array(n / 2 + 1);
    this.cos = Float64Array.from({ length: n / 2 }, (_, i) => Math.cos((-2 * Math.PI * i) / n));
    this.sin = Float64Array.from({ length: n / 2 }, (_, i) => Math.sin((-2 * Math.PI * i) / n));
    const bits = Math.log2(n);
    this.reversed = Uint32Array.from({ length: n }, (_, i) => {
      let r = 0;
      for (let b = 0; b < bits; b++) r = (r << 1) | ((i >> b) & 1);
      return r;
    });
  }

  magnitudes(input: Float32Array, window: Float32Array): Float64Array {
    const { n, re, im, cos, sin, reversed, mags } = this;
    for (let i = 0; i < n; i++) {
      re[reversed[i]] = input[i] * window[i];
      im[reversed[i]] = 0;
    }
    for (let half = 1; half < n; half *= 2) {
      const step = n / (half * 2);
      for (let start = 0; start < n; start += half * 2) {
        for (let k = 0; k < half; k++) {
          const a = start + k;
          const b = a + half;
          const wr = cos[k * step];
          const wi = sin[k * step];
          const tr = re[b] * wr - im[b] * wi;
          const ti = re[b] * wi + im[b] * wr;
          re[b] = re[a] - tr;
          im[b] = im[a] - ti;
          re[a] += tr;
          im[a] += ti;
        }
      }
    }
    for (let i = 0; i <= n / 2; i++) mags[i] = Math.hypot(re[i], im[i]);
    return mags;
  }
}
