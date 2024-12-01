<script lang="ts">
  import Menu from "../../common/menu.svelte";
  import Intro from "./intro.svelte";
  import Projects from "./projects.svelte";

  import {createTransitionControl, transitionStates} from "./intro";

  const transControl = createTransitionControl()
</script>


<div id="main-div">
    <Menu songPath="https://files.catbox.moe/way98y.mp3" email="website@worker.slmail.me" songName="Zora's Domain - Day (Breath of the Wild)"></Menu>
    {#if $transControl === transitionStates.stillInDream}
        <Intro transControl={transControl}></Intro>
    {:else}
        <Projects transControl={transControl}></Projects>
    {/if}
    
    
</div>


<style lang="scss">
    #main-div{
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        // background-color: #151f2b;
        background-color: black;
        overflow: auto;
    }

</style>