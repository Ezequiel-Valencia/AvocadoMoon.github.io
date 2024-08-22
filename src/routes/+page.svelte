<script lang="ts">
  import {fade} from 'svelte/transition'
  import Channels from './channels.svelte';
  import Menubar from './menubar.svelte';
  import { musicController, sfxController, hasVisited } from "../myLocalStorage";
  import { onMount } from 'svelte';
  import { clickedOff } from '../globals'

  onMount(async () => {
    document.addEventListener("click", (event) : void => {
      if (clickedOff("allowAudio", event)) {
        hasVisited.hasVisited();
      }
    });
  })

</script>

<div id="mainDiv">

  <Channels></Channels>
  
  <Menubar></Menubar>



  {#if $sfxController}
    <audio src="/Audio/hoverchannel.wav" id="channel-hover-audio"></audio>
    <audio src="/Audio/hover.wav" id="channel-click-audio"></audio>
  {/if}
  

  {#if !$hasVisited}
    <div id="allowAudio" class="menu-popup">
      <h2 class="menu-large-text">Allow Audio</h2>
      <p class="menu-med-text" style="margin: 5%;">
        This website plays different background music and sound effects for each channel. 
        Do you want to allow this audio?
        <br> <br> <br> <br> <br>
      </p>
      {#if $musicController}
        <u><p>Even if audio is turned on, autoplay needs to enabled in the browser.</p></u>
      {/if}
      <button
        id="music"
        class="music-option-buttons menu-med-text"
        on:click={(e) => {
          sfxController.toggle_sfx();
          musicController.toggle_music();
        }}
      >
        Turn Audio {$musicController ? "Off" : "On"}
      </button>
      <br>
      <br>
      <button class="music-option-buttons menu-med-text" on:click={(e) => {hasVisited.hasVisited()}}>Close</button>
    </div>
  {/if}

  {#if $musicController}
    <audio src="/Audio/bgm.wav" id="bgm" autoplay loop></audio>
  {/if}

  

</div>

<style lang="scss">
  @use 'homeMenu';
  #mainDiv {
    height: 100vh;
    width: 100vw;
    // background: url('/Backgrounds/Waterfall.gif');
    background-repeat: no-repeat;
    background-size: cover;
    background-attachment: fixed;
    background-color: rgb(238, 236, 236);
    padding: 0%;
    position: fixed;
    // https://developer.mozilla.org/en-US/docs/Web/CSS/cursor
    cursor: url("/Cursors/Wii-Curso-plain.png"), auto;
    // cursor: url("/Cursors/Wii-Curso-plain.png") pointer;

    // covers whole screen
    top:0px;
    left:0px;
  }
  
</style>
