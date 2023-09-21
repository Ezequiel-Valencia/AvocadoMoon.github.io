<script lang="ts">
  import { musicController } from "../../myLocalStorage";
  import Menu from "../menu.svelte";
  import Websites from "./websites.svelte";

</script>






<div style="height: auto;" id="main-div">
    <Menu email="zines.zlfwo@slmails.com" songName="Anodyne 2 - Center City Cenote"></Menu>
    <div style="height: auto; min-height:100vh; text-align:center;">
        <img id="anim" src="/web_ring/zekeanimsmall.gif" alt="Web ring">
    
        <h2>Portal for Interesting Websites</h2>

        <div>
            <img style="height: 10vh;" src="/web_ring/www.gif" alt="WWW">
            <img style="height: 10vh;" src="/web_ring/computer_surfing.gif" alt="Computer Surfing">
            <img style="height: 10vh;" src="/web_ring/penguin_surf.gif" alt="Penguin Surfing">
        </div>

    </div>

    <Websites></Websites>

    {#if $musicController}
        <audio id="song" src="/Audio/Channel-Songs/Center City Cenote.mp3" autoplay loop></audio>
    {/if}

</div>



<style lang="scss">
    #main-div{
        top: 0;
        left: 0;
        position: absolute;
        height: auto;
        width: 100vw;
        background-image: url("/web_ring/starsbg.gif");
    }

    #anim{
        margin: 10vh;
        aspect-ratio: 1/1;
        border-style: groove;
        border-color: goldenrod;
        border-width: 5px;
    }



</style>