<!-- Drifting background shapes; each theme gives them their look and motion -->
<script lang="ts">
  // Same spread as the main page's floating blocks
  const particles = [
    { left: 25, size: 80, delay: 0, duration: 25 },
    { left: 10, size: 20, delay: 2, duration: 12 },
    { left: 70, size: 20, delay: 4, duration: 25 },
    { left: 40, size: 60, delay: 0, duration: 18 },
    { left: 65, size: 20, delay: 0, duration: 25 },
    { left: 75, size: 110, delay: 3, duration: 25 },
    { left: 35, size: 150, delay: 7, duration: 25 },
    { left: 50, size: 25, delay: 15, duration: 45 },
    { left: 20, size: 15, delay: 2, duration: 35 },
    { left: 85, size: 150, delay: 0, duration: 11 },
  ];

  // Wireframe globe lines, hidden unless a theme shows the globe: meridians are great
  // circles turned around the axis, latitudes are rings stacked up it
  const meridians = [0, 22.5, 45, 67.5, 90, 112.5, 135, 157.5];
  const latitudes = [-60, -40, -20, 0, 20, 40, 60];

  // Pond scene, hidden unless a theme shows it. Depth is how far up the water something
  // sits (0 is the near edge), and nearer things are drawn in front
  const front = (depth: number) => Math.round((1 - depth) * 100);

  // Each duck swims between two points across the page (vw) and turns around at each end;
  // ducklings share their mother's path a moment behind her
  const ducks = [
    { kind: 'mallard', width: 64, depth: 0.4, from: 6, to: 62, duration: 40, delay: -8 },
    { kind: 'hen', width: 60, depth: 0.52, from: 30, to: 84, duration: 52, delay: -40 },
    { kind: 'white', width: 58, depth: 0.16, from: 14, to: 86, duration: 46, delay: -30 },
    { kind: 'duckling', width: 28, depth: 0.16, from: 14, to: 86, duration: 46, delay: -29 },
    { kind: 'duckling', width: 26, depth: 0.16, from: 14, to: 86, duration: 46, delay: -28.1 },
  ];

  const lilyPads = [
    { left: 4, depth: 0.5, size: 74, flower: true },
    { left: 17, depth: 0.28, size: 48, flower: false },
    { left: 29, depth: 0.62, size: 56, flower: false },
    { left: 44, depth: 0.08, size: 86, flower: true },
    { left: 58, depth: 0.6, size: 50, flower: true },
    { left: 71, depth: 0.3, size: 66, flower: false },
    { left: 88, depth: 0.46, size: 58, flower: true },
  ];

  // Bamboo stands on the banks at both sides; x is from its own edge of the page
  const bamboo = [
    { side: 'left', x: -2, height: 72, width: 16, delay: 0 },
    { side: 'left', x: 22, height: 88, width: 12, delay: -2.5 },
    { side: 'left', x: 40, height: 58, width: 14, delay: -4 },
    { side: 'right', x: 4, height: 80, width: 15, delay: -1.5 },
    { side: 'right', x: 26, height: 64, width: 12, delay: -3.5 },
  ].map((stalk, i) => ({
    ...stalk,
    // Leaves sprout from the upper nodes, alternating sides
    leaves: [0.52, 0.68, 0.82, 0.95].map((at, j) => ({ at, side: (i + j) % 2 ? 'l' : 'r' })),
  }));
</script>

<div class="pond-scene" aria-hidden="true">
  <svg class="pond-defs" width="0" height="0">
    <!-- A duck facing right; each kind colours it through custom properties -->
    <symbol id="pond-duck" viewBox="0 0 64 48">
      <ellipse
        cx="30"
        cy="42"
        rx="28"
        ry="3.5"
        style="fill: none; stroke: var(--duck-wake); stroke-width: 1.5"
      />
      <path
        style="fill: var(--duck-body)"
        d="M4 20 L13 27 Q11 41 27 41 L40 41 Q52 40 51 30 Q50 24 43 25 L24 27 Q15 27 4 20 Z"
      />
      <path style="fill: var(--duck-wing)" d="M19 30 Q30 25 40 31 Q31 37 19 33 Z" />
      <path
        style="fill: var(--duck-head)"
        d="M38 27 Q36 18 40 12 Q44 7 49 9 Q54 11 53 17 Q52 22 48 25 Q46 28 44 28 Z"
      />
      <path style="fill: var(--duck-beak)" d="M52 14 Q60 14 61 17 Q58 20 51 19 Z" />
      <circle style="fill: var(--duck-eye)" cx="48" cy="14" r="1.6" />
    </symbol>
  </svg>

  {#each bamboo as b, i (i)}
    <div
      class="stalk stalk-{b.side}"
      style="--x: {b.x}; --height: {b.height}vh; --width: {b.width}; --delay: {b.delay}s;"
    >
      {#each b.leaves as leaf, j (j)}
        <span class="leaf {leaf.side}" style="--at: {leaf.at};"></span>
      {/each}
    </div>
  {/each}

  <div class="pond-water"></div>

  {#each lilyPads as p, i (i)}
    <div
      class="lily"
      style="--left: {p.left}%; --depth: {p.depth}; --size: {p.size}; --delay: {-i *
        1.3}s; z-index: {front(p.depth)};"
    >
      <span class="lily-pad"></span>
      {#if p.flower}
        <span class="lily-flower"></span>
      {/if}
    </div>
  {/each}

  {#each ducks as d, i (i)}
    <div
      class="duck {d.kind}"
      style="--width: {d.width}; --depth: {d.depth}; --from: {d.from}vw; --to: {d.to}vw; --duration: {d.duration}s; --delay: {d.delay}s; z-index: {front(
        d.depth
      )};"
    >
      <svg class="duck-bob" viewBox="0 0 64 48"><use href="#pond-duck" /></svg>
    </div>
  {/each}
</div>

<div class="globe" aria-hidden="true">
  <div class="globe-spin">
    {#each meridians as angle (angle)}
      <span class="meridian" style="--angle: {angle}deg;"></span>
    {/each}
    {#each latitudes as lat (lat)}
      <span class="latitude {lat === 0 ? 'equator' : ''}" style="--lat: {lat}deg;"></span>
    {/each}
  </div>
</div>

<ul class="background" aria-hidden="true">
  {#each particles as p, i (i)}
    <li
      class="particle"
      style="--left: {p.left}%; --size: {p.size}px; --delay: {p.delay}s; --duration: {p.duration}s;"
    ></li>
  {/each}
</ul>
