<!-- Centered picker panel shared by the theme, visualizer, and video pickers; each option is a snippet -->
<script lang="ts" generics="Id extends string">
  import { onMount, type Snippet } from 'svelte';
  import type { ThemeId } from './theme_menu/themes';

  interface Props {
    title: string;
    // The page's current theme, whose stylesheet gives the island its look
    theme: ThemeId;
    ids: readonly Id[];
    onselect: (id: Id) => void;
    onclose: () => void;
    // Renders one option's tile; call `choose` when that option is picked
    option: Snippet<[Id, () => void]>;
    // Stacks the options in a column instead of wrapping them in rows
    list?: boolean;
    // Shown above the options, e.g. a button back to a previous view
    toolbar?: Snippet;
    // Shown below the options in every view, e.g. toggles for the picker's settings
    footer?: Snippet;
    // Pickers with more than one view change `title` to switch views; the new view zooms
    // in (going deeper) or out (coming back), centered on `origin`
    zoom?: 'in' | 'out';
    origin?: string;
  }

  let { title, theme, ids, onselect, onclose, option, list, toolbar, footer, zoom, origin }: Props =
    $props();

  let island: HTMLElement;
  let closing = false;

  onMount(() => {
    // Return focus to whatever opened the island once it closes
    const opener = document.activeElement as HTMLElement | null;
    island.querySelector<HTMLElement>('[aria-pressed="true"]')?.focus();
    return () => opener?.focus();
  });

  function choose(id: Id) {
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
  data-theme={theme}
  onclick={(e) => e.target === e.currentTarget && onclose()}
>
  <div
    bind:this={island}
    class="island"
    role="dialog"
    aria-modal="true"
    aria-labelledby="island-title"
  >
    {#key title}
      <div class="view {zoom ? `zoom-${zoom}` : ''}" style:transform-origin={origin}>
        <h2 id="island-title">{title}</h2>
        {@render toolbar?.()}
        <div class="options" class:list>
          {#each ids as id (id)}
            {@render option(id, () => choose(id))}
          {/each}
        </div>
      </div>
    {/key}
    {#if footer}
      <div class="footer">
        {@render footer()}
      </div>
    {/if}
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
    max-height: 100%;
    overflow-y: auto;
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

  // Outside the zooming view, so settings stay put while the views change
  .footer {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-top: clamp(14px, 2.5vmin, 24px);
  }

  .options.list {
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: stretch;
    gap: 8px;
    width: min(440px, 80vw);
    margin: 0 auto;
  }

  .zoom-in {
    animation: zoom-in 0.35s cubic-bezier(0.22, 1, 0.36, 1);
  }

  .zoom-out {
    animation: zoom-out 0.35s cubic-bezier(0.22, 1, 0.36, 1);
  }

  @keyframes zoom-in {
    from {
      opacity: 0;
      transform: scale(0.4);
    }
  }

  @keyframes zoom-out {
    from {
      opacity: 0;
      transform: scale(1.15);
    }
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
    .island,
    .view {
      animation: none;
    }
  }
</style>
