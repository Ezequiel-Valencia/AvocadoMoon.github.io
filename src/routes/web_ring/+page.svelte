<script lang="ts">
  import Menu from '../../common/menu.svelte';
  import Websites from './websites.svelte';
</script>

<svelte:head>
  <title>Web Ring</title>
</svelte:head>

<div id="main-div">
  <Menu
    songVolumeLevel=".3"
    songPath="https://files.catbox.moe/lgaw6k.mp3"
    songName="Anodyne 2 - Center City Cenote"
  ></Menu>
  <header class="hero">
    <img id="anim" src="/web_ring/zekeanimsmall.gif" alt="Animated web ring banner" />

    <div class="title-row">
      <img class="title-gif" src="/web_ring/www.gif" alt="" />
      <h1>Portal for Interesting Websites</h1>
      <img class="title-gif" src="/web_ring/computer_surfing.gif" alt="" />
    </div>
  </header>

  <Websites></Websites>
</div>

<style lang="scss">
  #main-div {
    top: 0;
    left: 0;
    position: absolute;
    min-height: 100vh;
    width: 100%;
    overflow-x: hidden;
    background-image: url('/web_ring/starsbg.gif');
  }

  .hero {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0 16px;
    text-align: center;
  }

  #anim {
    margin: 10vh auto 6vh;
    width: min(50vmin, 900px);
    height: auto;
    max-width: 100%;
    border: 5px groove goldenrod;
  }

  .title-row {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 1rem;
  }

  .title-gif {
    height: 10vh;
    max-height: 100px;
  }

  h1 {
    margin: 0;
    color: white;
    font-size: clamp(1.5rem, 5vmin, 3rem);
    font-weight: bold;
  }
</style>
