<script lang="ts">
  import Menu from '../../common/menu.svelte';
  import Zines from './zines.svelte';
</script>

<svelte:head>
  <title>Zines | Ezequiel Valencia</title>
</svelte:head>

<div id="bg">
  <Menu
    songVolumeLevel=".2"
    songPath="https://files.catbox.moe/0x0xh8.mp3"
    songName="Sonic Unleashed Windmill Isle Night Acid Jazz"
  ></Menu>

  <div id="main-div">
    <div id="gold-border">
      <h1 id="zine-intro">My Zines</h1>
    </div>
    <Zines></Zines>
  </div>
</div>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@1,500&display=swap');
  #main-div {
    position: absolute;
    left: 0%;
    top: 0%;
    min-height: 100%;
    height: auto;
    width: 100%;
    overflow-y: auto;
    backdrop-filter: saturate(0) blur(3px); // applies filter to all background elements
  }

  #bg {
    position: absolute;
    left: 0%;
    top: 0%;
    min-height: 100%;
    height: auto;
    width: 100%;
    background-image: url('/zines/night sky ny.webp');
    background-repeat: no-repeat;
    background-size: cover;
    overflow-y: auto;
  }
  #gold-border {
    width: fit-content;
    max-width: 85vw;
    padding: 0.75rem 2.5rem;
    border-style: outset;
    border-color: rgb(255, 255, 255);
    border-radius: 20px;

    margin: 8vh auto 5vh;
    background-color: rgba(0, 0, 0, 0.8);
    text-align: center;
  }

  #zine-intro {
    margin: 0;
    font-family: 'Playfair Display', serif;
    font-size: clamp(1.6rem, 4vw, 2.2rem);
    color: rgb(255, 255, 255);
  }
</style>
