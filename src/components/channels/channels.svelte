<!-- TODO: Add work experience, school education, personal code projects, art projects, and other cool websites -->
<!-- TODO: Make cursor be appropiate when hover buttons -->

<script lang="ts">
  import { onMount, tick } from 'svelte';
  import { musicController, musicTime, sfxController } from '../../common/myLocalStorage';
  import { channels } from './channelObject.js';
  import { ChannelFunctions, type MusicClip } from './channelFunctions';
  import ChannelCube from './channel-cube.svelte';
  import YoutubeAudio from '../../common/youtube-audio.svelte';
  import { isYoutubeUrl } from '../../common/youtube';

  let bgMusic: HTMLAudioElement;
  // YouTube clips fill in their place once their player is ready
  let songElements: MusicClip[] = [];
  let hoverAudio: HTMLAudioElement;
  let clickAudio: HTMLAudioElement;
  let focusedChannel = $state(-1);
  let windowWidth = $state(1000);

  onMount(() => {
    let video = document.querySelector('video');
    if (video != null) {
      video.playbackRate = 0.5;
    }
    for (let i = 0; i < channels.length; i++) {
      if (isYoutubeUrl(channels[i].musicClip)) continue;
      songElements[i] = document.getElementById('music-clip-' + i) as HTMLAudioElement;
    }
    getAudioElements();
    windowWidth = window.innerWidth;

    if (bgMusic) bgMusic.play();

    const onResize = () => {
      windowWidth = window.innerWidth;
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  });

  function focus(index: number, zIndex: string) {
    let node = document.getElementById('channelBox-' + index);
    node ? (node.style.zIndex = zIndex) : null;
    let menuNode = document.getElementById('menu-bar') as HTMLElement;
    menuNode.style.zIndex = '-20';
  }

  function getAudioElements() {
    bgMusic = document.getElementById('bgm') as HTMLAudioElement;
    hoverAudio = document.getElementById('channel-hover-audio') as HTMLAudioElement;
    clickAudio = document.getElementById('channel-click-audio') as HTMLAudioElement;
  }

  async function moveChannelToCenter(channelIndex: number) {
    // Measure once the box has switched to its fixed position, which ignores how far the page is scrolled
    await tick();
    let box = document.getElementById('channelBox-' + channelIndex) as HTMLElement;
    const boxRect = box.getBoundingClientRect();

    // Get viewport center
    const centerX = window.innerWidth / 2 + boxRect.width / 4;
    const centerY = window.innerHeight / 2 + boxRect.height / 4;

    // Get the current center of the div
    const boxCenterX = boxRect.left + boxRect.width;
    const boxCenterY = boxRect.top + boxRect.height;

    // Calculate distance to center
    const deltaX = centerX - boxCenterX;
    const deltaY = centerY - boxCenterY;

    // Apply translation
    box.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
  }

  function resetChannelPosition(channelIndex: number) {
    let box = document.getElementById('channelBox-' + channelIndex) as HTMLElement;
    box.style.transform = ``;
  }

  musicTime.reset();

  const channelFunctions = new ChannelFunctions();

  // https://www.w3schools.com/howto/howto_css_zoom_hover.asp
  // https://svelte.dev/repl/2cf17ac3b4ea47a0ade11361c242e068?version=3.29.4
</script>

<section id="grid-container">
  {#each channels as currentChannel, index (index)}
    <!-- Focus blur background -->

    <div
      onmousedown={(e) => {
        // Audio Play on Channel Click
        if (
          !currentChannel.focused &&
          $musicController &&
          currentChannel.redirect != '' &&
          focusedChannel != index
        ) {
          getAudioElements();
          channelFunctions.playMusic(index, bgMusic, songElements[index], false);
        }
        if (currentChannel.redirect != '' && focusedChannel != index) {
          focusedChannel = index;
          moveChannelToCenter(index);
        }
      }}
      onmouseenter={(e) => {
        if ($sfxController) {
          getAudioElements();
          hoverAudio.play();
        }
      }}
      role="tab"
      aria-controls="tabpanel-{index}"
      tabindex={index}
      class="channel-container"
    >
      <!-- Image Div -->
      {#if currentChannel.redirect != ''}
        <div
          class={focusedChannel == index ? 'big-channel-container' : 'channel-box'}
          id="channelBox-{index}"
          onanimationstart={(e) => focus(index, '50')}
          onanimationend={(e) => focus(index, '1')}
        >
          <ChannelCube
            cubeColor={currentChannel.cubeColor}
            cubeColorHover={currentChannel.cubeHoverColor}
            frontHasBackground={currentChannel.frontHasBackground}
            id={index}
            focusedOn={focusedChannel == index}
            gifImagePath={currentChannel.gifImage}
            frontImagePath={currentChannel.coverImage}
            description={currentChannel.channelName}
          ></ChannelCube>
        </div>
      {:else if windowWidth > 600}
        <div class="channel-box glass" id="channelBox-{index}"></div>
      {/if}

      <!-- Button Section -->

      {#if focusedChannel == index}
        <div class="channel-bar">
          <h2>Continue to {currentChannel.channelName} Channel?</h2>
          <button
            onclick={(e) => {
              focusedChannel = -1;
              resetChannelPosition(index);
              if ($sfxController) {
                clickAudio.play();
              }
              if ($musicController) {
                channelFunctions.playMusic(index, bgMusic, songElements[index], true);
              }
            }}
            class="menu-button channel-buttons future-button"
            id="mbutton-{index}"
          >
            Back
          </button>

          <button
            onclick={(e) => {
              if ($sfxController) {
                clickAudio.play();
              }
              if ($musicController) {
                channelFunctions.stopMusic(songElements[index]);
              }
              channelFunctions.redirect(index);
            }}
            class="play-button channel-buttons future-button"
            id="pbutton-{index}"
          >
            Continue
          </button>
        </div>
      {/if}
    </div>

    <!-- Blurred background when a channel is selected -->
    {#if focusedChannel != -1}
      <div
        style="height: 100vh; width:100vw; 
      position:fixed; background-color: rgba(255, 255, 255, 0.111);
      backdrop-filter: blur(2px); top:0;left:0;"
      ></div>
    {/if}

    {#if isYoutubeUrl(currentChannel.musicClip)}
      <YoutubeAudio
        url={currentChannel.musicClip}
        title="{currentChannel.channelName} music"
        volume={currentChannel.volumeLevel}
        onready={(player) => (songElements[index] = player)}
      ></YoutubeAudio>
    {:else}
      <audio src={currentChannel.musicClip} id="music-clip-{index}"></audio>
    {/if}
  {/each}
</section>

<style lang="scss">
  @use 'channel';
</style>
