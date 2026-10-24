<script lang="ts">
  interface Props {
    label: string;
    active?: boolean;
    // Toggle buttons show ON/OFF; plain action buttons leave this off
    toggle?: boolean;
    onclick: () => void;
  }

  let { label, active = false, toggle = true, onclick }: Props = $props();

  let cubeReference: HTMLElement;
  let spinning = $state(false);

  function followMouse(e: MouseEvent) {
    if ('ontouchstart' in window) return;
    let rect = cubeReference.getBoundingClientRect();
    let x = e.clientX - rect.left - rect.width / 2;
    let y = e.clientY - rect.top - rect.height / 2;
    cubeReference.style.transform = `rotate3d(${y * -1}, ${x}, 0, 25deg)`;
  }
</script>

<button
  class="cube-button"
  aria-pressed={toggle ? active : undefined}
  onclick={() => {
    spinning = true;
    onclick();
  }}
  onmousemove={followMouse}
  onmouseleave={() => (cubeReference.style.transform = '')}
>
  <div bind:this={cubeReference} class="cube {active ? 'active' : ''}">
    <!-- Spins inside the tilted cube so the spin keeps whatever angle the mouse set -->
    <div class="spinner {spinning ? 'spin' : ''}" onanimationend={() => (spinning = false)}>
      <div class="face back"></div>
      <div class="face bottom"></div>
      <div class="face left"></div>
      <div class="face right"></div>
      <div class="face top"></div>
      <div class="face front">
        <span class="shine"></span>
        <span class="label">{label}</span>
        {#if toggle}
          <span class="status">{active ? 'ON' : 'OFF'}</span>
        {/if}
      </div>
    </div>
  </div>
</button>

<style lang="scss">
  .cube-button {
    --size: clamp(80px, 13vmin, 140px);
    --half: calc(var(--size) / 2);
    width: var(--size);
    height: var(--size);
    perspective: 700px;
    background: none;
    border: none;
    padding: 0;
    cursor:
      url('/Cursors/wii-open2.png') 17 1,
      pointer;
  }

  .cube {
    position: relative;
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    transform: rotate3d(1, -1, 0, 18deg);
    transition: transform 0.25s ease-out;
    --face-top: rgba(255, 255, 255, 0.95);
    --face-bottom: rgba(120, 200, 255, 0.85);
    --edge: rgba(70, 160, 230, 0.8);
    --text: rgb(20, 80, 150);
  }

  .cube.active {
    --face-top: rgba(150, 215, 255, 0.95);
    --face-bottom: rgba(20, 120, 230, 0.95);
    --edge: rgba(255, 255, 255, 0.9);
    --text: white;
  }

  .cube-button:hover .cube {
    --edge: rgba(255, 255, 255, 1);
  }

  .cube-button:focus-visible {
    outline: 3px solid rgb(33, 185, 255);
    outline-offset: 8px;
    border-radius: 12px;
  }

  .spinner {
    position: absolute;
    inset: 0;
    transform-style: preserve-3d;
  }

  .spin {
    animation: spin 0.6s ease-in-out;
  }

  @keyframes spin {
    from {
      transform: rotateY(0deg);
    }
    to {
      transform: rotateY(360deg);
    }
  }

  .face {
    position: absolute;
    inset: 0;
    border-radius: 14px;
    border: 2px solid var(--edge);
    background: linear-gradient(180deg, var(--face-top) 0%, var(--face-bottom) 100%);
    box-shadow:
      inset 0 0 18px rgba(255, 255, 255, 0.6),
      0 0 14px rgba(33, 185, 255, 0.35);
    transition:
      background 0.3s,
      border-color 0.3s;
  }

  .back,
  .bottom,
  .left,
  .right,
  .top {
    opacity: 0.75;
  }

  .front {
    transform: translateZ(var(--half));
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4px;
    overflow: hidden;
    backdrop-filter: blur(4px);
  }
  .back {
    transform: translateZ(calc(-1 * var(--half))) rotateY(180deg);
  }
  .left {
    transform: translateX(calc(-1 * var(--half))) rotateY(-90deg);
  }
  .right {
    transform: translateX(var(--half)) rotateY(90deg);
  }
  .top {
    transform: translateY(calc(-1 * var(--half))) rotateX(90deg);
  }
  .bottom {
    transform: translateY(var(--half)) rotateX(-90deg);
  }

  // Glossy Aero highlight across the top half of the front face
  .shine {
    position: absolute;
    top: 3%;
    left: 6%;
    width: 88%;
    height: 45%;
    border-radius: 12px 12px 50% 50% / 12px 12px 20px 20px;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.05));
    pointer-events: none;
  }

  .label,
  .status {
    position: relative;
    font-family: 'Segoe UI', 'Trebuchet MS', Arial, sans-serif;
    color: var(--text);
    text-shadow: 0 1px 2px rgba(255, 255, 255, 0.6);
    text-align: center;
    line-height: 1.1;
  }

  .label {
    font-size: clamp(12px, 1.9vmin, 18px);
    font-weight: 700;
    padding: 0 6px;
  }

  .status {
    font-size: clamp(9px, 1.3vmin, 12px);
    letter-spacing: 0.1em;
    opacity: 0.85;
  }

  .active .status,
  .active .label {
    text-shadow: 0 1px 3px rgba(0, 60, 140, 0.6);
  }

  @media (prefers-reduced-motion: reduce) {
    .spin {
      animation: none;
    }
  }
</style>
