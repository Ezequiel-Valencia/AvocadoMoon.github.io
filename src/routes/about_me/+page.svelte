<script lang="ts">
  import Me from "./me.svelte";
  import Hobbies from "./hobbies.svelte";
  import Menu from "../../common/menu.svelte";
</script>

<span id="main-div">
  <Menu songPath="https://files.catbox.moe/ll8iaa.mp3" email="general@relaxed.slmail.me" songName="Samurai Champloo Aruarian Dance"/>
  <Me />
  <Hobbies />

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
