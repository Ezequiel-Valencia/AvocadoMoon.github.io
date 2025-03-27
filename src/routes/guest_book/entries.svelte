<script lang="ts">
  import { onMount } from "svelte";
  import { Configuration, GeoCacheApi, type GeoCacheSubmission, type GetSubmissionRequest } from "../../backend-api";
    // let entries = [{name: "Ezequiel", note: "Message", date: "5/10/2025", secret: "Secret message."},
    // {name: "Ezequiel", note: "Message", date: "5/10/2025", secret: "Secret message."}]
    

    $: showBlueLight = false
    let interBubble: HTMLElement

    let geo: GeoCacheApi = new GeoCacheApi()
    let entries: GeoCacheSubmission[]
    $: entries = []
    $: pageNumber = 0;

    function updateClipPath(event: any) {
        const container = event.currentTarget;
        const rect = container.getBoundingClientRect();
        const x = ((event.clientX - rect.left))
        const y = ((event.clientY - rect.top))
        container.style.setProperty('--x', `${x}px`);
        container.style.setProperty('--y', `${y}px`);
    }

    onMount(async () => {
        interBubble = document.querySelector<HTMLDivElement>('.interactive')!;
        document.addEventListener('mousemove', (event) => {
            const rect = interBubble.getBoundingClientRect();
            const x = event.clientX - (200 / 2)
            const y = event.clientY - (200 / 2)
            interBubble.style.transform = `translate(${x}px, ${y}px)`;

        });
        let req: GetSubmissionRequest = {pageNumber: pageNumber}
        entries = await geo.getSubmission(req)
        
    })

</script>


<section>
    <hr style="width: 80vw; margin-top:10vh;">
    <h1 style="text-align: center;">Entries</h1>
    <div style="margin: auto; text-align:center;">
        <button on:click={() => {
            showBlueLight = !showBlueLight;
            }} 
            style="text-align: center; margin:auto;">Turn Blacklight {showBlueLight ? "Off": "On"}?</button>
    </div>
    <div style="opacity: {showBlueLight ? 1 : 0};" class="interactive"></div>
    {#each entries as entry, i}
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div class="entry" on:mousemove={updateClipPath} style="">
            
            <div class="entry-text {showBlueLight ? "blacklight" : ""}">
                <span style="display: flex; justify-content:space-between;">
                    <p>{entry.name}</p>
                    <p style="text-align: right; padding-right:1vw;">{entry.date}</p>
                </span>
                {#if entry.latitude != undefined}
                    <div>
                        <p style="display: inline; text-align:left; margin:auto;">Location: </p>
                        <a style="display: inline; text-align:left; padding-right:0px;" target="_blank" rel="noopener noreferrer" href="https://www.google.com/maps?q={entry.latitude},{entry.longitude}">
                            <p style="margin-top: 0px; margin-bottom:40px; padding-left:0px; display:inline; text-align:left;">{entry.locationName}</p>
                        </a>
                    </div>
                {/if}
                <hr style="width: 95%;">
                <p>{entry.note}</p>
            </div>
            <div class="hidden-content {showBlueLight ? "blacklight" : ""}" style="">
                <div>
                    <p style=" color:white;">{entry.secret}</p>
                </div>
            </div>
            
        </div>
    {/each}
</section>


<style lang="scss">
    p{
        text-align: left; 
        padding-left:1vw;
        word-wrap: break-word;
        text-wrap: wrap;
    }
    .entry{
        text-align: center; 
        margin-left:auto;
        margin-right: auto;
        margin-top: 2vh;
        border-radius:4px; border-width:2px; border-color:black; border-style:solid;
        width: 30vw;
        height: fit-content;
        position: relative;
        background-color: white;
    }

    .hidden-content{
        position:absolute; 
        top:0; 
        left:0;
        clip-path: circle(0% at 0% 0%);
        background-color: transparent;
        z-index: 5;
    }

    .entry:hover .hidden-content.blacklight{
        clip-path: circle(100px at var(--x, 50%) var(--y, 50%));
    }

    .entry:hover .entry-text.blacklight{
        background-color: transparent;
        clip-path: circle(0% at 0% 0%);
    }

    .entry-text{
        height: 100%;
        width: 100%;
        transition: all 2s ease;
        text-align: left;
        // background-color: white;
    }

    .interactive {
        position: absolute;
        background: radial-gradient(circle at center, rgba(46, 119, 255, 0.8) 0, rgba(32, 103, 255, 0.63) 50%) no-repeat;
        // background-color: black;
        mix-blend-mode: hard-light;
        width: 200px;
        height: 200px;
        top: -0%;
        left: -0%;
        border-radius: 50%;
        opacity: 0.7;
        pointer-events:none; 
        z-index:5;
        position: fixed;
    }

    button{
        padding: .5%;
        background-color: white;
        border-color: black;
        border-style: solid;
    }
    button:hover{
        background-color: black;
        color: white;
        cursor: pointer;
    }

</style>

