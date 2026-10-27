<!-- TODO: Make the center text formated more appropeatly -->
<!-- TODO: Make left button themes, right ? -->
<!-- TODO: Instead of auto play make a button to play the music -->

<script lang="ts">
  import { onMount } from 'svelte';
  import { clickedOff } from '../../globals';

  import MusicOptions from './musicOptions.svelte';
  import ContactInfo from './contactInfo.svelte';
  import Cube from './cube.svelte';

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const dayToName = (d: number) => days[d];

  let time = $state(new Date());
  let hour = $derived(time.getHours());
  let min = $derived(time.getMinutes());
  let dayOrNight = $derived(hour >= 12 ? 'PM' : 'AM');
  let displayHour = $derived(hour % 12 || 12);
  let date = $derived(time.getDate());
  let month = $derived(time.getMonth() + 1); // Month is 0 indexed so January is 0
  let day = $derived(dayToName(time.getDay()));

  onMount(() => {
    const interval = setInterval(() => {
      time = new Date();
    }, 1000);

    const onClick = (event: MouseEvent): void => {
      if (clickedOff('contact', event) && clickedOff('right-bar-button', event)) {
        contact_info = false;
      }
      if (clickedOff('left-bar-button', event) && clickedOff('music-options', event)) {
        music_options = false;
      }
    };
    document.addEventListener('click', onClick);

    return () => {
      clearInterval(interval);
      document.removeEventListener('click', onClick);
    };
  });

  let music_options = $state(false);
  let contact_info = $state(false);
</script>

<div id="menu-bar">
  <div>
    <h4 class="text bar-label" id="left-bar-label">| Audio |</h4>
    <button
      id="left-bar-button"
      class="bar-button"
      onclick={(e) => {
        music_options = !music_options;
      }}
    >
      <Cube cubeImage="musical-note.png"></Cube>
    </button>
  </div>

  <div id="center-text">
    <div id="top-text">
      <h3 id="name" class="text">Ezequiel Valencia</h3>

      <p class="text description">
        University of Connecticut Cybersecurity graduate, Bio-Informatics innovator,
      </p>
      <p class="text description">Dev-Ops specialist, and Full-Stack developer</p>
    </div>

    <div id="bar-div">
      <p style="text-align: center;" id="clock">
        {displayHour}:{min > 9 ? min : '0' + min}
        {dayOrNight} | {day}
        {date}/{month}
      </p>
    </div>
  </div>

  <div>
    <h4 class="text bar-label" id="right-bar-label">| Contact |</h4>
    <button
      id="right-bar-button"
      class="bar-button"
      onclick={(e) => {
        contact_info = !contact_info;
      }}
    >
      <Cube cubeImage="mail.png"></Cube>
    </button>
  </div>
</div>

{#if music_options}
  <MusicOptions></MusicOptions>
{/if}

{#if contact_info}
  <ContactInfo></ContactInfo>
{/if}

<style lang="scss">
  $channel-view-height: 80vh;
  $button-horizontal-offset: 2%;
  @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300&display=swap');

  @font-face {
    src: url('/terminal-font.ttf');
    font-family: 'Terminal Font';
  }

  .bar-button {
    position: absolute;
    border-radius: 50%;
    height: 50%;
    width: 10%;
    z-index: 1;
    bottom: 20%;
    max-width: 150px;
    background: transparent;
    border: none !important;
    cursor:
      url('/Cursors/wii-open2.png') 17 1,
      pointer;
  }

  .text {
    text-align: center;
    // font-family:'Times New Roman', Times, serif;
  }

  .bar-label {
    position: absolute;
    bottom: 80%;
    font-size: 1.8vmin;
  }

  #left-bar-label {
    left: 3%;
  }

  #right-bar-label {
    right: 3%;
  }

  #center-text {
    text-align: center;
  }

  #name {
    font-size: 2.5vmin;
    transform: translateY(-100%);
  }

  .description {
    font-size: 1.8vmin;
    transform: translateY(-200%);
  }

  #top-text {
    text-align: center;
    top: 75vh;
    height: fit-content;
    line-height: 1;
  }

  #clock {
    font-size: 2.5vmin;
    text-align: center;
    font-family: 'IBM Plex Mono', monospace;
  }

  #bar-div {
    position: fixed;
    text-align: center;
    width: fit-content;
    bottom: 0%;
    left: 50%;
    transform: translateX(-50%);
  }

  #left-bar-button {
    left: $button-horizontal-offset;
  }

  #right-bar-button {
    right: $button-horizontal-offset;
  }

  #menu-bar {
    position: fixed;
    height: 100vh - $channel-view-height;
    width: 100vw;
    bottom: 0%;
    display: flex;
    justify-content: center;
    align-content: center;
    // overflow: hidden;
    text-align: center;
  }

  // Phones: the bar sits below the channels in the page flow instead of being pinned over them
  @media (max-width: 600px) {
    #menu-bar {
      position: relative;
      height: auto;
      display: grid;
      grid-template-columns: 22vw 1fr 22vw;
      align-items: center;
      padding: 16px 16px 24px;
    }

    .bar-label {
      position: static;
      font-size: 12px;
      margin-bottom: 4px;
    }

    .bar-button {
      position: static;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 20vw;
      max-width: none;
    }

    #name {
      font-size: 18px;
      transform: none;
      margin-bottom: 6px;
    }

    .description {
      font-size: 12px;
      line-height: 1.3;
      transform: none;
    }

    #bar-div {
      position: static;
      transform: none;
      margin: 8px auto 0;
    }

    #clock {
      font-size: 14px;
    }
  }
</style>
