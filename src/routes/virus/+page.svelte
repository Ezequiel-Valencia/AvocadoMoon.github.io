<script lang="ts">
  import Menu from "../../common/menu.svelte";
  import { musicController } from "../../common/myLocalStorage";
</script>

<span id="main-div">
  <div style="background-color: white;">
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
    background-image: url("/virus/house.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }
</style>
