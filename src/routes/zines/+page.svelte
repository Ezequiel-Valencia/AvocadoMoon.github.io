<script lang="ts">
  import { musicController } from "../../myLocalStorage";
    import Menu from "../menu.svelte";
import Intro from "./intro.svelte";
  import Zines from "./zines.svelte";
</script>



<div id="main-div">
    <Menu email="zines.zlfwo@slmails.com" songName="Sonic Unleashed Windmill Isle Night Acid Jazz"></Menu>
    <Intro></Intro>
    <Zines></Zines>

    {#if $musicController}
        <audio id="bg-song" volume=0.1 src="/Audio/Channel-Songs/Sonic Unleashed Windmill Isle Night Acid Jazz.mp3" autoplay loop></audio>
        <script lang="ts">
            var audio = document.getElementById("bg-song");
            audio.volume = 0.4;
        </script>
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