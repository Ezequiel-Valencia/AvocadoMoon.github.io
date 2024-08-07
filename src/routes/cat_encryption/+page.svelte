<script lang="ts">
    import Menu from "../menu.svelte";
    import Tabs from "../tabs.svelte";
    import { importSCSSOptions } from "../../globals"
    import Decode from "./decode.svelte"
    import Encode from "./encode.svelte"
    import { onMount } from "svelte"
    import { matrixDisplay } from "./matrixBG"

    onMount(() => {
        matrixDisplay()
    })

    let activeIndex = 0
    const imageOptions = ["Encode Cat", "Decode Cat"]
</script>



<div id="main-div">
    <Menu email="website@worker.slmail.me" songName="Meow - Ivusm"></Menu>

    <div id="title" style="">
        <h1 id="title-text" class="text">Cat Communication</h1>
        <p class="text">A communication scheme built around sharing cat images.</p>
    </div>

    <canvas id="matrixCanvas"></canvas>

    <article id="content">
        <Tabs iterable={Object.entries(imageOptions)} bind:activeIndex={activeIndex}
        tabSCSSFileLocation={importSCSSOptions.cat_encryption}
        getTabNameFunction={(e) => {return e[1]}}></Tabs>
        
        
        {#if activeIndex == 0}
            <Encode></Encode>
        {:else}
            <Decode></Decode>
        {/if}
    </article>
    
    
</div>


<style lang="scss">

    #main-div{
        top: 0;
        left: 0;
        position: absolute;
        height: 100vh;
        width: 100vw;
        z-index: -100;
        background-color: black;
    }

    #title{
        margin-top: 10vh;
        text-align: center;
    }

    #content{
        width: 100vw;
        height: auto;
    }

    .text{
        color: white;
    }

    #matrixCanvas{
        top: 0;
        left: 0;
        position: absolute;
        height: 100%;
        width: 100vw;
        z-index: -99;
        opacity: .35;
    }

</style>