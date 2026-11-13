<script lang="ts">
  import { tick } from 'svelte';
  import { musicController, musicTime, sfxController } from '../../common/myLocalStorage';
  import { channels } from './channelObject';
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
  let selected = $derived(focusedChannel == -1 ? undefined : channels[focusedChannel]);

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
    if (channels[index].redirect == '' || focusedChannel == index) return;
    if ($musicController) playChannelMusic(channels[index], pageAudio('bgm'), songElements[index]);
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
    channelTiles[index].focus();
  }

  function enter() {
    playSfx('channel-click-audio');
    if ($musicController) stopMusic(songElements[focusedChannel]);
    openChannel(channels[focusedChannel]);
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
  }}
/>

<section id="grid-container" aria-label="Channels">
  {#each channels as channel, index (index)}
    {#if channel.redirect != ''}
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
    {:else}
      <!-- Empty slot, like an unused Wii channel -->
      <div class="channel-container empty-slot" aria-hidden="true">
        <div class="channel-box glass"></div>
      </div>
    {/if}
  {/each}
</section>

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
