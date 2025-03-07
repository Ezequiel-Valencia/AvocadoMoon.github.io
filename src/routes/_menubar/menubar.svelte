<!-- TODO: Make the center text formated more appropeatly -->
<!-- TODO: Make left button themes, right ? -->
<!-- TODO: Instead of auto play make a button to play the music -->

<script lang="ts">
  import { onMount } from "svelte";
  import { sfxController, musicController } from "../../common/myLocalStorage";
  import {clickedOff} from "../../globals";
  
  import MusicOptions from "./musicOptions.svelte";
  import ContactInfo from "./contactInfo.svelte";
  import Cube from "./cube.svelte";

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
  $: month = time.getMonth() + 1; // Month is 0 indexed so January is 0
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
  <div>
    <h4 class="text" style="position: absolute; left: 3%; bottom: 80%;font-size: 1.8vmin;">| Audio |</h4>
    <button
      id="left-bar-button"
      class="bar-button"
      on:click={(e) => {
        music_options = !music_options;
      }}
    >
      <Cube cubeImage="musical-note.png"></Cube>
    </button>
  </div>




  <div style="text-align: center;">
    <div id="top-text">
      <h3 style="font-size: 2.5vmin; transform:translateY(-100%);" class="text">Ezequiel Valencia</h3>

      <p style="font-size: 1.8vmin; transform:translateY(-200%)" id="description" class="text">
        University of Connecticut Cybersecurity graduate, Bio-Informatics innovator,
      </p>
      <p style="font-size: 1.8vmin; transform:translateY(-200%)" id="description" class="text">
         Dev-Ops specialist, and Full-Stack developer
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
    <h4 class="text" style="position: absolute; right: 3%; bottom: 80%;font-size: 1.8vmin;">| Contact |</h4>
    <button
    id="right-bar-button"
    class="bar-button"
    on:click={(e) => {
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
  $button-horizontal-offset: 2%;
  @import url("https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300&display=swap");

  @font-face{
    src: url("/terminal-font.ttf");
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
    cursor: url("/Cursors/wii-open2.png") ,pointer;
  }

  .text {
    text-align: center;
    // font-family:'Times New Roman', Times, serif;
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
</style>
