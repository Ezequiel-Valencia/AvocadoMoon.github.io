<script lang="ts">
  import { onMount, tick } from 'svelte';
  import { fade } from 'svelte/transition';
  import Background from './background.svelte';
  import ThemedButton from './themed-button.svelte';
  import SubButton from './sub-button.svelte';
  import ThemeIsland from './theme_menu/theme-island.svelte';
  import Visualizer from './visualizer_menu/visualizer.svelte';
  import VisualizerIsland from './visualizer_menu/visualizer-island.svelte';
  import Menu from '../../common/menu.svelte';
  import VideoIsland from './video_menu/video-island.svelte';
  import { visualizerName, type VisualizerId } from './visualizer_menu/visualizers';
  import {
    canCaptureTabAudio,
    captureTabAudio,
    NoAudioSharedError,
    type TabAudio,
  } from './visualizer_menu/tab-audio';
  import { loadTheme, saveTheme, themeName, type ThemeId } from './theme_menu/themes';
  import {
    backgroundMusic,
    embed_youtube_video,
    destroy_youtube_video,
    youtubeEmbedUrl,
    PlayerState,
    type YouTubePlayer,
  } from './video_menu/videos';
  import './layout.scss';
  // Every theme_menu/themes/*.scss is loaded; data-theme on the page root picks which one applies
  import.meta.glob('./theme_menu/themes/*.scss', { eager: true });

  const videos = backgroundMusic;
  // Only the first video loads through src; later ones are swapped in through the API
  const embedSrc = videos.length > 0 ? youtubeEmbedUrl(videos[0].video) : '';

  let playerFrame: HTMLIFrameElement | undefined = $state();
  let player: YouTubePlayer | undefined;
  let currentIndex = $state(0);
  let playing = $state(false);

  let visualizer: VisualizerId = $state('bars');
  let shuffle = $state(false);
  let repeat = $state(false);
  let theme: ThemeId = $state('aero');
  let picking: 'theme' | 'visualizer' | 'video' | null = $state(null);
  // The video's size is the listener's choice: centered with the visualizer behind it,
  // or tucked into the corner as a mini player
  let minimized = $state(false);
  let stage: HTMLElement | undefined = $state();

  // The stage jumps straight to its new place, then a transform carries it there from the
  // old one. Transforms run on the compositor, so the video glides instead of re-laying out
  // (and resizing the YouTube iframe) on every frame
  async function toggleMinimized() {
    const first = stage?.getBoundingClientRect();
    minimized = !minimized;
    if (!stage || !first || matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    await tick();
    // A click mid-glide starts from wherever the video is now
    stage.getAnimations().forEach((a) => a.cancel());
    const last = stage.getBoundingClientRect();
    const dx = first.left - last.left;
    const dy = first.top - last.top;
    stage.animate(
      [
        { transform: `translate(${dx}px, ${dy}px) scale(${first.width / last.width})` },
        { transform: 'none' },
      ],
      { duration: 700, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' }
    );
  }

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
      playVideo(nextIndex());
    }
  }

  function playVideo(index: number) {
    currentIndex = index;
    if (playerFrame) embed_youtube_video(playerFrame, videos[index].video, onStateChange);
  }

  onMount(() => {
    theme = loadTheme();
    canListen = canCaptureTabAudio();
    if (playerFrame) {
      embed_youtube_video(playerFrame, videos[currentIndex].video, onStateChange).then(
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

  <nav class="controls" aria-label="Background music controls">
    <ThemedButton label="Theme" status={themeName(theme)} onclick={() => (picking = 'theme')} />
    {#if videos.length > 0}
      <ThemedButton
        label="Videos"
        status="{currentIndex + 1} / {videos.length}"
        onclick={() => (picking = 'video')}
      />
    {/if}
    <ThemedButton
      label="Audio Visualizers"
      status={visualizerName(visualizer).toUpperCase()}
      active={visualizer !== 'off'}
      onclick={() => (picking = 'visualizer')}
    />
  </nav>

  <section bind:this={stage} class="stage {minimized ? 'docked' : 'focused'}">
    {#if !minimized && visualizer !== 'off'}
      <!-- Unpositioned, so the visualizer still places itself against the stage -->
      <div transition:fade={{ duration: 300 }}>
        <Visualizer kind={visualizer} {playing} analyser={liveAudio?.analyser} />
      </div>
    {/if}

    <div class="video-frame">
      {#if videos.length === 0}
        <p class="empty">
          Add YouTube links to <code>video_menu/videos.ts</code> to start listening.
        </p>
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

    <!-- Spans the video's width: below it to minimize, above the mini player to expand -->
    <button
      class="stage-toggle"
      aria-label={minimized ? 'Expand video' : 'Minimize video'}
      aria-expanded={!minimized}
      onclick={toggleMinimized}
    >
      <svg viewBox="0 0 24 12" aria-hidden="true">
        <polyline points="2,2 12,10 22,2" />
      </svg>
    </button>
  </section>
</div>
<Menu songName={videos[currentIndex]?.title ?? ''}></Menu>

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
  >
    {#snippet settings()}
      {#if canListen}
        <SubButton
          label="Live Audio"
          status={liveAudio ? 'ON' : noAudioShared ? 'NO AUDIO' : 'OFF'}
          active={!!liveAudio}
          onclick={toggleLiveAudio}
        />
      {/if}
    {/snippet}
  </VisualizerIsland>
{:else if picking === 'video'}
  <VideoIsland
    {theme}
    {videos}
    current={currentIndex}
    onselect={(index) => index !== currentIndex && playVideo(index)}
    onclose={() => (picking = null)}
  >
    {#snippet settings()}
      <SubButton
        label="Shuffle"
        status={shuffle ? 'ON' : 'OFF'}
        active={shuffle}
        onclick={() => (shuffle = !shuffle)}
      />
      <SubButton
        label="Repeat"
        status={repeat ? 'ON' : 'OFF'}
        active={repeat}
        onclick={() => (repeat = !repeat)}
      />
    {/snippet}
  </VideoIsland>
{/if}
