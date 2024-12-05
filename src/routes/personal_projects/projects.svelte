<script lang="ts">
    // import type Projects from "./project_object";
    import Tabs from "../../common/tabs.svelte";
    import { projects } from "./project_object";
    import { importSCSSOptions } from "../../globals"
  import { onMount } from "svelte";
    import {transitionStates} from "./common"
    const sideImageLocation = "/personal_projects/animal star blue.png";
    const projectIterator = Object.entries(projects);
    let activeIndex = 0;

    export let transControl;

    let techIndexAndName = "-1"

    function displayIconsDescription(pos: MouseEvent){
        const hiddenElement = document.elementFromPoint(pos.clientX, pos.clientY)
        if (hiddenElement != null && hiddenElement.classList.contains("tech")){
        let n = hiddenElement.id.split("-");
            techIndexAndName = n[1];
        } else {
            techIndexAndName = "";
        }
    }

    const iconClass = "material-symbols-outlined"
    let icons = [["", "Full Stack"], ["", "DevOp/IT"], ["", "CyberSecurity"], ["", "Misc. Software"]]

    onMount(() => {
        // Cloud Sway Time Difference
        const clouds = document.querySelectorAll(".cloud") as NodeListOf<HTMLElement>
        clouds.forEach((c) => {
            c.style.setProperty("--time-dif", Math.floor((Math.random() * 1)) + "s")
        })
        
        const bGradient = document.querySelector("#sun-animation") as HTMLElement
        let gradPercent = 0
        let blackTransparent = 1;

        // Expand black circle to transparent, or immediately show my projects
        if (transControl.read() == transitionStates.transitionToProjects){
            let interval = setInterval(() => {
            if (gradPercent <= 100){
                bGradient.style.setProperty("--grad-size", gradPercent + "%")
                bGradient.style.setProperty("--black-transparent", blackTransparent + "")
                blackTransparent -= .01
                gradPercent += 3
            } else{
                bGradient.style.setProperty("--black-transparent", 0 + "")
                bGradient.style.zIndex = "-1";
                transControl.updateToTransitioned()
                clearInterval(interval)
            }
        }, 40)
        } else{
            bGradient.style.opacity = "0";
            bGradient.style.zIndex = "-1";
        }

        document.addEventListener("pointermove", (e) => {
            displayIconsDescription(e)
        })
    })

    

</script>

<head>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
</head>

<section>
    <section id="sunny-ocean-intro">
        <div id="sun-animation"></div>
        <div id="headline-text" style="text-align: center; padding-top:5%; z-index: 3; position:relative;">
            <h1 style="font-size: xx-large;">Personal Projects</h1>
            <u style="color: rgb(154, 204, 248);">
                <h3 style="max-width:50%; margin:auto;">Revealing an ocean of creativity from my dreams</h3>
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
    {#if $transControl == transitionStates.showPersonalProjects}
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
                        <h2 class="category-title">{icons[index][1]} Description: <h5>{key}</h5></h2>
                        
                        {#each category as project, projectIndex}
                            <div class="project">
                                <h3>{project.name}</h3>
                                <h5 style="margin-bottom: 0%;">{project.year}</h5>
                                <h5 style="margin-top:0%;">Technologies: 
                                    {#each project.technologies as tech, index}
                                    <span id={"description-" + tech.name + projectIndex} class="tech description-holder">
                                        
                                        {#if (tech.name + projectIndex) == techIndexAndName}
                                            <div style="z-index: 3;" class="description">
                                                <h3 style="text-align:center; font-family: 'Times New Roman', Times, serif;">{tech.name}</h3>
                                                <p style="text-align: center;">{tech.description}</p>
                                            </div>
                                        {/if}
                                        <img id="img-{tech.name}{projectIndex}" class="tech" style="height: 3em; position:static;" src={tech.icon} alt={tech.name}>
                                    </span>
                                    {/each}
                                </h5>
                                <p>{project.description}</p>
                            </div>
                        {/each}
                    </article>
                    {/if}
                {/each}
            </div>
            <div class="side-image"></div>
        </section>
    {/if}
</section>


<style lang="scss">
    @import "./projects.scss";
    .cloud{
        top: 15%; 
        position:absolute; 
        height:10vmin;
        opacity: 15%;
        left: var(--left-p);
        animation: swayClouds  calc(20s + var(--time-dif)) linear alternate-reverse infinite;
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

    #sunny-ocean-intro{
        overflow: hidden;
        height: 100vh;
        width: 100vw;
        background-image: linear-gradient(rgb(71, 113, 252), rgb(71, 113, 252), rgb(71, 113, 252), rgb(96, 144, 240));
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
        border-bottom-style: ridge;
    }

    .description {
        z-index: 3;
        position: absolute;
        text-align: center;
        margin: auto;
        padding-right: 1.5%;
        padding-left: 1.5%;
        opacity: 1;
        height: auto;
        width: auto;

        background-color: rgb(53, 83, 138);
        border-style: solid;
        border-color: rgb(1, 115, 150);
  }

    .project{
        padding-top: 2%;
        padding-bottom: 2%;
    }

</style>