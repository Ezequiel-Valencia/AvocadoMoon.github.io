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
  import { loadSettings, saveSettings } from './settings';
  import { collections } from './video_menu/videos';
  import {
    embed_youtube_video,
    destroy_youtube_video,
    isMidPlaylist,
    getYoutubePlaylistId,
    getYoutubeVideoId,
    youtubeEmbedUrl,
    PlayerState,
    type YouTubePlayer,
  } from '../../common/youtube';
  import './layout.scss';
  // Every theme_menu/themes/*.scss is loaded; data-theme on the page root picks which one applies
  import.meta.glob('./theme_menu/themes/*.scss', { eager: true });

  // Every collection's videos in one list; each collection keeps the indices of its own
  const videos = collections.flatMap((collection) => collection.videos);
  const pickerCollections = collections.reduce<
    { name: string; unit: string; flat?: boolean; indices: number[] }[]
  >((all, { name, unit, flat, videos: own }) => {
    const start = all.reduce((count, c) => count + c.indices.length, 0);
    return [...all, { name, unit, flat, indices: own.map((_, i) => start + i) }];
  }, []);
  // Single videos are swapped in through the API; the first video and albums load through src.
  // Set once the saved video is known, so the page doesn't load one video then another
  let embedSrc = $state('');

  let playerFrame: HTMLIFrameElement | undefined = $state();
  let player: YouTubePlayer | undefined;
  let currentIndex = $state(0);
  let playing = $state(false);

  let visualizer: VisualizerId = $state('off');
  let theme: ThemeId = $state('aero');
  let picking: 'theme' | 'visualizer' | 'video' | null = $state(null);
  // The video's size is the listener's choice: centered with the visualizer behind it,
  // or tucked into the corner as a mini player
  let minimized = $state(false);
  let stage: HTMLElement | undefined = $state();

  // Saving waits until the saved settings are loaded, or the defaults would replace them
  let settingsLoaded = $state(false);
  $effect(() => {
    if (!settingsLoaded) return;
    saveSettings({
      visualizer,
      video: videos[currentIndex]?.video ?? '',
      minimized,
    });
  });

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

  // Playback stays within the playing video's collection, so background music doesn't
  // run on into an album
  function nextIndex(): number {
    const pool =
      pickerCollections.find((c) => c.indices.includes(currentIndex))?.indices ??
      videos.map((_, i) => i);
    if (pool.length <= 1) return pool[0] ?? 0;
    return pool[(pool.indexOf(currentIndex) + 1) % pool.length];
  }

  function onStateChange(state: number) {
    playing = state === PlayerState.PLAYING;
    if (state !== PlayerState.ENDED) return;

    // A playlist moves on to its next song by itself
    if (!player || !isMidPlaylist(player)) playVideo(nextIndex());
  }

  // Hooks the API onto the iframe once it has rendered with its src
  async function attachPlayer() {
    await tick();
    const frame = playerFrame;
    if (!frame) return;
    const attached = await embed_youtube_video(frame, onStateChange);
    // A newer pick may have swapped the iframe out while the API loaded
    if (frame === playerFrame) player = attached;
  }

  function playVideo(index: number) {
    currentIndex = index;
    const url = videos[index].video;
    if (player && !getYoutubePlaylistId(url)) {
      player.loadVideoById(getYoutubeVideoId(url));
      return;
    }
    // The API switches playlists a pick late, so an album's song gets a fresh embed that
    // starts right on it and plays on through the rest of the album
    player = undefined;
    embedSrc = youtubeEmbedUrl(url, true);
    attachPlayer();
  }

  onMount(() => {
    theme = loadTheme();
    const saved = loadSettings();
    visualizer = saved.visualizer ?? visualizer;
    minimized = saved.minimized ?? minimized;
    currentIndex = Math.max(
      0,
      videos.findIndex((v) => v.video === saved.video)
    );
    settingsLoaded = true;

    canListen = canCaptureTabAudio();
    if (videos.length > 0) {
      embedSrc = youtubeEmbedUrl(videos[currentIndex].video);
      attachPlayer();
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
      <ThemedButton label="Music" onclick={() => (picking = 'video')} />
    {/if}
    <ThemedButton
      label="Audio Visualizers"
      status={visualizerName(visualizer).toUpperCase()}
      active={visualizer !== 'off'}
      onclick={() => (picking = 'visualizer')}
    />
  </nav>

  <!-- The visualizer keeps the expanded video's place whether or not the video is there,
       so it plays on in the middle of the page while the video is minimized -->
  <div class="visualizer-stage">
    {#if visualizer !== 'off'}
      <!-- Unpositioned, so the visualizer still places itself against the visualizer stage -->
      <div transition:fade={{ duration: 300 }}>
        <Visualizer kind={visualizer} {playing} analyser={liveAudio?.analyser} />
      </div>
    {/if}
  </div>

  <section bind:this={stage} class="stage {minimized ? 'docked' : 'focused'}">
    <div class="video-frame">
      {#if videos.length === 0}
        <p class="empty">
          Add YouTube links to <code>video_menu/videos.ts</code> to start listening.
        </p>
      {:else if embedSrc}
        <!-- A plain embed iframe; the YouTube API only attaches to it to track playback.
             Keyed so a new src gets a new iframe for the API to attach to -->
        {#key embedSrc}
          <iframe
            bind:this={playerFrame}
            src={embedSrc}
            title="Background music"
            referrerpolicy="strict-origin-when-cross-origin"
            allow="autoplay; encrypted-media; picture-in-picture"
            allowfullscreen
          ></iframe>
        {/key}
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
    collections={pickerCollections}
    current={currentIndex}
    onselect={(index) => index !== currentIndex && playVideo(index)}
    onclose={() => (picking = null)}
  />
{/if}
