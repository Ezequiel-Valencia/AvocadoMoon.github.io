<script lang="ts">
    // import type Projects from "./project_object";
    import Tabs from "../tabs.svelte";
    import { projects } from "./project_object";
    const sideImageLocation = "/personal_projects/animal star blue.png";
    const projectIterator = Object.entries(projects);
    let activeIndex = 0;

    const iconClass = "material-symbols-outlined"
    let icons = [[iconClass, "stat_3"], [iconClass, "stat_2"], [iconClass, "stat_1"]]

</script>

<head>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
</head>


<div id="projects-wrapper">
    <div class="side-image"></div>
    <!-- <img class="side-image" src="{sideImageLocation}" alt="Sea animal images"> -->
    <div id="project-article">
        <Tabs iterable={projectIterator} bind:activeIndex={activeIndex} 
        tabSCSSFileLocation="personal_projects" getTabNameFunction={(e) => {return e[0]}}
        icons={icons}>

        </Tabs>
        {#each projectIterator as [key, category], index}
            {#if activeIndex == index}
            <div class="category">
                <h2 class="category-title">{key}</h2>
                {#each category as project, index}
                    <div class="project">
                        <h3>{project.name}</h3>
                        <h5>{project.year}</h5>
                        <p>{project.description}</p>
                    </div>
                {/each}
            </div>
            {/if}
        {/each}
    </div>
    <!-- <img class="side-image" src="{sideImageLocation}" alt="Sea animal images"> -->
    <div class="side-image"></div>
</div>









<style lang="scss">
    #projects-wrapper{
        width: 100%;
        min-height: 100%;
        height:max-content;
        background-image: linear-gradient(#151f2b, rgb(46, 68, 112));
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

</style>