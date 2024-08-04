<script lang="ts">
    import Menu from "../menu.svelte";
    import Tabs from "../tabs.svelte";
    import { importSCSSOptions } from "../../globals"
    import Decode from "./decode.svelte"
    import Encode from "./encode.svelte"

    let activeIndex = 0
    const imageOptions = ["Encode Image", "Decode Image"]
</script>



<div id="main-div">
    <Menu email="website@worker.slmail.me" songName="Meow - Ivusm"></Menu>

    <div id="title">
        <h1 id="title-text" class="text">Cat Communication</h1>
        <p class="text">A communication scheme built around sharing cat images.</p>
    </div>

    <article id="content">
        <Tabs iterable={Object.entries(imageOptions)} bind:activeIndex={activeIndex}
        tabSCSSFileLocation={importSCSSOptions.personal_projects}
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
        width: 100vw;
        background-color: black;
    }

    #title{
        margin-top: 15vh;
        text-align: center;
    }

    #content{
        width: 100vw;
        height: auto;
    }

    .text{
        color: white;
    }

</style>