
<!-- TODO: Make the center text formated more appropeatly -->
<!-- TODO: Make left button themes, right ? -->
<!-- TODO: Instead of auto play make a button to play the music -->

<script lang="ts">
  import { onMount } from "svelte";
  import { sfxController, musicController } from "./globals";

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
  });

  let music_options = false;
  let contact_info = false;

</script>




<div id="menu-bar">
  <button id="left-bar-button" class="bar-button" on:click={(e) => {music_options = !music_options}}> 
    <img class="menu-icon" src="musical-note.png" alt="music"> 
  </button>

  <img id="menu-svg" src="wii bar final.png" alt="wii bar" />

  <button id="right-bar-button" class="bar-button" on:click={(e) => {contact_info = !contact_info}}> 
    <img class="menu-icon" src="mail.png" alt="mail"> 
  </button>

  <div id="top-text">
    <h3 id="name" class="text">Ezequiel Valencia</h3>

    <p id="description" class="text">
      Uconn CS graduate who also does creative work.
    </p>
  </div>

  <div id="bar-div">
    <p id="clock">
      {hour > 12 ? hour-12: hour}:{min > 9 ? min: "0"+min}
      {dayOrNight} | {day}
      {date}/{month}
    </p>
  </div>
</div>

{#if music_options}
  <div id="music-options" class="menu-popup">
      <h2>Audio Options</h2>
      <button id="sfx" class="music-option-buttons" on:click={(e) => {sfxController.toggle_sfx()}}>
        SFX {$sfxController ? "On" : "Off"}
      </button>
      <button id="music" class="music-option-buttons" on:click={(e) => {musicController.toggle_music()}}>
        Music {$musicController ? "On" : "Off"}
      </button>
  </div>
{/if}

{#if contact_info}
  <div id="contact" class="menu-popup">
    <h2>Contact Info</h2>
    <p>Each channel has its own email assosated with it for that 
      specific topic and can be found by pressing the menu button at the top of that channel, 
      but my general contact info is:
    </p>

    <h4>Email:</h4>
    <p>jfkd;la</p>

    <h4>Linkdin</h4>
    <a href="https://www.linkedin.com/in/ezequielvalencia/">Ezequiel Valencia</a>
    
  </div>
{/if}

<style lang="scss">
  $button-horizontal-offset: 2%;

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

  .menu-icon{
    max-width: 50%;
    max-height: 50%;
  }

  .menu-popup{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 50%;
    width: 50%;
    border-radius: 15px;
    z-index: 9999;
    background-color: gray;
    text-align: center;
  }

  .music-option-buttons{
    width: 15%;
    height: 15%;
    margin: auto;
    padding: 2%;
    transform: translateY(100%);
  }

  #top-text {
    position: fixed;
    text-align: center;
    top: 75vh;
    // left: 50%;
    width: 100%;
    // height: 50%;
  }

  #clock {
    font-size: 150%;
    font-family: "IBM Plex Mono", monospace;
  }

  #bar-div {
    position: fixed;
    text-align: center;
    width: 30vw;
    bottom: 0%;
  }

  #name {
    // position: absolute;

    font-size: xx-large;
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
