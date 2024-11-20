<script lang="ts">
  import Menu from "../../common/menu.svelte";
  import Websites from "./websites.svelte";

</script>






<div style="height: auto;" id="main-div">
    <Menu songPath="https://files.catbox.moe/lgaw6k.mp3" email="zines.zlfwo@slmails.com" songName="Anodyne 2 - Center City Cenote"></Menu>
    <div style="height: auto; min-height:100vh; text-align:center; margin:auto;">
        <img id="anim" src="/web_ring/zekeanimsmall.gif" alt="Web ring">
    

        <div style="display: flex; margin:auto; text-align:center; width:fit-content; height:auto;">
            <img style="height: 10vh;" src="/web_ring/www.gif" alt="WWW">
            <h2 style="font-size: 5vmin;">Portal for Interesting Websites</h2>
            <img style="height: 10vh;" src="/web_ring/computer_surfing.gif" alt="Computer Surfing">
        </div>

    </div>

    <Websites></Websites>
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
        height: 40vmin;
        width: 50vmin;

        max-height: 800px;
        max-width: 900px;
    }

    h2{
        color: white;
    }



</style>