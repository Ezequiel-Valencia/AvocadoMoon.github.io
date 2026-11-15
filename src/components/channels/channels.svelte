<script lang="ts">
  import { onMount, tick } from 'svelte';
  import { fly } from 'svelte/transition';
  import { cubicInOut } from 'svelte/easing';
  import { musicController, musicTime, sfxController } from '../../common/myLocalStorage';
  import { channels, isChannel, maxCols, maxRows, paginate, type Channel } from './channelObject';
  import {
    openChannel,
    playBackgroundMusic,
    playChannelMusic,
    stopMusic,
    type MusicClip,
  } from './channelFunctions';
  import ChannelCube from './channel-cube.svelte';
  import YoutubeAudio from '../../common/youtube-audio.svelte';
  import { isYoutubeUrl } from '../../common/youtube';

  // YouTube clips fill in their place once their player is ready
  const songElements: MusicClip[] = [];
  const channelBoxes: HTMLElement[] = [];
  const channelTiles: HTMLElement[] = [];
  let continueButton: HTMLButtonElement | undefined = $state();

  let focusedChannel = $state(-1);
  let selected = $derived(focusedChannel == -1 ? undefined : (channels[focusedChannel] as Channel));

  // How many cubes fit on the screen; until measured, assume the full grid
  let cols = $state(maxCols);
  let rows = $state(maxRows);
  let measured = $state(false);
  let pageSize = $derived(cols * rows);
  let channelPages = $derived(paginate(channels, pageSize));

  let pager: HTMLElement;
  let probe: HTMLElement;
  let leftArrow: HTMLElement;

  // Fit as many columns and rows as the screen allows, up to the full grid, so nothing needs scrolling
  function fitGrid() {
    // A selected cube lives on its page, so wait until it's put back
    if (focusedChannel != -1) return;
    const phone = window.matchMedia('(max-width: 600px)').matches;
    const tile = probe.firstElementChild!.getBoundingClientRect();
    const grid = getComputedStyle(probe);
    const gap = parseFloat(grid.columnGap) || 0;
    const pad = parseFloat(grid.paddingLeft) || 0;
    const pagerRect = pager.getBoundingClientRect();
    const menubar = document.getElementById('menu-bar');

    let width = pagerRect.width;
    let bottom = window.innerHeight;
    if (phone) {
      // The arrows and then the menubar sit below the channels
      const arrowRow =
        leftArrow.getBoundingClientRect().height +
        parseFloat(getComputedStyle(pager).rowGap || '0');
      bottom -= arrowRow + (menubar?.offsetHeight ?? 0);
    } else {
      // Leave room for the arrows at the sides and stop above the name in the menubar
      width -= 2 * (leftArrow.getBoundingClientRect().right - pagerRect.left + gap);
      const name = menubar?.querySelector('h1');
      if (name) bottom = name.getBoundingClientRect().top;
    }
    const height = bottom - pagerRect.top;

    const fit = (space: number, size: number, max: number) =>
      Math.min(max, Math.max(1, Math.floor((space - 2 * pad + gap) / (size + gap))));
    const newSize = fit(width, tile.width, maxCols) * fit(height, tile.height, maxRows);

    // Keep the first channel on screen in view when the page size changes
    if (newSize != pageSize) {
      const onBlankPage = page == channelPages.length - 1;
      const first = page * pageSize;
      const pages = paginate(channels, newSize).length;
      page = onBlankPage ? pages - 1 : Math.min(Math.floor(first / newSize), pages - 2);
    }
    cols = fit(width, tile.width, maxCols);
    rows = fit(height, tile.height, maxRows);
    measured = true;
  }

  onMount(() => {
    fitGrid();
    let frame = 0;
    const onResize = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(fitGrid);
    };
    window.addEventListener('resize', onResize);
    // The menubar's height on phones can change once its fonts load
    const menubar = document.getElementById('menu-bar');
    const observer = new ResizeObserver(onResize);
    if (menubar) observer.observe(menubar);
    return () => {
      window.removeEventListener('resize', onResize);
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  });

  // Which page of channels is showing; the cubes slide while the background stays put
  const SLIDE_MS = 450;
  let page = $state(0);
  let direction = $state(1);
  let sliding = false;
  let slideTimer: ReturnType<typeof setTimeout> | undefined;
  const reducedMotion =
    typeof window != 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const slideMs = reducedMotion ? 0 : SLIDE_MS;

  // Steps one page left or right, wrapping around past the blank page at the end
  function turnPage(step: 1 | -1) {
    if (focusedChannel != -1) return;
    direction = step;
    page = (page + step + channelPages.length) % channelPages.length;
    sliding = true;
    clearTimeout(slideTimer);
    slideTimer = setTimeout(() => (sliding = false), slideMs);
    playSfx('channel-click-audio');
  }

  musicTime.reset();

  // The page's sound effects and background music come and go with the audio settings
  const pageAudio = (id: string) => document.getElementById(id) as HTMLAudioElement | null;

  function playSfx(id: string) {
    if ($sfxController)
      pageAudio(id)
        ?.play()
        .catch(() => {});
  }

  async function select(index: number) {
    const channel = channels[index];
    if (sliding || !isChannel(channel) || focusedChannel == index) return;
    if ($musicController) playChannelMusic(channel, pageAudio('bgm'), songElements[index]);
    focusedChannel = index;
    await moveChannelToCenter(index);
    continueButton?.focus();
  }

  function back() {
    const index = focusedChannel;
    if (index == -1) return;
    focusedChannel = -1;
    channelBoxes[index].style.transform = '';
    playSfx('channel-click-audio');
    if ($musicController) playBackgroundMusic(pageAudio('bgm'), songElements[index]);
    channelTiles[index]?.focus();
    fitGrid();
  }

  function enter() {
    playSfx('channel-click-audio');
    if ($musicController) stopMusic(songElements[focusedChannel]);
    if (selected) openChannel(selected);
  }

  async function moveChannelToCenter(index: number) {
    // Measure once the box has switched to its fixed position, which ignores how far the page is scrolled
    await tick();
    const box = channelBoxes[index];
    const rect = box.getBoundingClientRect();

    const centerX = window.innerWidth / 2 + rect.width / 4;
    const centerY = window.innerHeight / 2 + rect.height / 4;
    const deltaX = centerX - (rect.left + rect.width);
    const deltaY = centerY - (rect.top + rect.height);

    box.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
  }

  function onKeydown(e: KeyboardEvent, index: number) {
    if (e.key == 'Enter' || e.key == ' ') {
      e.preventDefault();
      select(index);
    }
  }
</script>

<svelte:window
  onkeydown={(e) => {
    if (e.key == 'Escape') back();
    // Arrow keys turn the page, unless the user is typing somewhere
    const typing =
      e.target instanceof Element && e.target.closest('input, textarea, select, [contenteditable]');
    if (typing) return;
    if (e.key == 'ArrowLeft') turnPage(-1);
    if (e.key == 'ArrowRight') turnPage(1);
  }}
/>

<div
  bind:this={pager}
  class="channel-pager {measured ? '' : 'unmeasured'}"
  style="--cols: {cols}; --rows: {rows};"
>
  <!-- An invisible cube used to measure how many fit on the screen -->
  <div bind:this={probe} class="channel-grid layout-probe" aria-hidden="true">
    <div class="channel-container"><div class="channel-box"></div></div>
  </div>

  <!-- Hovering this side of the screen reveals its arrow -->
  <div class="page-edge page-edge-left">
    <button
      bind:this={leftArrow}
      class="page-arrow"
      aria-label="Previous channels page"
      onclick={() => turnPage(-1)}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 4 7 12l8 8" /></svg>
    </button>
  </div>

  <div class="channel-pages">
    {#key page}
      {@const pageSlots = channelPages[page] ?? []}
      <section
        class="channel-grid"
        aria-label="Channels, page {page + 1} of {channelPages.length}"
        in:fly={{ x: `${direction * 100}%`, opacity: 1, duration: slideMs, easing: cubicInOut }}
        out:fly={{ x: `${-direction * 100}%`, opacity: 1, duration: slideMs, easing: cubicInOut }}
      >
        {#each pageSlots as channel, slot (slot)}
          {@const index = page * pageSize + slot}
          {#if isChannel(channel)}
            <div
              bind:this={channelTiles[index]}
              class="channel-container"
              role="button"
              tabindex="0"
              aria-label="{channel.channelName} channel"
              onclick={() => select(index)}
              onkeydown={(e) => onKeydown(e, index)}
              onmouseenter={() => playSfx('channel-hover-audio')}
            >
              <div
                bind:this={channelBoxes[index]}
                class={focusedChannel == index ? 'big-channel-container' : 'channel-box'}
              >
                <ChannelCube
                  cubeColor={channel.cubeColor}
                  cubeColorHover={channel.cubeHoverColor}
                  frontHasBackground={channel.frontHasBackground}
                  focusedOn={focusedChannel == index}
                  gifImagePath={channel.gifImage}
                  frontImagePath={channel.coverImage}
                  description={channel.channelName}
                ></ChannelCube>
              </div>
            </div>
          {:else}
            <!-- Empty slot, like an unused Wii channel -->
            <div class="channel-container empty-slot" aria-hidden="true">
              <div class="channel-box glass"></div>
            </div>
          {/if}
        {/each}
      </section>
    {/key}
  </div>

  <!-- Hovering this side of the screen reveals its arrow -->
  <div class="page-edge page-edge-right">
    <button class="page-arrow" aria-label="Next channels page" onclick={() => turnPage(1)}>
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 4l8 8-8 8" /></svg>
    </button>
  </div>
</div>

<!-- Music players live outside the pages so they keep loading while pages change -->
{#each channels as channel, index (index)}
  {#if isChannel(channel)}
    {#if isYoutubeUrl(channel.musicClip)}
      <YoutubeAudio
        url={channel.musicClip}
        title="{channel.channelName} music"
        volume={channel.volumeLevel}
        onready={(player) => (songElements[index] = player)}
      ></YoutubeAudio>
    {:else if channel.musicClip != ''}
      <audio bind:this={songElements[index]} src={channel.musicClip} preload="none"></audio>
    {/if}
  {/if}
{/each}

{#if selected}
  <!-- Blurs the rest of the page behind the selected channel -->
  <div class="focus-backdrop" aria-hidden="true" onclick={back}></div>

  <div class="channel-bar" role="dialog" aria-label="{selected.channelName} channel">
    <h2>Continue to {selected.channelName} Channel?</h2>
    <button onclick={back} class="menu-button channel-buttons future-button">Back</button>
    <button
      bind:this={continueButton}
      onclick={enter}
      class="play-button channel-buttons future-button"
    >
      Continue
    </button>
  </div>
{/if}

<style lang="scss">
  @use 'channel';
</style>
