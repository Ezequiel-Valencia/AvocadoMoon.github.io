<script lang="ts">
    import { zines } from "./zine";
    let zinesKeyValueArray = Object.entries(zines);
</script>


<div id="zines">
    {#each zinesKeyValueArray as [key, zine], index }
        <div style='display: flex; grid-row: 0; grid-column: {index % 1};' class="zine-container">
            <img style="display: flex;" class="zine-cover" src="{zine.zineCover}" alt="Zine Cover">
            <p style="display: flex;" class="description">{zine.description}</p>

        </div>
    {/each}
</div>



<style lang="scss">
    #zines{
        background-color: rgba(0, 0, 0, 0.80);
        height: 80vh;
        width: 80vw;
        text-align: center;
        margin: auto;
        display: grid;
        grid-template-columns: 50% 50%; // each 50% represents one column I want in the grid
        border-color: white;
        border-style: solid;
    }

    .zine-cover{
        max-width: 300px;
        max-height: 500px;
        height: 20vh;
        width: 10vw;
        margin-top: auto;
        margin-bottom: auto;
    }

    .zine-container{
        border-color: white;
        width: 100%;
        margin: auto;
    }

    .description{
        text-align: center;
        color: goldenrod;
        padding: 5%;
        font-size: small;
        width: 10vw;
    }

    #last-zine{
        border-bottom-style: none;
    }



</style>