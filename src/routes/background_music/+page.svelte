<script lang="ts">
  import { onMount } from 'svelte';
  import Background from './background.svelte';
  import ThemedButton from './themed-button.svelte';
  import ThemeIsland from './theme-island.svelte';
  import Visualizer from './visualizer.svelte';
  import VisualizerIsland from './visualizer-island.svelte';
  import { visualizerName, type VisualizerId } from './visualizers';
  import {
    canCaptureTabAudio,
    captureTabAudio,
    NoAudioSharedError,
    type TabAudio,
  } from './tab-audio';
  import { loadTheme, saveTheme, themeName, type ThemeId } from './themes';
  import {
    backgroundMusic,
    embed_youtube_video,
    destroy_youtube_video,
    youtubeEmbedUrl,
    PlayerState,
    type YouTubePlayer,
  } from './videos';
  import './layout.scss';
  // Every themes/*.scss is loaded; data-theme on the page root picks which one applies
  import.meta.glob('./themes/*.scss', { eager: true });

  const videos = backgroundMusic.videos;
  // Only the first video loads through src; later ones are swapped in through the API
  const embedSrc = videos.length > 0 ? youtubeEmbedUrl(videos[0]) : '';

  let playerFrame: HTMLIFrameElement | undefined = $state();
  let player: YouTubePlayer | undefined;
  let currentIndex = $state(0);
  let playing = $state(false);

  let visualizer: VisualizerId = $state('bars');
  let shuffle = $state(false);
  let repeat = $state(false);
  let theme: ThemeId = $state('aero');
  let picking: 'theme' | 'visualizer' | null = $state(null);

  // Live tab audio for the visualizers; only offered in browsers that can share it
  let canListen = $state(false);
  let liveAudio: TabAudio | null = $state.raw(null);
  let noAudioShared = $state(false);

  async function toggleLiveAudio() {
    if (liveAudio) {
      liveAudio.stop();
      liveAudio = null;
      return;
    }
    try {
      liveAudio = await captureTabAudio(() => (liveAudio = null));
      noAudioShared = false;
    } catch (e) {
      // Cancelling the prompt just leaves it off; sharing without audio gets called out
      noAudioShared = e instanceof NoAudioSharedError;
    }
  }

  // The YouTube player's callback is created once, so it reads these through a function
  // to always see the current toggle values
  function nextIndex(): number {
    if (videos.length <= 1) return 0;
    if (shuffle) {
      let next = currentIndex;
      while (next === currentIndex) next = Math.floor(Math.random() * videos.length);
      return next;
    }
    return (currentIndex + 1) % videos.length;
  }

  function onStateChange(state: number) {
    playing = state === PlayerState.PLAYING;
    if (state !== PlayerState.ENDED) return;

    if (repeat) {
      player?.seekTo(0, true);
      player?.playVideo();
    } else {
      currentIndex = nextIndex();
      if (playerFrame) embed_youtube_video(playerFrame, videos[currentIndex], onStateChange);
    }
  }

  onMount(() => {
    theme = loadTheme();
    canListen = canCaptureTabAudio();
    if (playerFrame) {
      embed_youtube_video(playerFrame, videos[currentIndex], onStateChange).then(
        (p) => (player = p)
      );
    }
    return () => {
      destroy_youtube_video();
      liveAudio?.stop();
    };
  });
</script>

<svelte:head>
  <title>Background Music</title>
</svelte:head>

<div class="bgm-page" data-theme={theme}>
  <Background />

  <h1 class="title">Background Music</h1>

  <nav class="controls" aria-label="Background music controls">
    <ThemedButton label="Theme" status={themeName(theme)} onclick={() => (picking = 'theme')} />
    <ThemedButton
      label="Audio Visualizers"
      status={visualizerName(visualizer).toUpperCase()}
      active={visualizer !== 'off'}
      onclick={() => (picking = 'visualizer')}
    />
    {#if canListen}
      <ThemedButton
        label="Live Audio"
        status={liveAudio ? 'ON' : noAudioShared ? 'NO AUDIO' : 'OFF'}
        active={!!liveAudio}
        onclick={toggleLiveAudio}
      />
    {/if}
    <ThemedButton
      label="Shuffle"
      status={shuffle ? 'ON' : 'OFF'}
      active={shuffle}
      onclick={() => (shuffle = !shuffle)}
    />
    <ThemedButton
      label="Repeat"
      status={repeat ? 'ON' : 'OFF'}
      active={repeat}
      onclick={() => (repeat = !repeat)}
    />
  </nav>

  <section class="stage {visualizer !== 'off' ? 'focused' : 'docked'}">
    {#if visualizer !== 'off'}
      <Visualizer kind={visualizer} {playing} analyser={liveAudio?.analyser} />
    {/if}

    <div class="video-frame">
      {#if videos.length === 0}
        <p class="empty">Add YouTube links to <code>videos.ts</code> to start listening.</p>
      {:else}
        <!-- A plain embed iframe; the YouTube API only attaches to it to track playback -->
        <iframe
          bind:this={playerFrame}
          src={embedSrc}
          title="Background music"
          referrerpolicy="strict-origin-when-cross-origin"
          allow="autoplay; encrypted-media; picture-in-picture"
          allowfullscreen
        ></iframe>
      {/if}
    </div>
  </section>
</div>

<!-- Outside the page root so the current theme's styles don't reach the other themes' previews -->
{#if picking === 'theme'}
  <ThemeIsland
    current={theme}
    onselect={(id) => {
      theme = id;
      saveTheme(id);
    }}
    onclose={() => (picking = null)}
  />
{:else if picking === 'visualizer'}
  <VisualizerIsland
    {theme}
    current={visualizer}
    analyser={liveAudio?.analyser}
    onselect={(id) => (visualizer = id)}
    onclose={() => (picking = null)}
  />
{/if}
