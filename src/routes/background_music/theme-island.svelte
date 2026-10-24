<!-- Centered picker showing each theme as one of its own buttons -->
<script lang="ts">
  import { onMount } from 'svelte';
  import ThemedButton from './themed-button.svelte';
  import { themes, type ThemeId } from './themes';

  interface Props {
    current: ThemeId;
    onselect: (id: ThemeId) => void;
    onclose: () => void;
  }

  let { current, onselect, onclose }: Props = $props();

  let island: HTMLElement;
  let closing = false;

  onMount(() => {
    // Return focus to whatever opened the island once it closes
    const opener = document.activeElement as HTMLElement | null;
    island.querySelector<HTMLElement>('[aria-pressed="true"]')?.focus();
    return () => opener?.focus();
  });

  function choose(id: ThemeId) {
    if (closing) return;
    closing = true;
    onselect(id);
    // Linger briefly so the chosen button's own click animation is seen
    setTimeout(onclose, 450);
  }
</script>

<svelte:window onkeydown={(e) => e.key === 'Escape' && onclose()} />

<!-- Clicking the dimmed area outside the island closes it; Escape does the same from the keyboard -->
<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
<!-- data-theme follows the selected theme, whose stylesheet gives the island its look -->
<div
  class="backdrop theme-island"
  data-theme={current}
  onclick={(e) => e.target === e.currentTarget && onclose()}
>
  <div
    bind:this={island}
    class="island"
    role="dialog"
    aria-modal="true"
    aria-labelledby="theme-island-title"
  >
    <h2 id="theme-island-title">Choose a Theme</h2>
    <div class="options">
      {#each themes as t (t.id)}
        <!-- bgm-page + data-theme lets each tile pick up that theme's stylesheet -->
        <div class="bgm-page preview" data-theme={t.id}>
          <ThemedButton
            label={t.name}
            status={t.id === current ? 'CURRENT' : 'SELECT'}
            active={t.id === current}
            onclick={() => choose(t.id)}
          />
        </div>
      {/each}
    </div>
  </div>
</div>

<!-- Layout only; each theme's stylesheet styles .theme-island[data-theme='<id>'] -->
<style lang="scss">
  .backdrop {
    position: fixed;
    inset: 0;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px;
    backdrop-filter: blur(4px);
    animation: fade-in 0.2s ease-out;
    transition: background 0.4s;
    cursor:
      url('/Cursors/Wii-Curso-plain.png') 10 1,
      pointer;
  }

  .island {
    max-width: 100%;
    padding: clamp(16px, 3vmin, 32px);
    animation: rise-in 0.3s cubic-bezier(0.22, 1, 0.36, 1);
    transition:
      border-radius 0.4s,
      border-color 0.4s,
      box-shadow 0.4s;
  }

  h2 {
    margin: 0 0 clamp(12px, 2.5vmin, 24px);
    text-align: center;
    font-size: clamp(18px, 3vmin, 28px);
    transition: color 0.4s;
  }

  .options {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: clamp(12px, 2.5vmin, 24px);
  }

  // Overrides the full-screen page layout so the theme root works as a small tile
  .bgm-page.preview {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: clamp(140px, 24vmin, 220px);
    height: clamp(140px, 24vmin, 220px);
    border-radius: 20px;
  }

  @keyframes fade-in {
    from {
      opacity: 0;
    }
  }

  @keyframes rise-in {
    from {
      opacity: 0;
      transform: translateY(16px) scale(0.96);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .backdrop,
    .island {
      animation: none;
    }
  }
</style>
