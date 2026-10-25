<!-- Structure and behaviour only; layout.scss sizes it and each theme decides what it looks like -->
<script lang="ts">
  interface Props {
    label: string;
    // Small line under the label, e.g. ON/OFF or the current theme's name
    status?: string;
    // Leave undefined for buttons that aren't on/off toggles
    active?: boolean;
    onclick: () => void;
  }

  let { label, status, active, onclick }: Props = $props();

  // Keeps each button's halo gradient and clip ids from clashing with the other buttons'
  const uid = $props.id();

  let shapeReference: HTMLElement;
  let spinning = $state(false);

  function followMouse(e: MouseEvent) {
    if ('ontouchstart' in window) return;
    let rect = shapeReference.getBoundingClientRect();
    let x = e.clientX - rect.left - rect.width / 2;
    let y = e.clientY - rect.top - rect.height / 2;
    shapeReference.style.transform = `rotate3d(${y * -1}, ${x}, 0, 25deg)`;
  }
</script>

<button
  class="themed-button"
  aria-pressed={active}
  onclick={() => {
    spinning = true;
    onclick();
  }}
  onmousemove={followMouse}
  onmouseleave={() => (shapeReference.style.transform = '')}
>
  <div bind:this={shapeReference} class="shape {active ? 'active' : ''}">
    <!-- Animates inside the tilted shape so the click animation keeps the mouse's angle -->
    <div class="spinner {spinning ? 'spin' : ''}" onanimationend={() => (spinning = false)}>
      <div class="face back"></div>
      <div class="face bottom"></div>
      <div class="face left"></div>
      <div class="face right"></div>
      <div class="face top"></div>
      <div class="face front">
        <span class="shine"></span>
        <!-- Hidden unless a theme traces its button's edge; these points match fall's maple leaf clip-path.
             Inside the front, beneath the label and status, so the outline never covers the text -->
        <svg class="edge-trace" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <polygon
            pathLength="1"
            points="50,2 57,15 64,11 61,33 73,20 76,27 89,24 85,38 95,43 73,60 76,68 52,65 52,96 48,96 48,65 24,68 27,60 5,43 15,38 11,24 24,27 27,20 39,33 36,11 43,15"
          />
        </svg>
        <!-- Hidden unless a theme draws its buttons as halos (y2k): a tilted swoosh ring with
             a big star pushed through it, passing behind the ring's near side, and sparkles
             scattered around. The ring is drawn twice, its near half clipped to sit over the star -->
        <svg class="halo" viewBox="0 0 100 100" aria-hidden="true">
          <defs>
            <linearGradient id="{uid}-chrome" x1="0" y1="0" x2="0.3" y2="1">
              <stop offset="0" class="halo-light" />
              <stop offset="0.35" class="halo-dark" />
              <stop offset="0.5" class="halo-light" />
              <stop offset="0.8" class="halo-dark" />
              <stop offset="1" class="halo-light" />
            </linearGradient>
            <clipPath id="{uid}-far"><rect x="-10" y="-10" width="120" height="66" /></clipPath>
            <clipPath id="{uid}-near"><rect x="-10" y="56" width="120" height="60" /></clipPath>
          </defs>
          <g transform="rotate(-14 50 56)">
            <!-- Two offset ellipses: thick at the lower left, thinning to a point at the upper right -->
            <path
              class="halo-ring"
              fill-rule="evenodd"
              fill="url(#{uid}-chrome)"
              clip-path="url(#{uid}-far)"
              d="M3,56 a47,23 0 1,0 94,0 a47,23 0 1,0 -94,0 Z M12,52 a42,17 0 1,0 84,0 a42,17 0 1,0 -84,0 Z"
            />
          </g>
          <polygon
            class="halo-star"
            points="63.7,10.7 62.9,38.1 79.5,46.8 60.9,47.9 50.3,73.3 51.1,45.9 34.5,37.2 53.1,36.1"
          />
          <g transform="rotate(-14 50 56)">
            <path
              class="halo-ring"
              fill-rule="evenodd"
              fill="url(#{uid}-chrome)"
              clip-path="url(#{uid}-near)"
              d="M3,56 a47,23 0 1,0 94,0 a47,23 0 1,0 -94,0 Z M12,52 a42,17 0 1,0 84,0 a42,17 0 1,0 -84,0 Z"
            />
          </g>
          <polygon
            class="halo-sparkle"
            points="13.0,15.0 14.1,18.9 16.8,20.0 14.1,21.1 13.0,25.0 11.9,21.1 9.2,20.0 11.9,18.9"
          />
          <polygon
            class="halo-sparkle"
            points="6.0,42.5 6.8,45.2 8.6,46.0 6.8,46.8 6.0,49.5 5.2,46.8 3.4,46.0 5.2,45.2"
          />
          <polygon
            class="halo-sparkle"
            points="95.0,56.5 95.8,59.2 97.6,60.0 95.8,60.8 95.0,63.5 94.2,60.8 92.4,60.0 94.2,59.2"
          />
          <polygon
            class="halo-sparkle"
            points="18.0,73.5 18.6,75.5 19.9,76.0 18.6,76.5 18.0,78.5 17.4,76.5 16.1,76.0 17.4,75.5"
          />
          <polygon
            class="halo-sparkle"
            points="96.0,9.0 96.7,11.3 98.2,12.0 96.7,12.7 96.0,15.0 95.3,12.7 93.8,12.0 95.3,11.3"
          />
          <polygon
            class="halo-sparkle"
            points="42.0,11.5 42.5,13.4 43.9,14.0 42.5,14.6 42.0,16.5 41.5,14.6 40.1,14.0 41.5,13.4"
          />
        </svg>
        <span class="label">{label}</span>
        {#if status}
          <span class="status">{status}</span>
        {/if}
      </div>
    </div>
  </div>
</button>
