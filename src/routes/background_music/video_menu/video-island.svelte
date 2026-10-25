<!-- Video picker: videos grouped by tag; picking a group zooms in to a list of its videos -->
<script lang="ts">
  import { tick, type Snippet } from 'svelte';
  import Island from '../island.svelte';
  import ThemedButton from '../themed-button.svelte';
  import type { ThemeId } from '../theme_menu/themes';
  import {
    getVideoCoverImage,
    getYoutubeVideoId,
    videoTags,
    type Video,
    type VideoTag,
  } from './videos';

  interface Props {
    theme: ThemeId;
    videos: Video[];
    // Index into `videos` of the one playing now
    current: number;
    onselect: (index: number) => void;
    onclose: () => void;
    // Toggles shown under the options, e.g. Shuffle and Repeat
    settings?: Snippet;
  }

  let { theme, videos, current, onselect, onclose, settings }: Props = $props();

  // Tags in the order videos.ts lists them, leaving out any no video uses yet; a video
  // with several tags shows up in each of their groups
  const groups = $derived(
    videoTags
      .map((tag) => ({
        tag,
        indices: videos.flatMap((video, i) => (video.tags.includes(tag) ? [i] : [])),
      }))
      .filter((group) => group.indices.length > 0)
  );

  let openTag: VideoTag | null = $state(null);
  let zoom: 'in' | 'out' | undefined = $state();
  // Where the clicked group sat, so its list grows out of it and shrinks back into it
  let origin: string | undefined = $state();
  let chosen = false;

  const open = $derived(groups.find((group) => group.tag === openTag));
  const ids = $derived(open ? open.indices.map(String) : groups.map((group) => group.tag));

  // Not every video has a full-size cover; YouTube answers with an error or a tiny grey
  // placeholder instead, so those fall back to the smaller cover every video has
  function coverFallback(e: Event, url: string) {
    const img = e.currentTarget as HTMLImageElement;
    if (e.type === 'load' && img.naturalWidth > 120) return;
    const fallback = `https://i.ytimg.com/vi/${getYoutubeVideoId(url)}/hqdefault.jpg`;
    if (img.src !== fallback) img.src = fallback;
  }

  function markOrigin(e: MouseEvent) {
    const tile = e.currentTarget as HTMLElement;
    const view = tile.closest('.view');
    if (!view) return;
    const t = tile.getBoundingClientRect();
    const v = view.getBoundingClientRect();
    origin = `${t.left + t.width / 2 - v.left}px ${t.top + t.height / 2 - v.top}px`;
  }

  async function show(tag: VideoTag | null) {
    zoom = tag ? 'in' : 'out';
    openTag = tag;
    // Keep keyboard focus inside the island as its contents are swapped out
    await tick();
    const focusable = [
      '.video-island [aria-current="true"]',
      '.video-island .island-back',
      '.video-island [aria-pressed="true"]',
    ];
    for (const selector of focusable) {
      const el = document.querySelector<HTMLElement>(selector);
      if (el) return el.focus();
    }
  }

  // Escape and clicks outside step back out of a group before closing the island; once a
  // video is picked the island closes outright
  function back() {
    if (openTag && !chosen) show(null);
    else onclose();
  }
</script>

<div class="video-island">
  <Island
    title={openTag ?? 'Choose a Video'}
    {theme}
    {ids}
    list={!!open}
    {zoom}
    {origin}
    onselect={(id) => {
      chosen = true;
      onselect(Number(id));
    }}
    onclose={back}
    footer={settings}
  >
    {#snippet toolbar()}
      {#if open}
        <button class="island-back" onclick={() => show(null)}>← All groups</button>
      {/if}
    {/snippet}

    {#snippet option(id, choose)}
      {#if open}
        {@const index = Number(id)}
        {@const url = videos[index].video}
        <button class="video-row" aria-current={index === current} onclick={choose}>
          <img
            class="video-cover"
            src={getVideoCoverImage(url)}
            alt=""
            loading="lazy"
            onload={(e) => coverFallback(e, url)}
            onerror={(e) => coverFallback(e, url)}
          />
          <span class="video-title">{videos[index].title}</span>
          {#if index === current}
            <span class="video-status">PLAYING</span>
          {/if}
        </button>
      {:else}
        {@const group = groups.find((g) => g.tag === id)!}
        <!-- bgm-page + data-theme gives the tile the current theme's paint -->
        <div class="bgm-page preview" data-theme={theme} onclickcapture={markOrigin}>
          <ThemedButton
            label={group.tag}
            status="{group.indices.length} {group.indices.length === 1 ? 'VIDEO' : 'VIDEOS'}"
            active={group.indices.includes(current)}
            onclick={() => show(group.tag)}
          />
        </div>
      {/if}
    {/snippet}
  </Island>
</div>

<style lang="scss">
  // Only a wrapper for finding this island's elements; it takes no space itself
  .video-island {
    display: contents;
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

  // Layout only; each theme's stylesheet colors the rows and the back button
  .island-back {
    display: block;
    margin: 0 auto clamp(12px, 2vmin, 20px);
    padding: 6px 14px;
    font: inherit;
    font-size: 14px;
    cursor: inherit;
  }

  .video-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 14px;
    padding: 8px 16px 8px 8px;
    font: inherit;
    font-size: clamp(14px, 2vmin, 17px);
    text-align: left;
    cursor: inherit;
    transition:
      transform 0.15s,
      background 0.15s;

    &:hover,
    &:focus-visible {
      transform: translateX(4px);
    }
  }

  // A preview of the video's visuals, cropped to the player's shape
  .video-cover {
    // Themes with pill-shaped rows read this to round the cover's left end to match
    --cover-width: clamp(96px, 16vmin, 144px);
    flex-shrink: 0;
    width: var(--cover-width);
    aspect-ratio: 16 / 9;
    object-fit: cover;
    border-radius: 8px;
    background: rgba(0, 0, 0, 0.15);
  }

  .video-title {
    flex: 1;
  }

  .video-status {
    flex-shrink: 0;
    font-size: 11px;
    letter-spacing: 0.1em;
  }
</style>
