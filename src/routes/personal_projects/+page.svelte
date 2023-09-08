<script lang="ts">
  import Menu from "../menu.svelte";
import Intro from "./intro.svelte";
  import Projects from "./projects.svelte";

</script>


<div id="main-div">
    <Menu email=""></Menu>
    <Intro></Intro>
    <Projects></Projects>
</div>





















<style lang="scss">
    #main-div{
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        background-color: #151f2b;
        overflow: auto;
    }

</style>