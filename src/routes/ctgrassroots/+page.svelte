<script lang="ts">
  import Menu from "../menu.svelte";
  import Faq from "./FAQ.svelte";
  import { musicController } from "../../myLocalStorage";
</script>

<div id="main-div">
  <Menu email="website@worker.slmail.me" songName="Zora's Domain - Day (Breath of the Wild)"></Menu>
  <Faq></Faq>


  {#if $musicController}
      <audio id="song" src="/Audio/Channel-Songs/Zora's Domain - Day (Breath of the Wild).mp3" autoplay loop></audio>
  {/if}
  
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

</style>
