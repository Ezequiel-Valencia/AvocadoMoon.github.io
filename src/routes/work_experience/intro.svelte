<script lang="ts">
  import { gsap } from "gsap";
  import { onMount } from "svelte";
  import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
  export let loadingStatusManager;

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

    

    images[frameCount - 1].onload = async () => {
      loadingStatusManager.turnToLoaded();
      render()
      
    }


    function render() {
      context.canvas.width = images[0].width;
      context.canvas.height = images[0].height;

      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(images[galaxy.frame], 0, 0);
    }

    // Wait until all items are loaded in the DOM, then apply the anchor
    if (window.location.href.includes("#myExperience")){
      var url = location.href;
      url = url.replace("#myExperience", "#myExperience")
      location.href = url
    }

    

    

  });
</script>

<div>
  <canvas class="canvas" />
</div>

<style lang="scss">
  canvas {
    width: 100vw;
    height: 100vh;
    object-fit:fill;
    background-color: black;
  }

  
</style>
