<script lang="ts">
  import Menu from "../menu.svelte";
import Experience from "./experience.svelte";
import Intro from "./intro.svelte";
import { musicController, sfxController } from "../../globals";

</script>




<div id="main-div">
    <Menu email=""></Menu>
    <Intro></Intro>
    <Experience></Experience>


    {#if $musicController}
        <audio src="/Audio/Channel-Songs/SABBATH.mp3" autoplay loop></audio>
    {/if}
    
</div>

<style lang="scss">
    #main-div{
        position: absolute;
        top: 0;
        left: 0;
    }

</style>