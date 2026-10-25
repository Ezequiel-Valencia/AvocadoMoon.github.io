<!-- Animated visualizer that sits behind the video; layout.scss shapes each kind, themes paint it -->
<script lang="ts">
  import { Cava } from './cava';
  import type { VisualizerKind } from './visualizers';

  interface Props {
    kind: VisualizerKind;
    playing: boolean;
    // Live tab audio; without it the pieces run their own looping animations
    analyser?: AnalyserNode;
  }

  let { kind, playing, analyser }: Props = $props();

  let root: HTMLElement;

  // Each piece gets its own speed and offset so the visualizer doesn't pulse in unison
  function pulses(count: number) {
    return Array.from({ length: count }, (_, i) => ({
      style: `--duration: ${0.6 + ((i * 37) % 11) / 10}s; --delay: ${-((i * 53) % 17) / 10}s; --peak: ${0.35 + ((i * 29) % 13) / 20};`,
    }));
  }

  const bars = pulses(40);
  const rays = pulses(72);

  // A sine wave drawn across two widths of the 400-wide view box, so scrolling it left
  // by 400 (a whole number of periods) lines up seamlessly with where it started
  function wavePath(period: number, amplitude: number, phase: number): string {
    const points = [];
    for (let x = 0; x <= 800; x += 4) {
      const y = 50 + amplitude * Math.sin((2 * Math.PI * x) / period + phase);
      points.push(`${x} ${y.toFixed(2)}`);
    }
    return `M${points.join(' L')}`;
  }

  const waves = [
    { name: 'sin', d: wavePath(200, 42, 0) },
    { name: 'cos', d: wavePath(200, 32, Math.PI / 2) },
    { name: 'ripple', d: wavePath(100, 16, 0) },
  ];

  // Moves `current` toward `target`, taking about `seconds` to get most of the way there
  function ease(current: number, target: number, seconds: number, dt: number): number {
    return current + (target - current) * Math.min(1, dt / seconds);
  }

  const clamp01 = (x: number) => Math.min(1, Math.max(0, x));

  // Writes a custom property only when its text changes; each write makes the browser
  // restyle the element (and, for the root, everything inside it), so steady values are skipped
  const written = new WeakMap<Element, Map<string, string>>();
  function setVar(el: HTMLElement | SVGElement, prop: string, value: string) {
    let props = written.get(el);
    if (!props) written.set(el, (props = new Map()));
    if (props.get(prop) === value) return;
    props.set(prop, value);
    el.style.setProperty(prop, value);
  }

  // With live audio, each piece's height follows the music every frame through --level
  $effect(() => {
    if (!analyser) return;
    const node = analyser;
    // The analyser doesn't smooth (see tab-audio.ts) so beats arrive sharp; `bins` is
    // smoothed here for reading the sound's brightness, jumping up to a hit and falling away
    const raw = new Uint8Array(node.frequencyBinCount);
    const previous = new Uint8Array(node.frequencyBinCount);
    const bins = new Float32Array(node.frequencyBinCount);
    const pieces = [
      ...root.querySelectorAll<HTMLElement | SVGElement>(
        kind === 'bars' ? '.bar' : kind === 'circle' ? '.ray' : '.wave-swell'
      ),
    ];
    const n = pieces.length;

    const binHz = node.context.sampleRate / node.fftSize;
    const bin = (hz: number) => Math.max(1, Math.round(hz / binHz));
    const low = bin(45);
    const high = bin(10000);

    // Heights come from a port of cava's bar engine (see cava.ts). Bars run bass on the left
    // to treble on the right; the ring is mirrored so it's symmetrical, bass at the top; the
    // three wave lines are cava with three bars: bass, mids, and highs.
    const rate = node.context.sampleRate;
    // Smoother than cava's defaults (0.77 and off) so bars ease up and down instead of
    // snapping: noise reduction carries more of each frame into the next, and monstercat
    // slopes every peak down into its neighbors, losing a factor of 0.8 * 1.5 = 1.2 per bar
    const cava = new Cava(kind === 'circle' ? Math.floor(n / 2) + 1 : n, rate, {
      noiseReduction: 0.9,
      monstercat: 0.8,
    });

    function height(bars: Float64Array, i: number): number {
      if (kind === 'wave') return 0.06 + 0.94 * bars[i];
      if (kind === 'circle') return bars[Math.min(i, n - i)];
      return bars[i];
    }

    // Beyond each piece's height, the whole visualizer reacts to the music on two time scales.
    // Moment to moment: loudness brightens it, kick drums flash it, and bright,
    // treble-heavy sound shifts and deepens its colors. Song to song: intensity (how loud and
    // fast the music is over the last few seconds) sets how fast and punchy it is, so
    // a calm song and an energetic one look clearly different. layout.scss applies them.
    const samples = new Float32Array(node.fftSize);
    const kickLo = bin(45);
    const kickHi = bin(150);
    const stillMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const lines = [...root.querySelectorAll<SVGElement>('.wave-line')];
    // View box units per second for each wave line at full pace; cos rolls the other way
    const rollSpeeds = [130, -90, 200];
    const rolls = rollSpeeds.map(() => 0);

    let loudness = 0;
    let peak = 0.05;
    let fluxMean = 0;
    let fluxSpread = 0;
    let beat = 0;
    let lastBeat = 0;
    let beatGap = 0.5;
    let brightness = 0;
    let energy = 0;
    let tempo = 0;
    let intensity = 0;
    let last = performance.now();

    // Bins rise instantly and fall over about a tenth of a second
    function smooth(dt: number) {
      const fall = Math.exp(-dt / 0.1);
      for (let b = 0; b < raw.length; b++) bins[b] = Math.max(raw[b], bins[b] * fall);
    }

    function feel(now: number, dt: number) {
      let sum = 0;
      for (const s of samples) sum += s * s;
      const rms = Math.sqrt(sum / samples.length);

      // Loudness: measured against the loudest of the last few seconds, so swells and drops
      // within a song always show; quick to rise, slower to settle
      peak = Math.max(rms, 0.02, peak * Math.exp(-dt / 4));
      const target = Math.min(1, rms / peak);
      loudness = ease(loudness, target, target > loudness ? 0.04 : 0.25, dt);

      // Energy: absolute loudness over a few seconds, from -40dB (hushed) to -12dB (loud)
      const db = 20 * Math.log10(Math.max(rms, 1e-5));
      energy = ease(energy, clamp01((db + 40) / 28), 3, dt);

      // Beat: a sudden rise in kick-drum energy (spectral flux), well above its recent norm
      let flux = 0;
      for (let b = kickLo; b < kickHi; b++) flux += Math.max(0, raw[b] - previous[b]);
      flux /= (kickHi - kickLo) * 255;
      const sinceBeat = (now - lastBeat) / 1000;
      if (flux > fluxMean + 1.5 * fluxSpread + 0.01 && sinceBeat > 0.25) {
        beat = 1;
        lastBeat = now;
        // Gaps between beats give the tempo; odd ones from fills or missed beats are skipped
        if (sinceBeat < 1.5) beatGap += (sinceBeat - beatGap) * 0.25;
      }
      fluxMean = ease(fluxMean, flux, 1, dt);
      fluxSpread = ease(fluxSpread, Math.abs(flux - fluxMean), 1, dt);
      beat *= Math.exp(-dt / 0.15);

      // Tempo: 70bpm counts as slow and 150bpm as fast; it fades out when the beats stop
      const bpm = 60 / beatGap;
      tempo = ease(tempo, sinceBeat < 2 ? clamp01((bpm - 70) / 80) : 0, 2, dt);
      intensity = ease(intensity, 0.65 * energy + 0.35 * tempo, 1.5, dt);

      // Brightness: the spectral centroid, from a mellow 400Hz up to a bright 3kHz
      let weighted = 0;
      let total = 0;
      for (let b = low; b < high; b++) {
        weighted += b * bins[b];
        total += bins[b];
      }
      const centroid = total ? (weighted / total) * binHz : 400;
      brightness = ease(
        brightness,
        clamp01(Math.log2(centroid / 400) / Math.log2(3000 / 400)),
        0.3,
        dt
      );

      setVar(root, '--loudness', loudness.toFixed(2));
      setVar(root, '--brightness', brightness.toFixed(2));
      setVar(root, '--intensity', intensity.toFixed(2));
      if (stillMotion) return;
      setVar(root, '--beat', beat.toFixed(2));

      // Calm music rolls the waves slowly, energetic music races, and every beat gives an
      // extra shove
      const pace = (0.1 + 1.9 * intensity) * (0.5 + 0.5 * loudness) + 2.5 * beat;
      if (kind === 'wave') {
        lines.forEach((line, i) => {
          rolls[i] = (rolls[i] + rollSpeeds[i] * pace * dt) % 400;
          setVar(line, '--roll', rolls[i].toFixed(1));
        });
      }
    }

    let frame = requestAnimationFrame(function tick(now) {
      // Capped so a frame after the tab was hidden doesn't jump everything
      const dt = Math.min(0.1, (now - last) / 1000);
      last = now;
      previous.set(raw);
      node.getByteFrequencyData(raw);
      smooth(dt);
      node.getFloatTimeDomainData(samples);
      feel(now, dt);
      const bars = cava.execute(samples, dt);
      for (let i = 0; i < n; i++) {
        setVar(pieces[i], '--level', Math.max(0.04, height(bars, i)).toFixed(3));
      }
      frame = requestAnimationFrame(tick);
    });

    return () => {
      cancelAnimationFrame(frame);
      pieces.forEach((piece) => piece.style.removeProperty('--level'));
      lines.forEach((line) => line.style.removeProperty('--roll'));
      for (const prop of ['--loudness', '--brightness', '--intensity', '--beat']) {
        root.style.removeProperty(prop);
      }
      for (const el of [root, ...pieces, ...lines]) written.delete(el);
    };
  });
</script>

<div
  bind:this={root}
  class="visualizer {kind} {playing ? 'playing' : ''} {analyser ? 'live' : ''}"
  aria-hidden="true"
>
  {#if kind === 'bars'}
    {#each bars as bar, i (i)}
      <span class="bar" style={bar.style}></span>
    {/each}
  {:else if kind === 'circle'}
    {#each rays as ray, i (i)}
      <!-- The spoke turns each ray to its angle around the video's center -->
      <span class="spoke" style="--angle: {(i * 360) / rays.length}deg;">
        <span class="ray" style={ray.style}></span>
      </span>
    {/each}
  {:else}
    <svg viewBox="0 0 400 100" preserveAspectRatio="none">
      {#each waves as wave (wave.name)}
        <!-- The group swells the wave's height while the path inside scrolls sideways -->
        <g class="wave-swell {wave.name}">
          <path class="wave-line {wave.name}" d={wave.d} />
        </g>
      {/each}
    </svg>
  {/if}
</div>
