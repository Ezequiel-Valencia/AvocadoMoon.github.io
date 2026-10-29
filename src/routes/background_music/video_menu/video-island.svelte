<!-- Video picker: a collection, then its videos grouped by tag; each pick zooms in a level -->
<script lang="ts">
  import { tick } from 'svelte';
  import Island from '../island.svelte';
  import ThemedButton from '../themed-button.svelte';
  import type { ThemeId } from '../theme_menu/themes';
  import { videoTags, type Video, type VideoTag } from './videos';
  import { getVideoCoverImage, getYoutubeVideoId } from '../../../common/youtube';

  interface Props {
    theme: ThemeId;
    videos: Video[];
    // The first level of the picker; each lists the indices into `videos` it holds
    collections: { name: string; unit: string; flat?: boolean; indices: number[] }[];
    // Index into `videos` of the one playing now
    current: number;
    onselect: (index: number) => void;
    onclose: () => void;
  }

  let { theme, videos, collections, current, onselect, onclose }: Props = $props();

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
        {@const url = videos[group.indices[0]].video}
        <!-- The genre's first video under a frosted pane, the same look in every theme -->
        <button
          class="genre-tile"
          aria-pressed={group.indices.includes(current)}
          onclick={(e) => {
            markOrigin(e);
            show(collection.name, group.tag);
          }}
        >
          <img
            class="genre-cover"
            src={getVideoCoverImage(url)}
            alt=""
            loading="lazy"
            onload={(e) => coverFallback(e, url)}
            onerror={(e) => coverFallback(e, url)}
          />
          <span class="genre-pane">
            <span class="genre-label">{group.tag}</span>
            <span class="genre-status">{count(group.indices.length, collection.unit)}</span>
          </span>
        </button>
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

  // Smaller than the collection tiles, so a collection's many genres fit together
  .genre-tile {
    position: relative;
    width: clamp(96px, 15vmin, 140px);
    height: clamp(96px, 15vmin, 140px);
    padding: 0;
    overflow: hidden;
    border: none;
    border-radius: 18px;
    font: inherit;
    color: white;
    background: rgba(0, 0, 0, 0.25);
    box-shadow:
      inset 0 0 0 1px rgba(255, 255, 255, 0.45),
      0 6px 16px rgba(0, 0, 0, 0.25);
    cursor: inherit;
    transition:
      transform 0.15s ease-out,
      box-shadow 0.2s;

    &:hover,
    &:focus-visible {
      transform: translateY(-3px);

      // The cover sharpens under a tint from the theme's palette, deep enough that the
      // text stays readable over it
      .genre-pane {
        backdrop-filter: blur(4px) saturate(1.3) brightness(0.8);
        background: var(--genre-hover, rgba(10, 12, 20, 0.5));
      }
    }

    &:active {
      transform: scale(0.95);
    }

    &:focus-visible {
      outline: 2px solid white;
      outline-offset: 3px;
    }

    // The genre holding what's playing now
    &[aria-pressed='true'] {
      box-shadow:
        inset 0 0 0 3px rgba(255, 255, 255, 0.9),
        0 0 18px rgba(255, 255, 255, 0.55);
    }
  }

  .genre-cover {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .genre-pane {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4px;
    padding: 8px;
    text-align: center;
    // A dark tint and darkened blur, so white text reads even over bright covers
    text-shadow:
      0 1px 2px rgba(0, 0, 0, 0.8),
      0 0 8px rgba(0, 0, 0, 0.5);
    background: rgba(10, 12, 20, 0.38);
    backdrop-filter: blur(10px) saturate(1.3) brightness(0.8);
    transition:
      backdrop-filter 0.2s,
      background 0.2s;
  }

  .genre-label {
    font-size: clamp(13px, 1.9vmin, 16px);
    font-weight: 700;
    line-height: 1.15;
  }

  .genre-status {
    font-size: clamp(9px, 1.2vmin, 11px);
    letter-spacing: 0.08em;
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
