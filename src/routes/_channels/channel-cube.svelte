<script lang="ts">
  import { onMount } from "svelte";

  export let description;
  export let frontImagePath;
  export let gifImagePath;
  export let focusedOn: boolean;
  export let cubeColor: string;
  export let cubeColorHover: string;
  export let id;
  $: hover = false
  let touchscreen = false

  let cubeReference: HTMLElement
  onMount(() => {
    cubeReference = document.querySelector(`#cube-${id}`) as HTMLElement
    if (('ontouchstart' in window)){
        touchscreen = true
    }
  })

  function followMouse(e: MouseEvent){
    if (!touchscreen && !focusedOn){
      let rect = cubeReference.getBoundingClientRect()
      let x = (e.clientX - rect.left) - (rect.width / 2)
      let y = (e.clientY - rect.top) - (rect.height / 2)
      
      
      let rotateString = `rotate3d(${y * -1}, ${x}, 0, 20deg)`;
      cubeReference.style.transform = rotateString
    }
  }
  async function resetMouse(){
    let transformBack = () => {cubeReference.style.transform = ''}
    let delayedTransform = () => {
      setTimeout(transformBack, 2000)
    }
    if (!focusedOn){
      transformBack()
    } else{
      await delayedTransform()
    }
  }
  

</script>



<section>
    <div role="gridcell" tabindex="0" on:mouseenter={(e) => {hover = true}}
      style="--cube-color: {cubeColor}; --cube-hover-color: {cubeColorHover};"
      on:mousemove={(e) => {followMouse(e)}}
      on:mouseleave={() => {hover = false; resetMouse()}}
      on:animationend={(e) => {}}
       id="cube-{id}"
       class="cube {focusedOn ? "rotating-cube" : "unfocused-cube"}">
        <div class="bottom face low-opacity"></div>
        <div class="left face low-opacity"></div>
        <div class="right face low-opacity"></div>

        <!-- Images -->
        {#if focusedOn}
          {#if gifImagePath.includes(".webm")}
            <video autoplay loop muted playsinline src={gifImagePath}
              class="front face channel-image moving-image">
            </video>
          {:else}
            <img class="front face channel-image moving-image" src={gifImagePath} alt="cube">
          {/if}

        <!-- Not focused on -->
        {:else}
          <img class="front face channel-image" src={frontImagePath} alt="cube">
        {/if}

        <!-- Text on top of Image -->
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

  @keyframes backToZero {
    to {
      transform: rotate3d(0, 0, 0, 0deg);
    }
  }

  @keyframes fullOpacity {
    from{
      opacity: 0;
    }
    to{
      opacity: 1;
    }
  }

  section {
    width: 100%;
    height: 100%;
    --channel-face-space-x: 11vmin;
    --channel-face-space-y: 11vmin;
    --channel-face-space-z: 11vmin;
  }

  section:hover{
    perspective: 1000px;
  }

  .cube {
    transition: all 0.2s;
    position: relative;
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    transform: rotate3d(0, 0, 0, 0deg); // https://stackoverflow.com/questions/11043080/unpredictably-sluggish-performance-stalls-on-3d-css-animations-webkit-transform
    --face-color: var(--cube-color);
  }
  .cube:hover{
    transition: all 0.2s;
    --face-color: var(--cube-hover-color);
  }

  .rotating-cube{
    transition: all 0.2s;
    animation-name: backToZero, turn;
    animation-duration: 0.3s, 5s;
    animation-timing-function: ease-in, ease-in-out;
    animation-iteration-count: 1, infinite;
    animation-fill-mode: forwards, forwards;
    animation-delay: 0.5s, 1s;
    --channel-face-space-x: 16vmin;
    --channel-face-space-y: 16vmin;
    --channel-face-space-z: 16vmin;
  }

  .moving-image{
    animation: fullOpacity 1s ease-in;
    animation-fill-mode: forwards;
    opacity: 1;
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
    font-size: 2.5vmin;
    word-wrap: break-word;
    color: white;
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

    .rotating-cube{
      animation: turn 5s linear infinite;
      --channel-face-space-x: 25vmin;
      --channel-face-space-y: 25vmin;
      --channel-face-space-z: 25vmin;
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

