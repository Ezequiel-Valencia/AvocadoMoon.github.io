<script lang="ts">
    // import type Projects from "./project_object";
    import Tabs from "../../common/tabs.svelte";
    import { projects } from "./project_object";
    import { importSCSSOptions } from "../../globals"
    const sideImageLocation = "/personal_projects/animal star blue.png";
    const projectIterator = Object.entries(projects);
    let activeIndex = 0;

    const iconClass = "material-symbols-outlined"
    let icons = [[iconClass, "stat_3"], [iconClass, "stat_2"], [iconClass, "stat_1"]]

</script>

<head>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
</head>


<section>
    <section id="sunny-ocean-intro">
        <div id="headline-text" style="text-align: center; padding-top:5%;">
            <h2 style="">Personal Projects</h2>
            <h3>Revealing an ocean of creativity from dreams</h3>
        </div>
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
    #sunny-ocean-intro{
        height: 100vh;
        width: 100vw;
        background-image: linear-gradient(rgb(71, 113, 252), rgb(71, 113, 252), rgb(71, 113, 252), rgb(46, 68, 112));
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

    h2{
        color: rgb(235, 245, 255);
        margin-top: 0;
    }

    .waves {
        position:absolute;
        width: 100%;
        height: 20vh;
        margin-bottom:-7px; /*Fix for safari gap*/
        min-height:100px;
        top: 80vh;
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