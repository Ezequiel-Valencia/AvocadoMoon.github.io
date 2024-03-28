<script lang="ts">
    import { zines } from "./zine";
    let zinesKeyValueArray = Object.entries(zines);
</script>


<div id="zines">
    {#each zinesKeyValueArray as [key, zine], index}
        <div class="zine-container" id="{
            zinesKeyValueArray.length === (1 + index) ? "last-zine" : "zine-" + index
        }"
        on:mousedown={(e) => {
            location.href = zine.redirect
        }}
        aria-controls="tab-index-{index}"
        role="tab"
        tabindex={index}>
            <table>
                <tr>
                    <td>
                        <img class="zine-cover" src="{zine.zineCover}" alt="Zine Cover">
                    </td>
                    <td>
                        <p class="description">{zine.description}</p>
                    </td>
                </tr>
            </table>

        </div>
    {/each}

</div>



<style lang="scss">
    #zines{
        overflow: auto;
        background-color: rgb(15, 34, 139);
    }

    .zine-cover{
        max-width: 300px;
        max-height: 500px;
    }

    .zine-container{
        padding: 2%;
        border-bottom-style:solid;
        border-color: goldenrod;
        width: 80vw;
        margin: auto;
        max-width: 1000px;
    }

    .description{
        text-align: center;
        color: goldenrod;
        padding: 5%;
    }

    #last-zine{
        border-bottom-style: none;
    }



</style>