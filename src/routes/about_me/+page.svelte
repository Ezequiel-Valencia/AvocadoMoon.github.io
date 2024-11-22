<script lang="ts">
  import Me from "./me.svelte";
  import Hobbies from "./hobbies.svelte";
  import Menu from "../../common/menu.svelte";
</script>

<span id="main-div">
  <span id="background-gradient">

  </span>
  <Menu songPath="https://files.catbox.moe/ll8iaa.mp3" email="general@relaxed.slmail.me" songName="Samurai Champloo Aruarian Dance"/>
  <Me />
  <Hobbies />

</span>



<!-- https://www.youtube.com/watch?v=vJNVramny9k -->
<!-- Squircle is a lot easier so that for now -->

<style lang="scss">
  #main-div {
    position: absolute;
    left: 0%;
    top: 0%;
    
  }

  #background-gradient{
    position: absolute;
    z-index: -2;
    height: 100%;
    width: 100%;
    background-size: 300%;
    --gradient: linear-gradient(
       #339996, #329962, #12693b
    );
    background-image: var(--gradient);
  }
</style>
