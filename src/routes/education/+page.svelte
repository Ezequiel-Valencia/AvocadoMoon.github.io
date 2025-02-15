<script lang="ts">
  import { onMount } from "svelte";
  import Menu from "../../common/menu.svelte";
  import Education from "./education.svelte";
  import Intro from "./intro.svelte";


  $: touchscreen = false

  onMount(() => {
    if (('ontouchstart' in window)){
        touchscreen = true
    }
  })

</script>






<div id="main-div">
    {#if touchscreen}
        <div id="touch-screen">
            <h1>Warning:</h1>
            <p style="text-align:center;">
                This channel is meant to be viewed on a computer with a mouse. 
                The experience on mobile may 
                be dysfunctional so please if possible revisit this channel on a computer.
            </p>
            <button on:click={(e) => {touchscreen = false}}>Continue</button>
        </div>
    {/if}
    <Menu songVolumeLevel=.3 songPath="https://files.catbox.moe/p5bsgp.mp3" songName="Mozart Symphony 40"></Menu>
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

    #touch-screen{
        height: 60vh;
        width: 80vw;
        background-color: antiquewhite;
        border-radius: 4vmin;
        position: absolute;
        left: 0%;
        right: 0%;
        top: 25vh;
        margin: auto;
        text-align: center;
        z-index: 5;
    }

    
</style>