<!-- Animated visualizer that sits behind the video; layout.scss shapes each kind, themes paint it -->
<script lang="ts">
  import type { VisualizerKind } from './visualizers';

  interface Props {
    kind: VisualizerKind;
    playing: boolean;
  }

  let { kind, playing }: Props = $props();

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
</script>

<div class="visualizer {kind} {playing ? 'playing' : ''}" aria-hidden="true">
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
