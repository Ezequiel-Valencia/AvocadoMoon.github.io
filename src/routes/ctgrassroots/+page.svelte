<script lang="ts">
  import Menu from "../menu.svelte";
  import Faq from "./FAQ.svelte";
  import { musicController } from "../../myLocalStorage";
</script>

<div style="background-image: url('/ctgrassroots/back.jpg'); 
  background-size: 100% 100%; 
  background-repeat:no-repeat;" id="main-div">

  <Menu email="website@worker.slmail.me" songName="It's Just Begun (2002 Remastered)"></Menu>

  <div id="intro">
    <div style="margin: auto;">
      <img class="side-image" src="/ctgrassroots/7upup.png" alt="Img"/>
    </div>
  </div>
  <div style="text-align: center;">
    <h1 style="color: black;">FAQ:</h1>
  </div>

  <Faq></Faq>


  {#if $musicController}
    <audio id="song" src="/Audio/Channel-Songs/It's Just Begun.mp3" autoplay loop></audio>
  {/if}
  
</div>


<style lang="scss">
  #main-div{
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: #087575;
    // background-image: radial-gradient(rgb(1, 73, 17), rgb(0, 56, 9));
    overflow: auto;
  }
  #intro{
    height: 50vh;
    width: 100vw;
    text-align: center;
    display: flex;
    // background-color: rgb(15, 34, 139);
  }

  // #ctheader{
  //   font-family: 'Playfair Display', serif;
        
  //   text-align: center;
  //   color: rgb(1, 114, 134);
  //   position: relative;
  //   height: auto;
  //   display: flex;

  //   margin: auto;
  // }

  .side-image{
    text-align: center;
    background-size: contain;
    background-repeat: no-repeat;
    margin: auto;
    width: 30dvh;
    height:auto;
  }

</style>
