<script lang="ts">
  import { onMount } from "svelte";

  export let description;
  export let frontImagePath;
  export let gifImagePath;
  export let focusedOn;
  export let id;
  $: hover = false

  let cubeReference: HTMLElement
  onMount(() => {
    cubeReference = document.querySelector(`#cube-${id}`) as HTMLElement
  })

  function followMouse(e: MouseEvent){
    let rect = cubeReference.getBoundingClientRect()
    let x = (e.clientX - rect.left) - (rect.width / 2)
    let y = (e.clientY - rect.top) - (rect.height / 2)
    
    
    let rotateString = `rotate3d(${y * -1}, ${x}, 0, 20deg)`;
    cubeReference.style.transform = rotateString
  }
  function resetMouse(){
    cubeReference.style.transform = ""
  }

</script>



<section>
    <div role="gridcell" tabindex="0" on:mouseenter={(e) => {hover = true}}
      on:mousemove={(e) => {followMouse(e)}}
      on:mouseleave={() => {hover = false; resetMouse()}}
       id="cube-{id}"
       class="cube {focusedOn ? "rotating-cube" : "unfocused-cube"}">
        <div class="bottom face low-opacity"></div>
        <div class="left face low-opacity"></div>
        <div class="right face low-opacity"></div>
        {#if gifImagePath.includes(".webm")}
          {#if focusedOn}
            <img class="front face channel-image" src={frontImagePath} alt="cube">
          {:else}
            <video autoplay loop muted playsinline src={gifImagePath}
              class="front face channel-image">
            </video>
          {/if}
        {:else}
          <img class="front face channel-image" src={focusedOn ? frontImagePath : gifImagePath} alt="cube">
        {/if}
        {#if !focusedOn}
          <div style="opacity: 1;" class="front face"><h1>{description}</h1></div>
        {/if}
        <div class="back face low-opacity"></div>
        <div class="top face low-opacity"></div>
    </div>
</section>



<style lang="scss">
  
 @keyframes turn {
    from { transform: rotate3d(0, 0, 0, 0); }
    to { transform: rotate3d(0, 1, 0, 360deg); }
  }
  
  section {
    width: 100%;
    height: 100%;
    --channel-face-space-x: 11vmin;
    --channel-face-space-y: 11vmin;
    --channel-face-space-z: 11vmin;
    --face-color: skyblue;
  }

  section:hover{
    perspective: 1000px;
  }

  .cube {
    position: relative;
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
  }
  .cube:hover{
    transition: all 0.2s;
    --face-color: rgb(33, 185, 255);
  }

  .rotating-cube{
    animation: turn 5s linear infinite;
  }


  .face {
    width: 100%;
    height: 100%;
    // border: 2px solid black;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: Arial, sans-serif;
    font-size: 2rem;
    border-radius: 10px;
    transition: transform 1s;
  }

  .low-opacity{
    opacity: 0.8;
    background: var(--face-color);
  }

  .front {
    transform: translateZ(var(--channel-face-space-z));
  }

  .back {
    transform: translateZ(calc( -1 * var(--channel-face-space-z))) rotateY(180deg);
  }

  .left {
    transform: translateX(calc( -1 * var(--channel-face-space-x))) rotateY(-90deg);
  }

  .right {
    transform: translateX(var(--channel-face-space-x)) rotateY(90deg);
  }

  .top {
    transform: translateY(calc( -1 * var(--channel-face-space-y))) rotateX(90deg);
  }

  .bottom {
    transform: translateY(var(--channel-face-space-y)) rotateX(-90deg);
  }

  h1{
    font-family:'Times New Roman', Times, serif;
    font-size: 2vmin;
    word-wrap: break-word;
  }
  @media (max-width: 500px){
    h1{
      font-family:'Times New Roman', Times, serif;
      font-size: 5vmin;
      word-wrap: break-word;
      max-width: 20vw;
    }
    section{
      width: 100%;
      height: 100%;
      --channel-face-space-x: 16vmin;
      --channel-face-space-y: 16vmin;
      --channel-face-space-z: 16vmin;
      --face-color: skyblue;
    }
  }

  .channel-image {
    object-fit: inherit;
    height: 100%;
    width: 100%;
    // border-radius: 40px;
    text-align: center;
  }
</style>

