<script lang="ts">
  import { gsap } from 'gsap';
  import { onMount } from 'svelte';
  import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
  import { percentLoaded } from './experiences';
  import ScrollDown from '../../common/scroll-down.svelte';

  const images: HTMLImageElement[] = [];

  onMount(() => {
    gsap.registerPlugin(ScrollTrigger);

    const canvas: any = document.querySelector('.canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const context = canvas.getContext('2d');
    const frameCount = 200;

    const currentFrame = (index: number) => `/work_experience/intro/${(index + 1).toString()}.webp`;

    let galaxy = { frame: 0 };

    // The store outlives the page, so start fresh on every visit
    percentLoaded.set(0);
    const frameSettled = () =>
      percentLoaded.update((percent) => Math.min(100, percent + (1 / frameCount) * 100));

    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.onload = frameSettled;
      // A missing frame shouldn't leave the page stuck behind the loading screen
      img.onerror = frameSettled;
      img.src = currentFrame(i);
      images.push(img);
    }

    const tween = gsap.to(galaxy, {
      frame: frameCount - 1,
      snap: 'frame',
      ease: 'none',
      scrollTrigger: {
        scrub: 0.5,
        pin: 'canvas',
        end: '500%',
      },
      onUpdate: render,
    });

    images[frameCount - 1].onload = () => {
      frameSettled();
      render();
    };

    function render() {
      if (!images[galaxy.frame]?.complete || !images[galaxy.frame].naturalWidth) return;
      context.canvas.width = images[0].width;
      context.canvas.height = images[0].height;

      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(images[galaxy.frame], 0, 0);
    }

    // Kill the tween and its pinned ScrollTrigger so it doesn't outlive the page
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  });
</script>

<section>
  <canvas class="canvas"></canvas>
  <ScrollDown></ScrollDown>
</section>

<style lang="scss">
  canvas {
    width: 100vw;
    height: 100vh;
    object-fit: fill;
    background-color: black;
  }
</style>
