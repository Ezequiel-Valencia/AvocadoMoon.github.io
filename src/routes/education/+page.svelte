<script lang="ts">
  import Menu from "../../common/menu.svelte";
  import Intro from "./intro.svelte";

</script>






<div id="main-div">
    <Menu songPath="https://files.catbox.moe/p5bsgp.mp3" email="website@worker.slmail.me" songName="Mozart Symphony 40"></Menu>
    <Intro></Intro>
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