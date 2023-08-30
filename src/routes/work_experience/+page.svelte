<script lang="ts">
  import Menu from "../menu.svelte";
import Experience from "./experience.svelte";
import Intro from "./intro.svelte";


</script>




<div id="main-div">
    <Menu email=""></Menu>
    <Intro></Intro>
    <Experience></Experience>
</div>

<style lang="scss">
    #main-div{
        position: absolute;
        top: 0;
        left: 0;
    }

</style>