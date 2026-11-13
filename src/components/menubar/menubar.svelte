<script lang="ts">
  import { onMount } from 'svelte';
  import { clickedOff } from '../../globals';

  import MusicOptions from './musicOptions.svelte';
  import ContactInfo from './contactInfo.svelte';
  import Cube from './cube.svelte';

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const pad = (n: number) => String(n).padStart(2, '0');

  let time = $state(new Date());
  let clock = $derived.by(() => {
    const hour = time.getHours();
    const amPm = hour >= 12 ? 'PM' : 'AM';
    // Month is 0 indexed so January is 0
    const date = `${time.getDate()}/${time.getMonth() + 1}`;
    return `${hour % 12 || 12}:${pad(time.getMinutes())} ${amPm} | ${days[time.getDay()]} ${date}`;
  });

  let musicOptions = $state(false);
  let contactInfo = $state(false);

  onMount(() => {
    const interval = setInterval(() => {
      time = new Date();
    }, 1000);

    const onClick = (event: MouseEvent): void => {
      if (clickedOff('contact', event) && clickedOff('right-bar-button', event)) {
        contactInfo = false;
      }
      if (clickedOff('left-bar-button', event) && clickedOff('music-options', event)) {
        musicOptions = false;
      }
    };
    document.addEventListener('click', onClick);

    return () => {
      clearInterval(interval);
      document.removeEventListener('click', onClick);
    };
  });
</script>

<svelte:window
  onkeydown={(e) => {
    if (e.key == 'Escape') {
      musicOptions = false;
      contactInfo = false;
    }
  }}
/>

<footer id="menu-bar">
  <div>
    <span class="text bar-label" id="left-bar-label" aria-hidden="true">| Audio |</span>
    <button
      id="left-bar-button"
      class="bar-button"
      aria-label="Audio options"
      aria-expanded={musicOptions}
      onclick={() => {
        musicOptions = !musicOptions;
        contactInfo = false;
      }}
    >
      <Cube cubeImage="musical-note.png"></Cube>
    </button>
  </div>

  <div id="center-text">
    <div id="top-text">
      <h1 id="name" class="text">Ezequiel Valencia</h1>

      <p class="text description">
        University of Connecticut Cybersecurity graduate, Bio-Informatics innovator,
        <br />
        Dev-Ops specialist, and Full-Stack developer
      </p>
    </div>

    <div id="bar-div">
      <time id="clock" datetime={time.toISOString()}>{clock}</time>
    </div>
  </div>

  <div>
    <span class="text bar-label" id="right-bar-label" aria-hidden="true">| Contact |</span>
    <button
      id="right-bar-button"
      class="bar-button"
      aria-label="Contact info"
      aria-expanded={contactInfo}
      onclick={() => {
        contactInfo = !contactInfo;
        musicOptions = false;
      }}
    >
      <Cube cubeImage="mail.png"></Cube>
    </button>
  </div>
</footer>

{#if musicOptions}
  <MusicOptions></MusicOptions>
{/if}

{#if contactInfo}
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
  }

  .bar-button:focus-visible {
    outline: 3px solid rgb(52, 190, 237);
    outline-offset: 4px;
  }

  .bar-label {
    position: absolute;
    bottom: 80%;
    margin: 1.33em 0;
    font-size: 1.8vmin;
    font-weight: bold;
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
    margin: 1em 0;
    transform: translateY(-100%);
  }

  .description {
    font-size: 1.8vmin;
    line-height: 2;
    margin: 0;
    transform: translateY(-2.4em);
  }

  #top-text {
    text-align: center;
    top: 75vh;
    height: fit-content;
    line-height: 1;
  }

  #clock {
    display: block;
    margin: 1em 0;
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
    // Sits behind the channels so a selected channel and its backdrop cover it
    z-index: -20;
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
      display: block;
      margin-top: 0;
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
      line-height: 1.5;
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
