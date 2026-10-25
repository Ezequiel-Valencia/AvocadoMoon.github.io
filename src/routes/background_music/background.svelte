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

  // Fall scene, hidden unless a theme shows it: a tree on each side of the page with fallen
  // leaves piled at its foot. The trunk and limbs are smooth tapering shapes, each traced
  // along a curve (start, two control points, end) from a wide base to a thin tip
  function taper(curve: number[], from: number, to: number): string {
    const [x0, y0, x1, y1, x2, y2, x3, y3] = curve;
    const steps = 16;
    const sideA: string[] = [];
    const sideB: string[] = [];
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const u = 1 - t;
      const x = u * u * u * x0 + 3 * u * u * t * x1 + 3 * u * t * t * x2 + t * t * t * x3;
      const y = u * u * u * y0 + 3 * u * u * t * y1 + 3 * u * t * t * y2 + t * t * t * y3;
      // Direction along the curve, turned a quarter to point across it
      const dx = 3 * u * u * (x1 - x0) + 6 * u * t * (x2 - x1) + 3 * t * t * (x3 - x2);
      const dy = 3 * u * u * (y1 - y0) + 6 * u * t * (y2 - y1) + 3 * t * t * (y3 - y2);
      const half = (from + (to - from) * t) / 2 / Math.hypot(dx, dy);
      sideA.push(`${(x - dy * half).toFixed(1)} ${(y + dx * half).toFixed(1)}`);
      sideB.unshift(`${(x + dy * half).toFixed(1)} ${(y - dx * half).toFixed(1)}`);
    }
    return `M${sideA.join(' L')} L${sideB.join(' L')} Z`;
  }

  // The trunk forks into two limbs just below the canopy; the rest of the limbs reach up
  // into it, showing only where they leave the trunk
  const wood = [
    taper([150, 322, 147, 295, 152, 262, 150, 236], 26, 17),
    taper([146, 244, 140, 226, 128, 212, 106, 182], 13, 4),
    taper([154, 244, 162, 226, 178, 212, 206, 186], 13, 4),
    taper([128, 214, 124, 196, 120, 180, 118, 160], 6, 1.5),
    taper([150, 238, 149, 215, 151, 195, 154, 170], 7, 2),
    taper([180, 214, 184, 198, 186, 182, 186, 162], 6, 1.5),
  ];

  // A fixed sequence of random numbers, so the leaves land in the same places every visit
  let seed = 11;
  const random = () => (seed = (seed * 16807) % 2147483647) / 2147483647;

  // Fallen leaves heaped into a mound around each trunk: highest in the middle, thinning
  // out to the sides. Higher leaves are drawn first, so the ones lower down lie on top
  function leafPile(count: number) {
    return Array.from({ length: count }, () => {
      const across = random();
      const peak = 1 - (2 * across - 1) ** 2;
      return {
        left: across * 100,
        height: random() * peak,
        size: 18 + random() * 22,
        turn: Math.round(random() * 360),
        tone: 1 + Math.floor(random() * 4),
      };
    }).sort((a, b) => b.height - a.height);
  }
  const piles = [
    { side: 'left', leaves: leafPile(70) },
    { side: 'right', leaves: leafPile(70) },
  ];

  // Dabs of colour spread over the canopy so it reads as painted foliage: lighter toward
  // the top where the sun catches it, deeper toward the bottom
  const dabs = Array.from({ length: 90 }, () => {
    const angle = random() * Math.PI * 2;
    const reach = Math.sqrt(random());
    const cx = Math.round(152 + Math.cos(angle) * reach * 108);
    const cy = Math.round(118 + Math.sin(angle) * reach * 72);
    const shade = (cy - 45) / 150 + (random() - 0.5) * 0.5;
    return {
      cx,
      cy,
      r: Math.round(5 + random() * 9),
      tone: Math.min(4, Math.max(1, 1 + Math.floor(shade * 4))),
    };
  });
</script>

<div class="fall-scene" aria-hidden="true">
  <svg class="scene-defs" width="0" height="0">
    <!-- Roughens the canopy's edges into leafy, ragged ones -->
    <filter id="fall-foliage" x="-10%" y="-10%" width="120%" height="120%">
      <feTurbulence type="fractalNoise" baseFrequency="0.09" numOctaves="2" seed="3" />
      <feDisplacementMap in="SourceGraphic" scale="10" xChannelSelector="R" yChannelSelector="G" />
    </filter>
  </svg>

  {#each ['left', 'right'] as side (side)}
    <svg class="tree tree-{side}" viewBox="0 0 300 320" preserveAspectRatio="xMidYMax meet">
      <!-- The canopy's deep underside, behind the wood, so the limbs show against it
           only in the band beneath the rest of the canopy -->
      <path
        class="foliage canopy-4"
        d="M40 190 C20 170 25 140 45 130 C40 100 60 80 85 82 C90 55 120 40 145 45 C165 25 200 30 215 55 C240 55 260 80 255 105 C278 120 280 160 262 180 C255 200 225 205 200 198 C180 210 150 205 135 198 C110 208 75 205 60 196 C52 200 44 196 40 190 Z"
      />

      {#each wood as d, i (i)}
        <path class="wood" {d} />
      {/each}

      <g class="foliage">
        <path
          class="canopy-3"
          d="M50 170 C38 150 48 125 70 122 C70 95 95 80 115 85 C125 60 160 52 180 65 C205 55 235 75 232 100 C255 110 258 145 240 160 C230 178 200 176 185 170 C165 182 130 178 115 172 C95 182 65 182 50 170 Z"
        />
        <path
          class="canopy-2"
          d="M70 130 C65 105 90 92 110 98 C115 70 150 60 170 75 C190 62 220 80 212 105 C230 118 222 140 200 140 C185 150 160 145 150 140 C130 150 100 148 90 140 C78 145 70 140 70 130 Z"
        />
        {#each dabs as d, i (i)}
          <circle class="canopy-{d.tone}" cx={d.cx} cy={d.cy} r={d.r} />
        {/each}
      </g>
    </svg>
  {/each}

  <div class="leaf-bed"></div>

  {#each piles as pile (pile.side)}
    <div class="leaf-pile pile-{pile.side}">
      {#each pile.leaves as l, i (i)}
        <span
          class="bed-leaf tone-{l.tone}"
          style="--left: {l.left}%; --height: {l.height}; --size: {l.size}; --turn: {l.turn}deg;"
        ></span>
      {/each}
    </div>
  {/each}
</div>

<div class="pond-scene" aria-hidden="true">
  <svg class="scene-defs" width="0" height="0">
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
