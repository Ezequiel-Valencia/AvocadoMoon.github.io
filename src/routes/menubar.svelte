<!-- TODO: Make the center text formated more appropeatly -->
<!-- TODO: Make left button themes, right ? -->
<!-- TODO: Instead of auto play make a button to play the music -->

<script lang="ts">
  import { onMount } from "svelte";
  import { sfxController, musicController } from "../common/myLocalStorage";
  import {clickedOff} from "../globals";

  function dayToName(d: any) {
    switch (d) {
      case 0:
        return "Sun";
      case 1:
        return "Mon";
      case 2:
        return "Tue";
      case 3:
        return "Wed";
      case 4:
        return "Thu";
      case 5:
        return "Fri";
      case 6:
        return "Sat";
    }
  }

  let time = new Date();
  $: hour = time.getHours();
  $: min = time.getMinutes();
  $: dayOrNight = "AM";
  $: date = time.getDate();
  $: month = time.getMonth();
  $: day = dayToName(time.getDay());

  onMount(async () => {
    const interval = setInterval(() => {
      time = new Date();
      dayOrNight = hour >= 12 ? "PM" : "AM";
    }, 1000);

    document.addEventListener("click", (event) : void => {
      if (clickedOff("contact", event) && clickedOff("right-bar-button", event)) {
        contact_info = false;
      }
      if (clickedOff("left-bar-button", event) && clickedOff("music-options", event)) {
        music_options = false;
      }
    });
  });

  let music_options = false;
  let contact_info = false;
</script>

<div id="menu-bar">
  <img id="menu-svg" src="wii bar final.png" alt="wii bar" />
  <div>
    <button
      id="left-bar-button"
      class="bar-button"
      on:click={(e) => {
        music_options = !music_options;
      }}
    >
      <img class="menu-icon" src="musical-note.png" alt="music" />
    </button>
  </div>




  <div style="text-align: center;">
    <div
      style="text-align: center;
  top: 75vh;"
      id="top-text"
    >
      <h3 style="font-size: 2.5vmin; transform:translateY(-100%);" class="text">Ezequiel Valencia</h3>

      <p style="font-size: 1.5vmin; transform:translateY(-200%)" id="description" class="text">
        Uconn CS graduate who also does creative work.
      </p>
    </div>

    <div style="text-align: center; width:fit-content; transform:translateX(-50%); left:50%;" id="bar-div">
      <p style="text-align: center;" id="clock">
        {hour > 12 ? hour - 12 : hour}:{min > 9 ? min : "0" + min}
        {dayOrNight} | {day}
        {date}/{month}
      </p>
    </div>
  </div>



  <div>
    <button
    id="right-bar-button"
    class="bar-button"
    on:click={(e) => {
      contact_info = !contact_info;
    }}
  >
    <img class="menu-icon" src="mail.png" alt="mail" />
  </button>
  </div>
  
</div>

{#if music_options}
  <div id="music-options" class="menu-popup">
    <h2 class="menu-large-text">Audio Options</h2>
    <p class="menu-med-text" style="margin: 5%;">
      If you can't hear this sites music here are some trouble
      shooting methods:
    </p>
    <ol class="menu-med-text" style="margin: 5%;">
      <li class="menu-med-text">Turn on and off the audio.</li>
      <li class="menu-med-text">Go to site settings in your browser, and enable autoplay.</li>
      <li class="menu-med-text">Unmute the tab</li>
    </ol>
    <button
      id="sfx"
      class="music-option-buttons menu-med-text"
      on:click={(e) => {
        sfxController.toggle_sfx();
      }}
    >
      SFX {$sfxController ? "On" : "Off"}
    </button>
    <button
      id="music"
      class="music-option-buttons menu-med-text"
      on:click={(e) => {
        musicController.toggle_music();
      }}
    >
      Music {$musicController ? "On" : "Off"}
    </button>
  </div>
{/if}

{#if contact_info}
  <div id="contact" class="menu-popup">
    <h2 class="menu-large-text">Contact Info</h2>

    <h4 class="menu-med-text">Email:</h4>
    <p class="menu-med-text">general@relaxed.slmail.me</p>

    <h4 class="menu-med-text">Linkedin:</h4>
    <a class="menu-med-text" href="https://www.linkedin.com/in/ezequielvalencia/">Ezequiel Valencia</a
    >

    <h4 class="menu-med-text">Github:</h4>
    <a class="menu-med-text" href="https://github.com/AvocadoMoon">AvocadoMoon</a>
  </div>
{/if}

<style lang="scss">
  $button-horizontal-offset: 2%;
  @use 'homeMenu';
  @import url("https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300&display=swap");

  .bar-button {
    position: absolute;
    border-radius: 50%;
    height: 50%;
    width: 10%;
    z-index: 2;
    bottom: 20%;
    text-align: center;
    max-width: 150px;
  }

  .bar-button:hover {
    cursor: url("/Cursors/Wii-Curso-plain.png") auto;
  }

  .text {
    text-align: center;
    // font-family:'Times New Roman', Times, serif;
  }

  .menu-icon {
    max-width: 50%;
    max-height: 50%;
  }

  .music-option-buttons {
    width: 15%;
    height: 15%;
    margin: auto;
    padding: 2%;
    transform: translateY(100%);
  }

  #clock {
    font-size: 2.5vmin;
    text-align: center;
    font-family: "IBM Plex Mono", monospace;
  }

  #bar-div {
    position: fixed;
    text-align: center;
    width: 30vw;
    bottom: 0%;
  }

  #left-bar-button {
    left: $button-horizontal-offset;
  }

  #right-bar-button {
    right: $button-horizontal-offset;
  }

  #menu-svg {
    position: fixed;
    height: 20vh;
    bottom: 0%;
    width: 100%;
  }

  #menu-bar {
    position: fixed;
    height: 100vh - $channel-view-height;
    width: 100vw;
    bottom: 100%;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-content: center;
    overflow: hidden;
    text-align: center;
    // background-color: white;
  }
</style>
