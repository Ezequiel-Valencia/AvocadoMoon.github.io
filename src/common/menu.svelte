<script lang="ts">
  import { Hr } from 'flowbite-svelte';
  import { musicController } from './myLocalStorage';
  import { onMount } from 'svelte';
  import {
    isYoutubeUrl,
    loadYoutubeApi,
    youtubeEmbedUrl,
    PlayerState,
    type YouTubePlayer,
  } from './youtube';

  let display_entire_menu = $state(false);
  interface Props {
    songName: string;
    // An audio file, or any YouTube watch, youtu.be, embed, or live URL
    songPath?: string;
    songVolumeLevel?: string;
  }

  let { songName, songPath = '', songVolumeLevel = '1' }: Props = $props();

  let isYoutube = $derived(isYoutubeUrl(songPath));

  let paused = $state(true);
  let audioLength: any = $state();
  let currentAudioTime: any = $state();

  let audio: HTMLAudioElement | undefined = $state();
  let youtubeFrame: HTMLIFrameElement | undefined = $state();
  let youtubePlayer: YouTubePlayer | undefined;

  onMount(() => {
    if (!isYoutube) {
      if (!audio) return;
      audio.volume = Number(songVolumeLevel);
      paused = !$musicController;
      if (paused) {
        audio.pause();
      }
      return;
    }

    // The <audio> tag keeps these in sync through its bindings; YouTube has to be asked
    const poll = setInterval(() => {
      if (!youtubePlayer?.getCurrentTime) return;
      currentAudioTime = youtubePlayer.getCurrentTime();
      audioLength = youtubePlayer.getDuration();
    }, 500);

    loadYoutubeApi().then((YT) => {
      if (!youtubeFrame) return;
      youtubePlayer = new YT.Player(youtubeFrame, {
        events: {
          onReady: () => {
            youtubePlayer?.setVolume(Number(songVolumeLevel) * 100);
            if ($musicController) youtubePlayer?.playVideo();
          },
          onStateChange: ({ data }) => {
            // Buffering and cueing leave the button as it was
            if (data === PlayerState.PLAYING) paused = false;
            if (data === PlayerState.PAUSED) paused = true;
            if (data === PlayerState.ENDED) {
              youtubePlayer?.seekTo(0, true);
              youtubePlayer?.playVideo();
            }
          },
        },
      });
    });

    return () => {
      clearInterval(poll);
      youtubePlayer?.destroy();
      youtubePlayer = undefined;
    };
  });

  function setPaused(value: boolean) {
    paused = value;
    if (value) youtubePlayer?.pauseVideo();
    else youtubePlayer?.playVideo();
  }

  function seek(time: number) {
    currentAudioTime = time;
    youtubePlayer?.seekTo(time, true);
  }

  function formatAudioTime(time: number) {
    let mins = Math.floor(time / 60);
    let secs: any = Math.floor(time % 60);
    if (secs < 10) {
      secs = '0' + secs;
    }
    if (Number.isNaN(mins)) {
      return '0:00';
    }
    return mins + ':' + secs;
  }
</script>

{#if isYoutube}
  <!-- Kept on the page but out of sight, so only its audio comes through -->
  <iframe
    bind:this={youtubeFrame}
    id="bg-song-youtube"
    src={youtubeEmbedUrl(songPath)}
    title={songName}
    referrerpolicy="strict-origin-when-cross-origin"
    allow="autoplay; encrypted-media"
    tabindex="-1"
    aria-hidden="true"
  ></iframe>
{:else}
  <audio
    bind:this={audio}
    id="bg-song"
    src={songPath}
    autoplay={$musicController}
    loop
    bind:paused
    bind:duration={audioLength}
    bind:currentTime={currentAudioTime}
  ></audio>
{/if}

<!-- ############ When the menu is not open ################## -->

{#if !display_entire_menu}
  <div>
    <nav>
      <button
        id="menu-nav"
        onclick={(e) => {
          display_entire_menu = !display_entire_menu;
          // scroll = false;
        }}>Menu</button
      >
    </nav>
  </div>
{/if}

<!-- #################### Menu is Open ########################### -->

{#if display_entire_menu}
  <div id="home-menu-nav">
    <span
      class="box"
      id="music-player"
      style="width:fit-content; text-align: center; margin-left:auto; margin-right:auto; height:fit-content;"
    >
      <!-- Song Name -->
      <h1 style="color: white; text-align:center; padding:5%; padding-bottom:0%;">Music:</h1>
      <div class="marquee">
        <h5>{songName}</h5>
      </div>

      <div id="music-nav">
        <!-- Play/Pause Button -->
        {#if paused != true}
          <span
            id="play-button"
            class="music-buttons"
            onclick={(e) => {
              setPaused(true);
            }}
            onkeydown={(e) => {}}
            role="button"
            tabindex="0"
          >
            <i style="font-size: x-large;" class="fas fa-pause music-buttons"></i>
          </span>
        {:else}
          <span
            id="play-button"
            class="music-buttons"
            onclick={(e) => {
              setPaused(false);
            }}
            onkeydown={(e) => {}}
            role="button"
            tabindex="0"
          >
            <i style="font-size: x-large;" class="fas fa-play music-buttons"></i>
          </span>
        {/if}

        <!-- Seeker -->
        <span id="seeking" style="">
          <span>
            <input
              id="seeker"
              type="range"
              min="1"
              max={audioLength}
              value={currentAudioTime}
              oninput={(e) => {
                seek(Number(e.currentTarget.value));
              }}
            />
          </span>
          <span class="text" style="padding-left: 1vw;"
            >{formatAudioTime(currentAudioTime)}/{formatAudioTime(audioLength)}</span
          >
        </span>
      </div>

      <Hr class="my-8" />
    </span>

    <div style="text-align:center;" id="big-button-div">
      <button
        onclick={(e) => {
          location.href = '/';
        }}>Main Menu</button
      >
      <button
        onclick={(e) => {
          display_entire_menu = !display_entire_menu;
          //   scroll = true;
        }}>Return</button
      >
    </div>

    <span id="contact-me">
      <h1>Contact Me</h1>
      <p>
        Email: <a style="color: white;" href="mailto:ezq.valencia@gmail.com"
          >ezq.valencia@gmail.com</a
        >
        | Github: <a style="color: white;" href="https://github.com/AvocadoMoon">AvocadoMoon</a> |
        Linkedin:
        <a style="color: white;" href="https://www.linkedin.com/in/ezequielvalencia/"
          >Ezequiel Valencia</a
        >
        | Resume:
        <a
          style="color: white;"
          href="https://docs.google.com/document/d/e/2PACX-1vQXG6xgS-gXDlE0v03SPC5k56cUHKYMERYuDSOsqoyo8cLsFWslB_Rmr0B_Het3GDX4m7YfRlge-lbo/pub"
        >
          Personal Resume</a
        >
      </p>
    </span>
  </div>
{/if}

<style lang="scss">
  .text {
    color: white;
  }

  #bg-song-youtube {
    position: fixed;
    left: -10000px;
    width: 200px;
    height: 200px;
    opacity: 0;
    pointer-events: none;
    border: none;
  }

  .music-buttons {
    min-height: 1vh;
    min-width: 2vw;
  }

  .music-buttons:hover {
    cursor:
      url('/Cursors/wii-open2.png') 17 1,
      pointer;
  }

  /* width: 0 keeps the title out of the box's fit-content width; min-width fills it instead */
  .marquee {
    width: 0;
    min-width: 100%;
    overflow: hidden;
    white-space: nowrap;
  }

  /* The left padding starts the title just past the right edge, and the animation moves it
     until it has fully left on the left before starting again */
  .marquee h5 {
    display: inline-block;
    padding-left: 100%;
    animation: marquee 12s linear infinite;
  }

  .marquee:hover h5 {
    animation-play-state: paused;
  }

  @keyframes marquee {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(-100%);
    }
  }

  .box {
    border-radius: 5%;
    overflow: auto;
    color: white;
  }

  #home-menu-nav {
    display: grid;
    bottom: 0;
    position: fixed;
    height: 100vh;
    width: 100vw;
    z-index: 999;
    background: rgba(0, 0, 0, 0.85);
    cursor:
      url('/Cursors/Wii-Curso-plain.png') 10 1,
      pointer;
  }

  #menu-nav {
    border: none;
    color: white;
    margin: 0;
    padding: 0;
    font-size: 3vmin;
    position: fixed;
    padding: 1vmin;
    top: 0;
    left: 50%;
    transform: translate(-50%);
    border-bottom-style: solid;
    border-width: 1px;
    border-color: white;
    z-index: 999;
    background-color: rgba(0, 0, 0, 0.164);
    max-width: 200px;
    max-height: 55px;
    width: 20vmin;
    height: auto;
    text-align: center;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
  }

  #menu-nav:hover {
    text-decoration: underline;
  }

  #big-button-div button {
    background: grey;
    border-radius: 40px;
    height: 10vh;
    width: 20vw;
    margin-left: 5%;
  }

  #big-button-div button:hover {
    cursor:
      url('/Cursors/wii-open2.png') 17 1,
      pointer;
  }

  #contact-me {
    position: relative;
    text-align: center;
    max-height: 20vh;
  }

  #contact-me h1 {
    padding-top: 2vh;
    bottom: 0;
    color: white;
  }

  #contact-me p {
    bottom: 0;
    color: white;
  }

  input[type='range'] {
    appearance: none;
    -webkit-appearance: none;
    background: transparent;
    cursor: pointer;
    width: 15rem;
  }

  input[type='range']::-webkit-slider-runnable-track {
    height: 0.4rem;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.35);
  }

  input[type='range']::-moz-range-track {
    height: 0.4rem;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.35);
  }

  input[type='range']::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    height: 1.1rem;
    width: 1.1rem;
    margin-top: -0.35rem; /* centers the thumb on the track in Chromium/WebKit */
    border: 0;
    border-radius: 50%;
    background: #1c64f2;
  }

  input[type='range']::-moz-range-thumb {
    height: 1.1rem;
    width: 1.1rem;
    border: 0;
    border-radius: 50%;
    background: #1c64f2;
  }

  @media (max-width: 500px) {
    #menu-nav {
      font-size: 5vmin;
      padding: 1vmin;
      width: 30vmin;
      height: auto;
    }
    #music-nav {
      padding-left: 8vw;
      padding-right: 8vw;
    }
  }
</style>
