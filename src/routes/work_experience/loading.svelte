<script lang="ts">
    import { onMount } from "svelte";
    import { percentLoaded } from "./experiences";

    onMount(() => {
        let stars = document.querySelectorAll(".star") as NodeListOf<HTMLElement>
        stars.forEach((star) => {
            star.style.top = "" + Math.floor(Math.random() * 100) + "%"
            star.style.left = "" + Math.floor(Math.random() * 100) + "%"
        })
    })

</script>



<section id="loading-section" style="position: absolute; height:100vh; width:100vw;">
    {#each {length: 40} as _, i}
      <div style="--fade-time: {Math.max((i * Math.random()) % 5, 2 + Math.random())}s;" class="star"></div>
    {/each}
    <div style="text-align: center; justify-content:center; margin:auto;">
        <h1 style="text-align: center; color:white;">Galaxy is loading, please wait.</h1>
        <div style="width: 25vw;" id="progress-bar">
            <div style="width: {$percentLoaded}%; background-color:purple; color:white;" id="progress-bar-filling">
                {$percentLoaded}%
            </div>
        </div>
    </div>
</section>





<style lang="scss">
    #loading-section{
        background-color:black; 
        left:0; 
        top:0;
        justify-items: center;
        align-items: center;
        display: flex;
    }

    #progress-bar{
        border-radius: 5px;
        border-style: solid;
        border-color: white;
        justify-self: center;
        
    }

    #progress-bar-filling{
        height: 100%;
        padding-top: 2%;
        padding-bottom: 2%;
    }

    .star{
        --fade-time: 2s;
        width: 0.3em;
        height: 0.3em;
        background-color: white;
        z-index: 1;
        border-radius: 50%;
        position: absolute;
        animation: fadeInAndOut var(--fade-time) infinite alternate;
    }

    @keyframes fadeInAndOut{
        from{
            opacity: 0;
        } to {
            opacity: 1;
        }
    }

</style>



