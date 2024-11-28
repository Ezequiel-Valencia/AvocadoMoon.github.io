<script lang="ts">
  import { onMount } from "svelte";


  function createReflections(reflections: NodeListOf<HTMLElement>, ocean_reflection: HTMLElement){
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

  onMount(() => {
    let stars = document.querySelectorAll(".star") as NodeListOf<HTMLElement>
    stars.forEach((star) => {
      console.log("Star")
      star.style.top = "" + Math.floor(Math.random() * 100) + "%"
      star.style.left = "" + Math.floor(Math.random() * 100) + "%"
     })

    let ogMoon = document.querySelector("#og-moon") as HTMLElement;
    ogMoon.style.top = 45 + "%";
    const ocean_reflection = document.querySelector("#ocean") as HTMLElement
    let reflections = document.querySelectorAll(".to-be-reflected") as NodeListOf<HTMLElement>
    createReflections(reflections, ocean_reflection)
    
  })
</script>

<section id="intro-wrapper">
  <div id="sky">
    <img class="to-be-reflected" id="og-moon"
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
    background-image: radial-gradient(circle at 50% 50%, rgba(137, 43, 226, 0.397), rgba(6, 6, 109, 0.397), rgba(6, 6, 109, 0.185));
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

    background-color: rgb(0, 0, 0);
    background-image: radial-gradient(circle at 50% 50%, 
      rgba(180, 141, 216, 0.288), 
      rgba(0, 0, 54, 0.63));
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
