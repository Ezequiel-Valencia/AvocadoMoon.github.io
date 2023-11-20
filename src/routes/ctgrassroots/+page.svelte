<script lang="ts">
  import Menu from "../menu.svelte";
  import Faq from "./FAQ.svelte";
  import { musicController } from "../../myLocalStorage";
</script>

<div id="main-div">

  <Menu email="website@worker.slmail.me" songName="Zora's Domain - Day (Breath of the Wild)"></Menu>

  <div id="intro">
    <div style="margin: auto;">
      <img class="side-image"  src="/ctgrassroots/grass_roots.png" alt="Img"/>
    </div>
    <h1 id="ctheader">
      CTGrassRoots
    </h1>
    <div style="margin: auto;">
      <img class="side-image"  src="/ctgrassroots/paths_of_life.png" alt="Img"/>
    </div>
  </div>

  <Faq></Faq>


  <!-- {#if $musicController}
  {/if} -->
  
</div>


<style lang="scss">
  #main-div{
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: #145e0e;
    background-image: radial-gradient(rgb(0, 99, 21), rgb(0, 56, 9));
    overflow: auto;
  }
  #intro{
    height: 50vh;
    width: 100vw;
    text-align: center;
    display: flex;
    // background-color: rgb(15, 34, 139);
  }

  #ctheader{
    font-family: 'Playfair Display', serif;
        
    text-align: center;
    color: goldenrod;
    position: relative;
    height: auto;
    display: flex;

    margin: auto;
  }

  .side-image{
    text-align: center;
    background-size: contain;
    background-repeat: no-repeat;
    margin: auto;
    width: 15vw;
    height:auto;
  }

</style>
