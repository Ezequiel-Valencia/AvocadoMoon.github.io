<script lang="ts">
  import Menu from "../menu.svelte";
  import Intro from "./intro.svelte";

</script>






<div id="main-div">
    <Menu songPath="/Audio/Channel-Songs/Mozart Symphony 40.mp3" email="website@worker.slmail.me" songName="Mozart Symphony 40"></Menu>
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