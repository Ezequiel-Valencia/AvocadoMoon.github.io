<script lang="ts">
  import Menu from "../menu.svelte";

</script>






<div id="main-div">
    <Menu email="" songName=""></Menu>
    <div style="height: 100vh; text-align:center;">
        <img id="anim" src="/web_ring/zekeanimsmall.gif" alt="Web ring">
    
    <h2>Portal to find interesting Websites</h2>
    </div>

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