<!-- Visualizer picker: each option previews that visualizer in the current theme -->
<script lang="ts">
  import Island from './island.svelte';
  import ThemedButton from './themed-button.svelte';
  import Visualizer from './visualizer.svelte';
  import type { ThemeId } from './themes';
  import { visualizers, visualizerName, type VisualizerId } from './visualizers';

  interface Props {
    theme: ThemeId;
    current: VisualizerId;
    analyser?: AnalyserNode;
    onselect: (id: VisualizerId) => void;
    onclose: () => void;
  }

  let { theme, current, analyser, onselect, onclose }: Props = $props();
</script>

<Island title="Choose a Visualizer" {theme} ids={visualizers.map((v) => v.id)} {onselect} {onclose}>
  {#snippet option(id, choose)}
    <!-- bgm-page + data-theme gives the preview the current theme's paint -->
    <div class="bgm-page preview" data-theme={theme}>
      <div class="mini-stage">
        {#if id !== 'off'}
          <Visualizer kind={id} playing={true} {analyser} />
        {/if}
        <div class="video-frame"></div>
      </div>
      <ThemedButton
        label={visualizerName(id)}
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
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    width: clamp(170px, 26vmin, 230px);
    height: auto;
    padding: 48px 0 16px;
    border-radius: 20px;
  }

  // A small stand-in for the video, so the visualizer is seen at its real proportions
  .mini-stage {
    position: relative;
    width: 62%;
    margin-bottom: 44px;

    // The theme's frame is sized for the full video; thin it down to suit the preview
    .video-frame {
      border-width: 2px;
      border-radius: 6px;
    }
  }
</style>
