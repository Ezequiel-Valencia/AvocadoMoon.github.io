<script lang="ts">
    import Menu from "../../common/menu.svelte";
    import Tabs from "../../common/tabs.svelte";
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
    <Menu songPath="/Audio/Channel-Songs/Cat Dance.mp3" email="website@worker.slmail.me" songName="Intense - Only You (Cat Breakdance Section)"></Menu>

    <div id="title" style="">
        <h1 id="title-text" class="text">Cat Communication</h1>
        <p class="text">Hiding your message in cat images using <a style="color:cadetblue;" href="https://en.wikipedia.org/wiki/Steganography">Stenography</a>.</p>
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
        height: auto;
        min-height: 100vh;
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