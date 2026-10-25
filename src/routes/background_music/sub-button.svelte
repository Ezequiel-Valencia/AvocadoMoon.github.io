<!-- Small squircle toggle tucked under a main button; layout.scss shapes it, themes only colour it -->
<script lang="ts">
  interface Props {
    label: string;
    // Small line under the label, e.g. ON/OFF
    status: string;
    active?: boolean;
    onclick: () => void;
  }

  let { label, status, active, onclick }: Props = $props();
</script>

<button class="sub-button" aria-pressed={active} {onclick}>
  <span class="sub-label">{label}</span>
  <span class="sub-status">{status}</span>
</button>

<style lang="scss">
  // Plain squircles, the same shape in every theme
  .sub-button {
    --sub-size: clamp(54px, 8vmin, 70px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2px;
    width: var(--sub-size);
    height: var(--sub-size);
    padding: 0 4px;
    border-radius: 30%;
    font: inherit;
    line-height: 1.1;
    text-align: center;
    cursor: inherit;
    transition:
      transform 0.15s ease-out,
      background 0.2s,
      color 0.2s,
      box-shadow 0.2s;

    &:hover {
      transform: translateY(-2px);
    }

    &:active {
      transform: scale(0.94);
    }

    &:focus-visible {
      outline: 2px solid currentColor;
      outline-offset: 3px;
    }
  }

  // A true squircle where the browser can draw one
  @supports (corner-shape: squircle) {
    .sub-button {
      border-radius: 50%;
      corner-shape: squircle;
    }
  }

  .sub-label {
    font-size: clamp(10px, 1.4vmin, 12px);
    font-weight: 700;
  }

  .sub-status {
    font-size: clamp(8px, 1.1vmin, 10px);
    letter-spacing: 0.08em;
  }
</style>
