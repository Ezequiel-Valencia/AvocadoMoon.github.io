<script lang="ts">
  import { musicController } from "../../myLocalStorage";
  import Menu from "../menu.svelte";
  import Edu from "./edu.svelte";
  import Intro from "./intro.svelte";

</script>






<div id="main-div">
    <Menu email=""></Menu>
    <Intro></Intro>

    {#if $musicController}
    <audio id="song" src="/Audio/Channel-Songs/Mozart Symphony 40.mp3" autoplay loop></audio>
    {/if}
</div>





<style lang="scss">
    #main-div{
        position: absolute;
        top: 0;
        left: 0;
        background-color: #d1b698;
        overflow: auto;
        height: auto;
    }
    
</style>