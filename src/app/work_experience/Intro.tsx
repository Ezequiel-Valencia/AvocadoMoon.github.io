'use client';

/**
 * Intro — equivalent to src/routes/work_experience/intro.svelte
 * GSAP ScrollTrigger canvas animation with 200-frame webp image sequence.
 * percentLoaded is lifted to the parent as a setter prop.
 */

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import ScrollDown from '@/components/common/ScrollDown';
import styles from './Intro.module.scss';

interface IntroProps {
  onFrameLoaded: () => void;
}

export default function Intro({ onFrameLoaded }: IntroProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const context = canvas.getContext('2d');
    if (!context) return;

    const frameCount = 200;
    const images: HTMLImageElement[] = [];

    const currentFrame = (index: number) =>
      `/work_experience/intro/${(index + 1).toString()}.webp`;

    const galaxy = { frame: 0 };

    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      img.onload = () => onFrameLoaded();
      images.push(img);
    }

    gsap.to(galaxy, {
      frame: frameCount - 1,
      snap: 'frame',
      ease: 'none',
      scrollTrigger: {
        scrub: 0.5,
        pin: canvas,
        end: '500%',
      },
      onUpdate: render,
    });

    images[frameCount - 1].onload = () => {
      onFrameLoaded();
      render();
    };

    function render() {
      if (!context || images.length === 0 || !images[0].width) return;
      context.canvas.width = images[0].width;
      context.canvas.height = images[0].height;
      context.clearRect(0, 0, canvas!.width, canvas!.height);
      context.drawImage(images[galaxy.frame], 0, 0);
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [onFrameLoaded]);

  return (
    <section>
      <canvas ref={canvasRef} className={styles.canvas} />
      <ScrollDown />
    </section>
  );
}
