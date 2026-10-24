<!-- Theme picker: each theme shown as one of its own buttons -->
<script lang="ts">
  import Island from './island.svelte';
  import ThemedButton from './themed-button.svelte';
  import { themes, themeName, type ThemeId } from './themes';

  interface Props {
    current: ThemeId;
    onselect: (id: ThemeId) => void;
    onclose: () => void;
  }

  let { current, onselect, onclose }: Props = $props();
</script>

<Island title="Choose a Theme" theme={current} ids={themes.map((t) => t.id)} {onselect} {onclose}>
  {#snippet option(id, choose)}
    <!-- bgm-page + data-theme lets each tile pick up that theme's stylesheet -->
    <div class="bgm-page preview" data-theme={id}>
      <ThemedButton
        label={themeName(id)}
        status={id === current ? 'CURRENT' : 'SELECT'}
        active={id === current}
        onclick={choose}
      />
    </div>
  {/snippet}
</Island>

<style lang="scss">
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
</style>
