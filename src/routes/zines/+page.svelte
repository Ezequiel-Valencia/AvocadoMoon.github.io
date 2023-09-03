<script lang="ts">
  import { musicController } from "../../globals";
    import Menu from "../menu.svelte";
import Intro from "./intro.svelte";
  import Zines from "./zines.svelte";
</script>



<div id="main-div">
    <Menu email="zines.zlfwo@slmails.com"></Menu>
    <Intro></Intro>
    <Zines></Zines>

    {#if $musicController}
        <audio src="/Audio/Channel-Songs/Sonic Unleashed Windmill Isle Night Acid Jazz.mp3" autoplay loop></audio>
    {/if}
</div>



<style lang="scss">
    #main-div{
        position: absolute;
        left: 0%;
        top: 0%;
        height: 100%;
        width: 100%;
    }
</style>