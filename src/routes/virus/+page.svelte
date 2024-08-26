<script lang="ts">
  import Menu from "../menu.svelte";
  import { musicController } from "../../myLocalStorage";
</script>

<span id="main-div">
  <Menu email="general@relaxed.slmail.me" songName="Samurai Champloo Aruarian Dance"/>

  <div>
    <h1>Davids Lovely Delight ;)</h1>
    
    <a href="/virus/FreeFrameRate.zip">Download Me</a>
  </div>

  {#if $musicController}
    <audio src="/Audio/Channel-Songs/Samurai Champloo Aruarian Dance.mp3" autoplay loop></audio>
  {/if}

</span>

<!-- https://www.youtube.com/watch?v=vJNVramny9k -->
<!-- Squircle is a lot easier so that for now -->

<style lang="scss">
  #main-div {
    // overflow:visible;
    position: absolute;
    left: 0%;
    top: 0%;
    height: 100%;
    width: 100%;
  }
</style>
