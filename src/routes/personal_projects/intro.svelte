<script lang="ts">
  import { onMount } from "svelte";
  import {setStarPositions, createReflections, moveMoonAndGradient, inBounds} from "./intro";
  import Projects from "./projects.svelte";
  let holdingDownMoon = false;
  let transition = false;

  onMount(() => {
    const ogMoon = document.querySelector("#og-moon") as HTMLElement;
    const sky = document.querySelector("#sky") as HTMLElement;
    const ocean_reflection = document.querySelector("#ocean") as HTMLElement
    const drag_me_text = document.querySelector("#drag-me-text") as HTMLElement;

    
    ogMoon.style.top = 45 + "%";

    setStarPositions()
    createReflections(ocean_reflection)
    const reflectedMoon = document.getElementsByClassName("reflected moon")[0] as HTMLElement
    
    ogMoon.addEventListener("pointerdown", (e) => {
      holdingDownMoon = true
      drag_me_text.style.opacity = "0";
    })

    document.addEventListener("pointerup", () => {
      holdingDownMoon = false
      let y = ogMoon.style.top.split("px")[0]
      let yOffset = (Number(y) + ogMoon.getBoundingClientRect().height)
      drag_me_text.style.top = yOffset + "px";
      drag_me_text.style.left = ogMoon.style.left;
      drag_me_text.style.opacity = "1";
    })

    sky.addEventListener("pointermove", (e) => {
      if (holdingDownMoon && !transition){
        moveMoonAndGradient(e, ogMoon, sky, reflectedMoon, ocean_reflection)
        const hitBox = document.querySelector("#missing-piece")
        if (hitBox != null && inBounds(ogMoon.getBoundingClientRect(), hitBox.getBoundingClientRect())){
          transition = true
        }
      }
    })

    




  })
</script>

{#if !transition}
  <section id="intro-wrapper">
    <div id="sky">
        {#if holdingDownMoon}
          <div id="missing-piece"></div>
        {/if}
        <figure>
          <img class="moon to-be-reflected" id="og-moon"
          draggable="false"
          style="height: 10vmin; color:white; z-index:5; position:absolute;" 
          src="./personal_projects/moon.svg" 
          alt="Moon"
          >
          <figcaption id="drag-me-text" style="left:50%; top:65%;z-index: 10; color:white;position:absolute;">Drag Me</figcaption>
        </figure>
        
      
      {#each {length: 30} as _}
        <div class="to-be-reflected star"></div>
      {/each}
    </div>
    <div id="ocean">
      
    </div>
    <div class="reflected"></div>
  </section>

{:else}
 <Projects></Projects>
{/if}


<style lang="scss">
  #intro-wrapper {
    height: 100vh;
    width: 100vw;
  }

  #sky{
    width: 100vw;
    height: 50vh;
    background-color: rgb(0, 0, 0);

    --grad-y: 50%;
    --grad-x: 50%;

    background-image: radial-gradient(circle at var(--grad-x) var(--grad-y), 
    rgba(137, 43, 226, 0.397), rgba(6, 6, 109, 0.397), rgba(6, 6, 109, 0.185));
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
  }

  #ocean{
    width: 100vw;
    height: 50vh;
    position: relative;
    align-items: center;
    display: flex;
    flex-direction: column;
    overflow: hidden;

    --grad-y: 50%;
    --grad-x: 50%;

    background-color: rgb(0, 0, 0);
    background-image: radial-gradient(circle at var(--grad-x) var(--grad-y), 
      rgba(180, 141, 216, 0.267), 
      rgba(0, 0, 54, 0.171));
    z-index: 1;
  }

  .star{
    width: 0.3em;
    height: 0.3em;
    background-color: white;
    z-index: 1;
    border-radius: 50%;
    position: absolute;
  }

  .reflected{
    transform: scale(1, -1);
    // background-color: lightblue;
    // border: 1px solid #000;
    
    opacity: 0.3;
  }

  #missing-piece{
    position: absolute; 
    left: 10%; 
    top: 10%; 
    height:10vmin; 
    width:10vmin; 
    background-color:white;
    mask-mode: auto;
    mask-image: url("./personal_projects/moon.svg");
    mask-size: 10vmin;
  }


</style>
