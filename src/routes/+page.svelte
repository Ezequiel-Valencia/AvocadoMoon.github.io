<script lang="ts">
  import {fade} from 'svelte/transition'
  import Channels from './channels.svelte';
  import Menubar from './menubar.svelte';
  import { musicController, sfxController } from "../myLocalStorage";

</script>

<div id="mainDiv">

  <Channels></Channels>
  
  <Menubar></Menubar>


  {#if $sfxController}
    <audio src="/Audio/hoverchannel.wav" id="channel-hover-audio"></audio>
    <audio src="/Audio/hover.wav" id="channel-click-audio"></audio>
  {/if}
  

  

  {#if $musicController}
    <audio src="/Audio/bgm.wav" id="bgm" autoplay loop></audio>
  {/if}

  

</div>

<style lang="scss">
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
