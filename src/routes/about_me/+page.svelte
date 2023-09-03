<script lang="ts">
  import Me from "./me.svelte";
  import Hobbies from "./hobbies.svelte";
  import Menu from "../menu.svelte";
  import { musicController } from "../../globals";
</script>

<span id="main-div">
  <Menu email="" />
  <Me />

  <Hobbies />

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
