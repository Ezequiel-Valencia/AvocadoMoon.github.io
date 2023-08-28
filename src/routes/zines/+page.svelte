<script lang="ts">
    import Menu from "../menu.svelte";
import Intro from "./intro.svelte";
  import Zines from "./zines.svelte";
</script>



<div id="main-div">
    <Menu email="zines.zlfwo@slmails.com"></Menu>
    <Intro></Intro>
    <Zines></Zines>
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