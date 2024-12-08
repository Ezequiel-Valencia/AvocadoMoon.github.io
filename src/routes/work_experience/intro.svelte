<script lang="ts">
  import { gsap } from "gsap";
  import { onMount } from "svelte";
  import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
  import { percentLoaded } from "./experiences"

  const images: HTMLImageElement[] = [];

  onMount(() => {
    gsap.registerPlugin(ScrollTrigger);


    const canvas: any = document.querySelector(".canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const context = canvas.getContext("2d");
    const frameCount = 200;

    const currentFrame = (index: any) =>
      `/work_experience/intro/${(index + 1).toString()}.webp`;

    
    let galaxy = { frame: 0 };

    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      img.onload = () => percentLoaded.update(percent => percent + ((1 / frameCount) * 100))
      images.push(img);
    }

    gsap.to(galaxy, {
      frame: frameCount - 1,
      snap: "frame",
      ease: "none",
      scrollTrigger: {
        scrub: 0.5,
        pin: "canvas",
        end: "500%",
      },
      onUpdate: render,
    });

    

    images[frameCount - 1].onload = () => {
      percentLoaded.update(percent => percent + ((1 / frameCount) * 100))
      render()
    }


    function render() {
      context.canvas.width = images[0].width;
      context.canvas.height = images[0].height;

      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(images[galaxy.frame], 0, 0);
    }
    

  });
</script>

<section>
  <canvas class="canvas" />
</section>

<style lang="scss">
  canvas {
    width: 100vw;
    height: 100vh;
    object-fit:fill;
    background-color: black;
  }

  
</style>
