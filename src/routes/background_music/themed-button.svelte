<!-- Structure and behaviour only; layout.scss sizes it and each theme decides what it looks like -->
<script lang="ts">
  interface Props {
    label: string;
    // Small line under the label, e.g. ON/OFF or the current theme's name
    status: string;
    // Leave undefined for buttons that aren't on/off toggles
    active?: boolean;
    onclick: () => void;
  }

  let { label, status, active, onclick }: Props = $props();

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
        <span class="label">{label}</span>
        <span class="status">{status}</span>
      </div>
    </div>
  </div>
</button>
