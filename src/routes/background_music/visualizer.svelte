<!-- Animated visualizer that sits behind the video; layout.scss shapes each kind, themes paint it -->
<script lang="ts">
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

  // Average loudness (0-1) of the analyser bins from `lo` up to (not including) `hi`
  function average(bins: Uint8Array, lo: number, hi: number): number {
    let sum = 0;
    for (let b = lo; b < hi; b++) sum += bins[b];
    return sum / Math.max(1, hi - lo) / 255;
  }

  // With live audio, each piece's height follows the music every frame through --level
  $effect(() => {
    if (!analyser) return;
    const node = analyser;
    const bins = new Uint8Array(node.frequencyBinCount);
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

    // Loudness of band `i` of `count`. Bands are spaced logarithmically from 45Hz to 10kHz,
    // as pitch is heard; adding k keeps the narrow bass bands from sharing a bin. Treble
    // is naturally much quieter, so higher bands get a boost to stay visible.
    function band(i: number, count: number): number {
      const edge = (k: number) => Math.round(low * (high / low) ** (k / count)) + k;
      return average(bins, edge(i), edge(i + 1)) * (1 + (1.2 * i) / count);
    }

    // One wave line each for bass, mids, and highs, boosted the same way
    const waveBands = [
      { lo: bin(45), hi: bin(250), boost: 1 },
      { lo: bin(250), hi: bin(2000), boost: 1.6 },
      { lo: bin(2000), hi: bin(8000), boost: 3 },
    ];

    function level(i: number): number {
      // Mirrored left to right so the ring is symmetrical, bass at the top
      if (kind === 'circle') return band(Math.min(i, n - i), n / 2 + 1);
      if (kind === 'wave') {
        const { lo, hi, boost } = waveBands[i];
        return 0.15 + 0.85 * Math.min(1, average(bins, lo, hi) * boost);
      }
      return band(i, n);
    }

    let frame = requestAnimationFrame(function tick() {
      node.getByteFrequencyData(bins);
      pieces.forEach((piece, i) => {
        const value = Math.min(1, Math.max(0.06, level(i)));
        piece.style.setProperty('--level', value.toFixed(3));
      });
      frame = requestAnimationFrame(tick);
    });

    return () => {
      cancelAnimationFrame(frame);
      pieces.forEach((piece) => piece.style.removeProperty('--level'));
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
