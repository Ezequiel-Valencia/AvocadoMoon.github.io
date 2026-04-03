'use client';

/**
 * Particles — equivalent to src/routes/_decals/particles.svelte
 * The original uses SCSS @for loops with math.random() to generate per-particle keyframes
 * at build time. Here we replicate the same behaviour at runtime by injecting a <style>
 * tag with the generated keyframes and applying matching inline styles.
 */

import React, { useEffect, useRef } from 'react';
import styles from './Particles.module.scss';

const PARTICLE_COUNT = 200;
const BASE_SIZE = 20;

// Stable particle data generated once per component mount (not on every render)
function generateParticles() {
  return Array.from({ length: PARTICLE_COUNT }, (_, i) => {
    const circleSize = Math.floor(Math.random() * BASE_SIZE) + 1;
    const startPositionY = Math.floor(Math.random() * 10) + 100;
    const moveDuration = 48000 + Math.floor(Math.random() * 9000);
    const animDelay = Math.floor(Math.random() * 37000);
    const circleDelay = Math.floor(Math.random() * 4000);
    const fromX = Math.floor(Math.random() * 100);
    const toX = Math.floor(Math.random() * 100);
    const toY = startPositionY + 50 + Math.floor(Math.random() * 50);
    const frameName = `move-frames-${i}`;
    return { circleSize, startPositionY, moveDuration, animDelay, circleDelay, fromX, toX, toY, frameName };
  });
}

export default function Particles() {
  const styleRef = useRef<HTMLStyleElement | null>(null);
  const particlesRef = useRef(generateParticles());

  useEffect(() => {
    // Inject keyframes for each particle into the document head
    const css = particlesRef.current
      .map(({ frameName, fromX, startPositionY, toX, toY }) => `
        @keyframes ${frameName} {
          from { transform: translate3d(${fromX}vw, ${startPositionY}vh, 0); }
          to   { transform: translate3d(${toX}vw, -${toY}vh, 0); }
        }
      `)
      .join('\n');

    const style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);
    styleRef.current = style;

    return () => {
      if (styleRef.current) document.head.removeChild(styleRef.current);
    };
  }, []);

  return (
    <section className={styles.container}>
      {particlesRef.current.map((p, i) => (
        <div
          key={i}
          className={styles['circle-container']}
          style={{
            width: `${p.circleSize}px`,
            height: `${p.circleSize}px`,
            animationName: p.frameName,
            animationDuration: `${p.moveDuration}ms`,
            animationDelay: `${p.animDelay}ms`,
          }}
        >
          <div
            className={styles.circle}
            style={{ animationDelay: `${p.circleDelay}ms` }}
          />
        </div>
      ))}
    </section>
  );
}
