<script lang="ts">
  import { onMount } from 'svelte';
  import Background from './background.svelte';
  import ThemedButton from './themed-button.svelte';
  import { loadTheme, nextTheme, saveTheme, themeName, type ThemeId } from './themes';
  import {
    backgroundMusic,
    embed_youtube_video,
    destroy_youtube_video,
    PlayerState,
    type YouTubePlayer,
  } from './videos';
  import './layout.scss';
  // Every themes/*.scss is loaded; data-theme on the page root picks which one applies
  import.meta.glob('./themes/*.scss', { eager: true });

  const videos = backgroundMusic.videos;
  const barCount = 40;

  let playerContainer: HTMLElement;
  let player: YouTubePlayer | undefined;
  let currentIndex = $state(0);
  let playing = $state(false);

  let visualizers = $state(true);
  let shuffle = $state(false);
  let repeat = $state(false);
  let theme: ThemeId = $state('aero');

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
      embed_youtube_video(playerContainer, videos[currentIndex], onStateChange);
    }
  }

  onMount(() => {
    theme = loadTheme();
    if (videos.length > 0) {
      embed_youtube_video(playerContainer, videos[currentIndex], onStateChange).then(
        (p) => (player = p)
      );
    }
    return destroy_youtube_video;
  });

  // Each bar gets its own speed and offset so the visualizer doesn't pulse in unison
  const bars = Array.from({ length: barCount }, (_, i) => ({
    duration: 0.6 + ((i * 37) % 11) / 10,
    delay: -((i * 53) % 17) / 10,
    peak: 0.35 + ((i * 29) % 13) / 20,
  }));
</script>

<svelte:head>
  <title>Background Music</title>
</svelte:head>

<div class="bgm-page" data-theme={theme}>
  <Background />

  <h1 class="title">Background Music</h1>

  <nav class="controls" aria-label="Background music controls">
    <ThemedButton
      label="Theme"
      status={themeName(theme)}
      onclick={() => {
        theme = nextTheme(theme);
        saveTheme(theme);
      }}
    />
    <ThemedButton
      label="Audio Visualizers"
      status={visualizers ? 'ON' : 'OFF'}
      active={visualizers}
      onclick={() => (visualizers = !visualizers)}
    />
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

  <section class="stage {visualizers ? 'focused' : 'docked'}">
    {#if visualizers}
      <div class="visualizer {playing ? 'playing' : ''}" aria-hidden="true">
        {#each bars as bar, i (i)}
          <span
            class="bar"
            style="--duration: {bar.duration}s; --delay: {bar.delay}s; --peak: {bar.peak};"
          ></span>
        {/each}
      </div>
    {/if}

    <div class="video-frame">
      {#if videos.length === 0}
        <p class="empty">Add YouTube links to <code>videos.ts</code> to start listening.</p>
      {/if}
      <!-- The YouTube API replaces this element with its iframe -->
      <div bind:this={playerContainer}></div>
    </div>
  </section>
</div>
