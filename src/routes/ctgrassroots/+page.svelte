<script lang="ts">
  import Menu from "../menu.svelte";
  import Faq from "./FAQ.svelte";
  import { musicController } from "../../myLocalStorage";
</script>

<div id="main-div">

  <Menu email="website@worker.slmail.me" songName="Zora's Domain - Day (Breath of the Wild)"></Menu>

  <div id="intro">
    <h1 id="ctheader">
      CTGrassRoots
    </h1>
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
    overflow: auto;
  }
  #intro{
    height: 80vh;
    width: 100vw;
    // background-color: rgb(15, 34, 139);
  }

  #ctheader{
    font-family: 'Playfair Display', serif;
        
    text-align: center;
    color: goldenrod;
    top: 50%;
    transform: translateY(-50%);
    position: relative;
    margin: 0%;
    padding: 0%;
  }

</style>
