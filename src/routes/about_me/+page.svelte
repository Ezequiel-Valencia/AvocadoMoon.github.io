<script lang="ts">
  import Me from "./me.svelte";
  import Hobbies from "./hobbies.svelte";
  import Menu from "../../common/menu.svelte";
  import { onMount } from "svelte";

  let touchscreen = false
  onMount(() => {
    const interBubble = document.querySelector<HTMLDivElement>('.interactive')!;
    let curX = 0;
    let curY = 0;
    let tgX = 0;
    let tgY = 0;

    if (('ontouchstart' in window)){
        touchscreen = true
    }

    function move() {
        curX += (tgX - curX) / 20;
        curY += (tgY - curY) / 20;
        interBubble.style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`;
        requestAnimationFrame(() => {
            move();
        });
    }

    document.addEventListener('mousemove', (event) => {
        tgX = event.pageX;
        tgY = event.pageY;
    });

    move();
});
</script>

<section id="main-div">
  <svg xmlns="http://www.w3.org/2000/svg">
    <defs>
      <filter id="goo">
        <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
        <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8" result="goo" />
        <feBlend in="SourceGraphic" in2="goo" />
      </filter>
    </defs>
  </svg>
  
  <div class="gradients-container">
    <div class="g3"></div>
    <div class="g4"></div>
    <div class="g5"></div>
    {#if !touchscreen}
      <div class="interactive"></div>
    {/if}
  </div>
    
  <Menu songVolumeLevel=.4 songPath="https://files.catbox.moe/ll8iaa.mp3" songName="Samurai Champloo Aruarian Dance"/>
  <Me />
  <Hobbies />

</section>



<!-- https://www.youtube.com/watch?v=vJNVramny9k -->
<!-- Squircle is a lot easier so that for now -->

<style lang="scss">
  @import "./circles.scss";
  #main-div {
    position: absolute;
    left: 0%;
    top: 0%;
    width: 100vw;
    overflow-x: hidden;
    // overflow: hidden;

    background-size: 300%;
    --gradient: linear-gradient(
       #339996, #329962, #12693b
    );
    background-image: var(--gradient);
  }

</style>
