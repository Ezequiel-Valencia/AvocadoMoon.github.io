<script lang="ts">
  import Channels from './_channels/channels.svelte';
  import Menubar from './_menubar/menubar.svelte';
  import { musicController, sfxController, hasVisited } from "../common/myLocalStorage";
  import { onMount } from 'svelte';
  import { clickedOff } from '../globals'
  import FirstVisit from './first-visit.svelte';
  import BlocksAnimated from './_decals/blocks-animated.svelte';
  import Particles from './_decals/particles.svelte';

</script>

<div id="mainDiv">
  {#if $sfxController}
    <audio src="/Audio/hoverchannel.wav" id="channel-hover-audio"></audio>
    <script lang="ts">
      var audio = document.getElementById("channel-hover-audio");
      audio.volume = 0.1;
    </script>
    <audio src="/Audio/hover.wav" id="channel-click-audio"></audio>
  {/if}
  


  {#if $musicController}
    <audio src="/Audio/bgm.wav" id="bgm" autoplay loop></audio>
    <script lang="ts">
      var audio = document.getElementById("bgm");
      audio.volume = 0.2;
    </script>
  {/if}

  <Channels></Channels>
  
  <Menubar></Menubar>

  <BlocksAnimated></BlocksAnimated>
  <!-- <Particles></Particles> -->

  {#if !$hasVisited}
    <FirstVisit></FirstVisit>
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
    background-color: rgb(245, 245, 245);
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
