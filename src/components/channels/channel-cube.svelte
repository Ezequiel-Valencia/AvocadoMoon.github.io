<script lang="ts">
  import { onMount } from 'svelte';

  interface Props {
    description: string;
    frontImagePath: string;
    gifImagePath: string;
    focusedOn: boolean;
    cubeColor: string;
    cubeColorHover: string;
    frontHasBackground: boolean;
  }

  let {
    description,
    frontImagePath,
    gifImagePath,
    focusedOn,
    cubeColor,
    cubeColorHover,
    frontHasBackground,
  }: Props = $props();

  let cube: HTMLElement;
  let touchscreen = false;
  let resetTimer: ReturnType<typeof setTimeout> | undefined;

  onMount(() => {
    touchscreen = 'ontouchstart' in window;
    return () => clearTimeout(resetTimer);
  });

  // Tilt the cube toward the cursor
  function followMouse(e: MouseEvent) {
    if (touchscreen || focusedOn) return;
    clearTimeout(resetTimer);
    const rect = cube.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    cube.style.transform = `rotate3d(${-y}, ${x}, 0, 20deg)`;
  }

  function resetTilt() {
    clearTimeout(resetTimer);
    // A selected cube is mid-animation, so let it settle before snapping back
    resetTimer = setTimeout(() => (cube.style.transform = ''), focusedOn ? 2000 : 0);
  }
</script>

<section>
  <div
    bind:this={cube}
    role="presentation"
    style="--cube-color: {cubeColor}; --cube-hover-color: {cubeColorHover};"
    onmousemove={followMouse}
    onmouseleave={resetTilt}
    class="cube {focusedOn ? 'rotating-cube' : 'unfocused-cube'}"
  >
    <div class="bottom face low-opacity"></div>
    <div class="left face low-opacity"></div>
    <div class="right face low-opacity"></div>

    {#if focusedOn}
      {#if gifImagePath.endsWith('.webm')}
        <video
          autoplay
          loop
          muted
          playsinline
          src={gifImagePath}
          class="front face channel-image moving-image {frontHasBackground ? 'low-opacity' : ''}"
        >
        </video>
      {:else}
        <img
          class="front face channel-image moving-image {frontHasBackground ? 'low-opacity' : ''}"
          src={gifImagePath}
          alt=""
        />
      {/if}
    {:else}
      <img
        class="front face channel-image {frontHasBackground ? 'low-opacity' : ''}"
        src={frontImagePath}
        alt=""
      />
      <!-- Channel name on top of the cover image -->
      <div class="front face"><h2>{description}</h2></div>
    {/if}

    <div class="back face low-opacity"></div>
    <div class="top face low-opacity"></div>
  </div>
</section>

<style lang="scss">
  @keyframes turn {
    from {
      transform: rotate3d(0, 0, 0, 0);
    }
    to {
      transform: rotate3d(0, 1, 0, 360deg);
    }
  }

  @keyframes backToZero {
    to {
      transform: rotate3d(0, 0, 0, 0deg);
    }
  }

  @keyframes fullOpacity {
    from {
      opacity: 0;
    }
    to {
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

  section:hover {
    perspective: 1000px;
  }

  .cube {
    transition: all 0.2s;
    position: relative;
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    transform: rotate3d(
      0,
      0,
      0,
      0deg
    ); // https://stackoverflow.com/questions/11043080/unpredictably-sluggish-performance-stalls-on-3d-css-animations-webkit-transform
    --face-color: var(--cube-color);
  }
  .cube:hover {
    transition: all 0.2s;
    --face-color: var(--cube-hover-color);
  }

  .rotating-cube {
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

  .moving-image {
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

  .low-opacity {
    opacity: 0.8;
    background: var(--face-color);
  }

  .front {
    transform: translateZ(var(--channel-face-space-z));
  }

  .back {
    transform: translateZ(calc(-1 * var(--channel-face-space-z))) rotateY(180deg);
  }

  .left {
    transform: translateX(calc(-1 * var(--channel-face-space-x))) rotateY(-90deg);
  }

  .right {
    transform: translateX(var(--channel-face-space-x)) rotateY(90deg);
  }

  .top {
    transform: translateY(calc(-1 * var(--channel-face-space-y))) rotateX(90deg);
  }

  .bottom {
    transform: translateY(var(--channel-face-space-y)) rotateX(-90deg);
  }

  h2 {
    margin: 0;
    font-weight: bold;
    font-family: 'Times New Roman', Times, serif;
    font-size: 2.5vmin;
    word-wrap: break-word;
    color: white;
  }
  @media (max-width: 500px) {
    h2 {
      font-family: 'Times New Roman', Times, serif;
      font-size: 5.5vmin;
      // Hyphenate long names like "Steganography" instead of splitting them anywhere
      overflow-wrap: normal;
      hyphens: auto;
      max-width: 90%;
    }
    section {
      width: 100%;
      height: 100%;
      --channel-face-space-x: 20vmin;
      --channel-face-space-y: 20vmin;
      --channel-face-space-z: 20vmin;
      --face-color: skyblue;
    }

    .rotating-cube {
      animation: turn 5s linear infinite;
      --channel-face-space-x: 30vmin;
      --channel-face-space-y: 30vmin;
      --channel-face-space-z: 30vmin;
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
