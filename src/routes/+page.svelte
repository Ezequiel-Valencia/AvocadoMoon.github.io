<script lang="ts">
  import Channels from '../components/channels/channels.svelte';
  import Menubar from '../components/menubar/menubar.svelte';
  import { musicController, sfxController, hasVisited } from "../common/myLocalStorage";
  import { onMount } from 'svelte';
  import FirstVisit from './first-visit.svelte';
  import BlocksAnimated from '../components/decals/blocks-animated.svelte';

  let hoverAudio: HTMLAudioElement;
  let bgmAudio: HTMLAudioElement;

  onMount(() => {
    if (hoverAudio) hoverAudio.volume = 0.1;
    if (bgmAudio) bgmAudio.volume = 0.2;
  });
</script>

<div id="mainDiv">
  {#if $sfxController}
    <audio bind:this={hoverAudio} src="/Audio/hoverchannel.wav" id="channel-hover-audio"></audio>
    <audio src="/Audio/hover.wav" id="channel-click-audio"></audio>
  {/if}

  {#if $musicController}
    <audio bind:this={bgmAudio} src="/Audio/bgm.wav" id="bgm" autoplay loop></audio>
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
    cursor: url("/Cursors/Wii-Curso-plain.png"), pointer;
    // cursor: url("/Cursors/Wii-Curso-plain.png") pointer;

    // covers whole screen
    top:0px;
    left:0px;
  }
  
</style>
