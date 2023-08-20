<script lang="ts">
  import {fade} from 'svelte/transition'
  import Channels from './channels.svelte';
  import Menubar from './menubar.svelte';

</script>

<div id="mainDiv">

  <head>
    <meta name="viewport" content="width=1024">
  </head>

  <Channels></Channels>
  
  <Menubar></Menubar>


  <audio src="/Audio/hoverchannel.wav" id="channel-hover-audio"></audio>

  <!-- https://github.com/danintosh/Wii-Menu-HTML/blob/main/bgm2.wav -->
  <!-- https://archive.org/details/all-wii-sounds/Click.wav -->
  <audio src="/Audio/bgm.wav" autoplay loop></audio>

  <audio src="/Audio/hover.wav" id="channel-click-audio"></audio>

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
