<script lang="ts">
  import Menu from "../../common/menu.svelte";
  import Education from "./education.svelte";
  import Intro from "./intro.svelte";

</script>






<div id="main-div">
    <Menu songPath="https://files.catbox.moe/p5bsgp.mp3" email="website@worker.slmail.me" songName="Mozart Symphony 40"></Menu>
    <Intro></Intro>
    <Education></Education>
</div>





<style lang="scss">
    #main-div{
        position: absolute;
        top: 0;
        left: 0;
        background-color: #523f29;
        overflow: auto;
        height: auto;
    }
    
</style>