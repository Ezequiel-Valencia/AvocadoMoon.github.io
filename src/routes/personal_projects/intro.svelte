<script lang="ts">
  import { onMount } from "svelte";
  let holdingDownMoon = false;

  function createReflections(ocean_reflection: HTMLElement){
    let reflections = document.querySelectorAll(".to-be-reflected") as NodeListOf<HTMLElement>
    reflections.forEach((el) => {
      let copy = el.cloneNode(false) as HTMLElement      
      let yOffset =  Number(el.style.top.split("%")[0])
      copy.style.top = ""
      copy.style.bottom = yOffset + "%"
      copy.style.position = "absolute"
      copy.classList.add("reflected")
      copy.id = ""
      ocean_reflection.appendChild(copy)
    })
  }

  function setStarPositions(){
    let stars = document.querySelectorAll(".star") as NodeListOf<HTMLElement>
    stars.forEach((star) => {
      console.log("Star")
      star.style.top = "" + Math.floor(Math.random() * 100) + "%"
      star.style.left = "" + Math.floor(Math.random() * 100) + "%"
     })
  }

  onMount(() => {
    const ogMoon = document.querySelector("#og-moon") as HTMLElement;
    const sky = document.querySelector("#sky") as HTMLElement;
    const ocean_reflection = document.querySelector("#ocean") as HTMLElement
    ogMoon.style.top = 45 + "%";

    setStarPositions()
    createReflections(ocean_reflection)
    const reflectedMoon = document.getElementsByClassName("reflected moon")[0] as HTMLElement
    
    ogMoon.addEventListener("pointerdown", (e) => {
      holdingDownMoon = true
    })

    document.addEventListener("pointerup", () => {
      holdingDownMoon = false
    })

    sky.addEventListener("pointermove", (e) => {
      if (holdingDownMoon){
        let rect = sky.getBoundingClientRect()
        let xInt = e.clientX - rect.left - (innerWidth / 50);
        let yInt = e.clientY - rect.top - (innerHeight / 50);
        
        let x = xInt + "px"
        let y = yInt + "px"
        ogMoon.style.top = y
        ogMoon.style.left = x
        sky.style.setProperty("--grad-y", y)
        sky.style.setProperty("--grad-x", x)

        console.log(y)
        reflectedMoon.style.bottom = y
        reflectedMoon.style.left = x
        ocean_reflection.style.setProperty("--grad-y", ((innerHeight/ 2) - yInt) + "px")
        ocean_reflection.style.setProperty("--grad-x", x)
      }
    })

    




  })
</script>

<section id="intro-wrapper">
  <div id="sky">
      <img class="moon to-be-reflected" id="og-moon"
        draggable="false"
        style="height: 10vmin; color:white; z-index:5; position:absolute;" 
        src="./personal_projects/moon.svg" 
        alt="Moon"
    >
    
    {#each {length: 30} as _}
      <div class="to-be-reflected star"></div>
    {/each}
  </div>
  <div id="ocean">
    
  </div>
  <div class="reflected"></div>
</section>

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


</style>
