<script lang="ts">
  import { onMount } from 'svelte';
  import BlocksAnimated from '../../components/decals/blocks-animated.svelte';
  import CubeButton from './cube-button.svelte';
  import {
    backgroundMusic,
    embed_youtube_video,
    destroy_youtube_video,
    PlayerState,
    type YouTubePlayer,
  } from './videos';

  const videos = backgroundMusic.videos;
  const barCount = 40;

  let playerContainer: HTMLElement;
  let player: YouTubePlayer | undefined;
  let currentIndex = $state(0);
  let playing = $state(false);

  let visualizers = $state(true);
  let shuffle = $state(false);
  let repeat = $state(false);

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

<div id="main-div">
  <h1 class="title">Background Music</h1>

  <nav class="controls" aria-label="Background music controls">
    <CubeButton label="Theme" toggle={false} onclick={() => {}} />
    <CubeButton
      label="Audio Visualizers"
      active={visualizers}
      onclick={() => (visualizers = !visualizers)}
    />
    <CubeButton label="Shuffle" active={shuffle} onclick={() => (shuffle = !shuffle)} />
    <CubeButton label="Repeat" active={repeat} onclick={() => (repeat = !repeat)} />
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

  <BlocksAnimated></BlocksAnimated>
</div>

<style lang="scss">
  #main-div {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    overflow: hidden;
    background: linear-gradient(180deg, rgb(214, 238, 255) 0%, rgb(245, 245, 245) 55%);
    cursor:
      url('/Cursors/Wii-Curso-plain.png') 10 1,
      pointer;
    font-family: 'Segoe UI', 'Trebuchet MS', Arial, sans-serif;
  }

  .title {
    margin: 3vh 0 1vh;
    text-align: center;
    font-size: clamp(28px, 6vmin, 64px);
    font-weight: 700;
    color: rgb(30, 120, 210);
    text-shadow:
      0 2px 0 white,
      0 0 18px rgba(33, 185, 255, 0.45);
  }

  .controls {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: clamp(20px, 5vmin, 56px);
    padding: 2vh 16px;
    position: relative;
    z-index: 5;
  }

  .stage {
    position: absolute;
    z-index: 2;
    transition: all 0.8s cubic-bezier(0.22, 1, 0.36, 1);
  }

  // Visualizers on: the video is the centerpiece with bars behind it
  .stage.focused {
    left: 50%;
    top: 62%;
    width: min(64vw, 92vh, 960px);
    transform: translate(-50%, -50%);
  }

  // Visualizers off: the video tucks into the corner like a mini player
  .stage.docked {
    left: calc(100% - 16px);
    top: calc(100% - 16px);
    width: min(32vw, 420px);
    transform: translate(-100%, -100%);
  }

  .video-frame {
    position: relative;
    aspect-ratio: 16 / 9;
    width: 100%;
    border-radius: 18px;
    overflow: hidden;
    background: rgba(255, 255, 255, 0.35);
    border: 3px solid rgba(255, 255, 255, 0.9);
    box-shadow:
      0 0 0 2px rgba(33, 150, 243, 0.45),
      0 18px 40px rgba(20, 100, 180, 0.3),
      inset 0 0 30px rgba(255, 255, 255, 0.5);
    backdrop-filter: blur(6px);

    :global(iframe) {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
    }
  }

  .empty {
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: center;
    padding: 16px;
    text-align: center;
    color: rgb(30, 100, 180);
  }

  .visualizer {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 130%;
    height: 150%;
    transform: translate(-50%, -50%);
    display: flex;
    align-items: center;
    gap: 4px;
    pointer-events: none;
  }

  .bar {
    flex: 1;
    height: 100%;
    border-radius: 999px;
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.95) 0%,
      rgba(64, 170, 255, 0.85) 30%,
      rgba(64, 170, 255, 0.85) 70%,
      rgba(255, 255, 255, 0.95) 100%
    );
    box-shadow: 0 0 10px rgba(33, 185, 255, 0.5);
    transform: scaleY(0.12);
    transition: transform 0.6s;
    animation: pulse var(--duration) ease-in-out var(--delay) infinite alternate;
    animation-play-state: paused;
  }

  .playing .bar {
    animation-play-state: running;
  }

  @keyframes pulse {
    0% {
      transform: scaleY(0.12);
    }
    50% {
      transform: scaleY(calc(var(--peak) * 0.6));
    }
    100% {
      transform: scaleY(var(--peak));
    }
  }

  @media (max-width: 600px) {
    .stage.focused {
      top: 68%;
      width: calc(100vw - 32px);
    }
    .stage.docked {
      width: 60vw;
    }
    .visualizer {
      width: 110%;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .stage {
      transition: none;
    }
    .playing .bar {
      animation-play-state: paused;
    }
  }
</style>
