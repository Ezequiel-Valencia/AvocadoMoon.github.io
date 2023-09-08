<script lang="ts">
    // import type Projects from "./project_object";
    import { projects } from "./project_object";
    const sideImageLocation = "/personal_projects/animal star blue.png";
</script>




<div id="projects-wrapper">
    <div class="side-image"></div>
    <!-- <img class="side-image" src="{sideImageLocation}" alt="Sea animal images"> -->
    <article id="project-article">
        {#each Object.entries(projects) as [key, category], index}
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
        {/each}
    </article>
    <!-- <img class="side-image" src="{sideImageLocation}" alt="Sea animal images"> -->
    <div class="side-image"></div>
</div>









<style lang="scss">
    #projects-wrapper{
        width: 100%;
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
        background-image: url("personal_projects/animal star blue.png");
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