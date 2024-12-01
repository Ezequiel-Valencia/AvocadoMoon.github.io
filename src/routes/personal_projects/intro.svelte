<script lang="ts">
  import { onMount } from "svelte";
  import {setStarPositions, createReflections, moveMoonAndGradient, checkAndPerformIfMoonIntersection
    ,moveAndShowDragMe, setCircleTextStyle, createTransitionControl, transitionStates} from "./intro";
  
  let holdingDownMoon = false;
  let transition = false;
  let dreamText = "End Dream? "

  export let transControl;

  onMount(() => {
    const ogMoon = document.querySelector("#og-moon") as HTMLElement;
    const sky = document.querySelector("#sky") as HTMLElement;
    const ocean_reflection = document.querySelector("#ocean") as HTMLElement
    const drag_me_text = document.querySelector("#drag-me-text") as HTMLElement;
    const missing_piece = document.querySelector("#circle-missing") as HTMLElement;
    const intro_section = document.querySelector("#intro-wrapper") as HTMLElement;
    const invisibleMoon = document.querySelector("#invisible-moon") as HTMLElement
    const dreamTextSpans = document.querySelectorAll(".circle-text") as NodeListOf<HTMLElement>;

    setStarPositions()
    createReflections(ocean_reflection)
    setCircleTextStyle(missing_piece, dreamText, dreamTextSpans)

    const reflectedMoon = document.getElementsByClassName("reflected moon")[0] as HTMLElement
    
    ogMoon.addEventListener("pointerdown", (e) => {
      holdingDownMoon = true
      drag_me_text.style.opacity = "0";
      invisibleMoon.style.opacity = "1";
      dreamTextSpans.forEach((e) => {
        e.style.opacity = '1'
      })
    })

    document.addEventListener("pointerup", () => {
      holdingDownMoon = false
      if (!transition){
        moveAndShowDragMe(ogMoon, drag_me_text)
        invisibleMoon.style.opacity = "0";
        dreamTextSpans.forEach((e) => {
          e.style.opacity = '0'
        })
      }
    })

    ogMoon.addEventListener("animationend", async () =>{
      intro_section.style.maskImage = 'url(./personal_projects/dream-transition.gif)';
      intro_section.style.maskSize = 'cover';
      let k = async () => {
        return new Promise(() => {
          setTimeout(() => {transControl.updateToTransitioning()}, 3000);
        })
      }
      await k()
    })

    sky.addEventListener("pointermove", (e) => {
      if (holdingDownMoon && !transition){
        moveMoonAndGradient(e, ogMoon, sky, reflectedMoon, ocean_reflection)
        transition = checkAndPerformIfMoonIntersection(ogMoon, reflectedMoon, invisibleMoon)
      }
    })

  })
</script>


<section id="intro-wrapper" style="">
  <div id="sky">
      <div id="circle-missing">
        {#each dreamText as char, i}
          <span class="circle-text">{char}</span>
        {/each}
        <div id="invisible-moon"></div>
      </div>
      <figure>
        <img class="moon to-be-reflected" id="og-moon"
        draggable="false"
        style="height: 10vmin; color:white; z-index:5; position:absolute; top:45%" 
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
  <div style="opacity: 0;" class="remove-gradient reflected slide-in-moon slide-in-moon-reflected moon-to-sun"></div>
</section>


<style lang="scss">
  @import "./intro_animation.scss";
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
    opacity: 0.3;
  }

  #invisible-moon{
    height:10vmin; 
    width:10vmin;
    margin: auto;
    background-color:white;
    mask-mode: auto;
    mask-image: url("./personal_projects/moon.svg");
    mask-size: 10vmin;
    opacity: 0;
  }

  #circle-missing{
    display: flex;
    height: 15vmin; 
    width: 15vmin; 
    position: absolute; 
    left: 10%; 
    top: 10%;
    border-radius: 50%;
    align-items: center;
  }

  .circle-text{
    position: absolute;
    color: white;
    animation: rotateDreamText 8s linear infinite;
    opacity: 0;
    transform-origin: 0 200%;
  }

  

</style>
