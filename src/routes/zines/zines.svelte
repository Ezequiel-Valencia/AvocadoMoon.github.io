<script lang="ts">
    const dirPrefix = "/zines"
    const zines = [
        {
            zineCover: dirPrefix + "/Expressionless Cover.png",
            description: "My first ever self made Zine. It's unstructured and has a loose theme of expressing emotions and growth. It's too personal to have on this website but there will soon be physical copies."
        },
        {
            zineCover: dirPrefix + "/Pandora_Poster.png",
            description: "Current Zine I'm working on focused upon tech and it's affects on different community's."
        }
    ]

</script>


<div id="zines">
    {#each zines as zine, index}
        <div class="zine-container" id="{
            zines.length === (1 + index) ? "last-zine" : "zine-" + index
        }">
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