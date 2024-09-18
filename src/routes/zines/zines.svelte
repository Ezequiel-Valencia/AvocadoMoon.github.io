<script lang="ts">
    import { zines } from "./zine";
    let zinesKeyValueArray = Object.entries(zines);
    let hoveredEntity = -1;
</script>


<div id="zines">
    {#each zinesKeyValueArray as [key, zine], index }
        <div on:mouseenter={(e) => {hoveredEntity = index}} 
            on:mouseleave={(e) => {hoveredEntity = -1}}
            role="tab"
            aria-controls="tabpanel-{index}"
            tabindex="{index}"
            style='display: flex; grid-row: 0; grid-column: {index % 1};' 
            class="zine-container">


            {#if hoveredEntity != index}
                <img style="display: flex;" class="zine-cover" src="{zine.zineCover}" alt="Zine Cover">
                <p style="display: flex;" class="title">{zine.title}</p>
            {/if}
            {#if hoveredEntity == index}
                <p class="description">{zine.description}</p>
            {/if}

        </div>
    {/each}
</div>



<style lang="scss">
    #zines{
        background-color: rgba(0, 0, 0, 0.70);
        height: 80vh;
        width: 90vw;
        text-align: center;
        margin: auto;
        margin-bottom: 5vh;
        display: grid;
        grid-template-columns: 50% 50%; // each 50% represents one column I want in the grid
        grid-auto-rows: 1fr; // Full row for height
        border-style: solid;
        max-height: 1000px;
        border-image-source: url('zines/star-line.png');
        border-image-repeat: round;
        border-image-slice: 33%; // what percent of the image from left, right, top, and bottom sides should the slicing line drop to
        border-image-width: 25px; //size of the border
        border-image-outset: 20px; //how far out from the height/width of the element
    }

    .zine-cover{
        max-width: 300px;
        max-height: 500px;
        height: 30vh;
        margin-top: auto;
        margin-bottom: auto;
        padding-left: 5%;
    }

    .zine-container{
        width: 100%;
        height: 100%;
        margin: auto;
        transition: all 1s;
        border-bottom-style: inset;
        border-radius: 5px;
        border-bottom-color: white;
    }

    .zine-container:hover{
        background-color: black;
        transition: all 1s;
        border-bottom-color: transparent;
    }

    .title{
        text-align: center;
        color: goldenrod;
        padding: 5%;
        font-size: medium;
        margin-top: auto;
        margin-bottom: auto;
    }
    .description{
        color: white;
        margin-top: auto;
        margin-bottom: auto;
        margin: auto;
        padding-left: 2%;
        padding-right: 2%;
    }


</style>