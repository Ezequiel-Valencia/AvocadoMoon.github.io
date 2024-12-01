<script lang="ts">
    // import type Projects from "./project_object";
    import Tabs from "../../common/tabs.svelte";
    import { projects } from "./project_object";
    import { importSCSSOptions } from "../../globals"
  import { onMount } from "svelte";
    const sideImageLocation = "/personal_projects/animal star blue.png";
    const projectIterator = Object.entries(projects);
    let activeIndex = 0;

    const iconClass = "material-symbols-outlined"
    let icons = [[iconClass, "stat_3"], [iconClass, "stat_2"], [iconClass, "stat_1"]]

    onMount(() => {
        const clouds = document.querySelectorAll(".cloud") as NodeListOf<HTMLElement>
        clouds.forEach((c) => {
            c.style.setProperty("--time-dif", Math.floor((Math.random() * 1)) + "s")
        })
    })

</script>

<head>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
</head>


<section>
    <section id="sunny-ocean-intro">
        <div id="headline-text" style="text-align: center; padding-top:5%; z-index: 3; position:relative;">
            <h1 style="font-size: xx-large;">Personal Projects</h1>
            <u style="color: rgb(154, 204, 248);">
                <h3>Revealing an ocean of creativity from dreams</h3>
            </u>
            
        </div>
        <div id="sun"></div>
        {#each {length: 7} as _, i}
            <img class="cloud" src={"./personal_projects/cloud" + (i % 2) + ".svg"} 
            alt={"cloud" + i} style="--left-p: {(Math.random() * 30) + (i * 10)}%; top: {Math.random() * 30}%"
            >
        {/each}

        <div id="ocean">
            <svg class="waves" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
            viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto">
                <defs>
                    <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
                </defs>
                <g class="parallax">
                    <use xlink:href="#gentle-wave" x="48" y="0" fill="rgba(15, 101, 202, 0.8)" />
                    <use xlink:href="#gentle-wave" x="48" y="3" fill="rgba(15, 101, 202, 0.61)" />
                    <use xlink:href="#gentle-wave" x="48" y="5" fill="rgba(15, 101, 202, 0.36)" />
                    <use xlink:href="#gentle-wave" x="48" y="7" fill="rgb(46, 68, 112)" />
                </g>
            </svg>
        </div>
    </section>
    <section id="projects-wrapper">
        <div class="side-image"></div>
        <div id="project-article">
            <Tabs iterable={projectIterator} bind:activeIndex={activeIndex} 
            tabSCSSFileLocation={importSCSSOptions.personal_projects} getTabNameFunction={(e) => {return e[0]}}
            icons={icons}>

            </Tabs>
            {#each projectIterator as [key, category], index}
                {#if activeIndex == index}
                <article class="category">
                    <h2 class="category-title">{key}</h2>
                    {#each category as project, index}
                        <div class="project">
                            <h3>{project.name}</h3>
                            <h5>{project.year}</h5>
                            <p>{project.description}</p>
                        </div>
                    {/each}
                </article>
                {/if}
            {/each}
        </div>
        <div class="side-image"></div>
    </section>
</section>


<style lang="scss">
    .cloud{
        top: 15%; 
        position:absolute; 
        height:10vmin;
        opacity: 15%;
        left: var(--left-p);
        animation: swayClouds  calc(20s + var(--time-dif)) linear alternate-reverse infinite;
    }

    @keyframes swayClouds{
        from {
            transform: translate(0, 0);
        } to {
            transform: translate(calc(100% + var(--left-p)), 0);
        }
    }

    #sun{
        left: 10%; 
        top:10%; 
        border-radius:50%; 
        height: 10vmin; 
        width:10vmin; 
        background-color: rgba(255, 166, 0, 0.829); 
        position:absolute;
        z-index: 2;
    }

    #sun::after{
        content: '';
        position: absolute;
        background-image: radial-gradient(orange, rgba(255, 166, 0, 0.767), transparent, transparent);
        width: 170%;
        height: 170%;
        border-radius: 50%;
        bottom: -35%;
        left: -35%;
    }

    #sunny-ocean-intro{
        overflow: hidden;
        height: 100vh;
        width: 100vw;
        background-image: linear-gradient(rgb(71, 113, 252), rgb(71, 113, 252), rgb(71, 113, 252), rgb(96, 144, 240));
    }

    #sunny-ocean-intro::after{
        content: '';
        position: absolute;
        height: 70vh;
        width: 100vw;
        top: 0vh;
        // z-index: 1;
        // background-image: linear-gradient(transparent, rgba(255, 255, 255, 0.322));
    }

    #projects-wrapper{
        width: 100%;
        min-height: 100%;
        height:max-content;
        background-image: linear-gradient(rgb(46, 68, 112), #151f2b);
        display: flex;
    }
    #project-article{
        position:relative;
        width: 100%;
        height:auto;
    }

    .side-image{
        width: 10vw;
        background-image: url("/personal_projects/animal star blue.png");
        background-repeat: repeat;
        background-size:contain;
        object-fit:cover;
    }
    
    .category{
        margin-left: auto;
        margin-right: auto;
        padding-top: 5%;
        width: 80vw;
        max-width: 1000px;
    }

    .category-title{
        padding-top: 5%;
        border-top-style: ridge;
    }

    .project{
        padding-top: 2%;
        padding-bottom: 2%;
    }

    h3{
        color: rgb(154, 204, 248);
    }

    h5 {
        color: rgb(112, 188, 255);
    }

    p{
        color: white;
    }

    h2, h1{
        color: rgb(235, 245, 255);
        margin-top: 0;
    }

    .waves {
        position:absolute;
        width: 100%;
        height: 30vh;
        margin-bottom:-7px; /*Fix for safari gap*/
        min-height:100px;
        top: 70vh;
    }

    /* Animation */

    .parallax > use {
        animation: move-forever 25s cubic-bezier(.55,.5,.45,.5) infinite;
    }
    .parallax > use:nth-child(1) {
        animation-delay: -2s;
        animation-duration: 7s;
    }
    .parallax > use:nth-child(2) {
        animation-delay: -3s;
        animation-duration: 10s;
    }
    .parallax > use:nth-child(3) {
        animation-delay: -4s;
        animation-duration: 13s;
    }
    .parallax > use:nth-child(4) {
        animation-delay: -5s;
        animation-duration: 20s;
    }
    @keyframes move-forever {
        0% {
            transform: translate3d(-90px,0,0);
        }
        100% { 
            transform: translate3d(85px,0,0);
        }
    }

</style>