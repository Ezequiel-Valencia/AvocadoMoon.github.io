<!-- Video picker: a collection, then its videos grouped by tag; each pick zooms in a level -->
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
    // The first level of the picker; each lists the indices into `videos` it holds
    collections: { name: string; unit: string; flat?: boolean; indices: number[] }[];
    // Index into `videos` of the one playing now
    current: number;
    onselect: (index: number) => void;
    onclose: () => void;
    // Toggles shown under the options, e.g. Shuffle and Repeat
    settings?: Snippet;
  }

  let { theme, videos, collections, current, onselect, onclose, settings }: Props = $props();

  let openCollection: string | null = $state(null);
  let openTag: VideoTag | null = $state(null);

  const collection = $derived(collections.find((c) => c.name === openCollection));

  // Tags in the order videos.ts lists them, leaving out any the open collection doesn't
  // use; a video with several tags shows up in each of their groups
  const groups = $derived(
    collection
      ? videoTags
          .map((tag) => ({
            tag,
            indices: collection.indices.filter((i) => videos[i].tags.includes(tag)),
          }))
          .filter((group) => group.indices.length > 0)
      : []
  );

  let zoom: 'in' | 'out' | undefined = $state();
  // Where the clicked tile sat, so its list grows out of it and shrinks back into it
  let origin: string | undefined = $state();
  let chosen = false;

  const open = $derived(groups.find((group) => group.tag === openTag));
  // The videos being listed: an open group's, or all of a flat collection's
  const listed = $derived(open ? open.indices : collection?.flat ? collection.indices : null);
  const ids = $derived(
    listed
      ? listed.map(String)
      : collection
        ? groups.map((group) => group.tag)
        : collections.map((c) => c.name)
  );

  function count(n: number, unit: string) {
    return `${n} ${unit}${n === 1 ? '' : 'S'}`;
  }

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

  async function show(name: string | null, tag: VideoTag | null) {
    const depth = (name ? 1 : 0) + (tag ? 1 : 0);
    const was = (openCollection ? 1 : 0) + (openTag ? 1 : 0);
    zoom = depth > was ? 'in' : 'out';
    openCollection = name;
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

  // Escape and clicks outside step back out a level before closing the island; once a
  // video is picked the island closes outright
  function back() {
    if (chosen) onclose();
    else if (openTag) show(openCollection, null);
    else if (openCollection) show(null, null);
    else onclose();
  }
</script>

<div class="video-island">
  <Island
    title={openTag ?? openCollection ?? 'Choose Music'}
    {theme}
    {ids}
    list={!!listed}
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
        <button class="island-back" onclick={() => show(openCollection, null)}>← All groups</button>
      {:else if collection}
        <button class="island-back" onclick={() => show(null, null)}>← All collections</button>
      {/if}
    {/snippet}

    {#snippet option(id, choose)}
      {#if listed}
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
      {:else if collection}
        {@const group = groups.find((g) => g.tag === id)!}
        <!-- bgm-page + data-theme gives the tile the current theme's paint -->
        <div class="bgm-page preview" data-theme={theme} onclickcapture={markOrigin}>
          <ThemedButton
            label={group.tag}
            status={count(group.indices.length, collection.unit)}
            active={group.indices.includes(current)}
            onclick={() => show(collection.name, group.tag)}
          />
        </div>
      {:else}
        {@const c = collections.find((c) => c.name === id)!}
        <div class="bgm-page preview" data-theme={theme} onclickcapture={markOrigin}>
          <ThemedButton
            label={c.name}
            status={count(c.indices.length, c.unit)}
            active={c.indices.includes(current)}
            onclick={() => show(c.name, null)}
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
