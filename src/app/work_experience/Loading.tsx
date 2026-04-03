'use client';

/**
 * Loading — equivalent to src/routes/work_experience/loading.svelte
 * Loading screen with animated stars and a progress bar tied to percentLoaded.
 */

import React, { useEffect, useRef } from 'react';
import styles from './Loading.module.scss';

interface LoadingProps {
  percentLoaded: number;
}

// Generate stable star data once per render to avoid layout thrash
const STAR_COUNT = 40;

export default function Loading({ percentLoaded }: LoadingProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const stars = sectionRef.current?.querySelectorAll<HTMLElement>(
      `.${styles.star}`
    );
    stars?.forEach((star) => {
      star.style.top = `${Math.floor(Math.random() * 100)}%`;
      star.style.left = `${Math.floor(Math.random() * 100)}%`;
    });
  }, []);

  const percent = Math.floor(percentLoaded);

  return (
    <section
      ref={sectionRef}
      id="loading-section"
      className={styles['loading-section']}
      style={{ position: 'absolute', height: '100vh', width: '100vw' }}
    >
      {Array.from({ length: STAR_COUNT }, (_, i) => (
        <div
          key={i}
          className={styles.star}
          style={
            {
              '--fade-time': `${Math.max((i * Math.random()) % 5, 2 + Math.random())}s`,
            } as React.CSSProperties
          }
        />
      ))}
      <div style={{ textAlign: 'center', justifyContent: 'center', margin: 'auto' }}>
        <h1 style={{ textAlign: 'center', color: 'white' }}>
          Galaxy is loading, please wait.
        </h1>
        <div style={{ width: '25vw' }} id="progress-bar">
          <div
            id="progress-bar-filling"
            style={{
              width: `${percent}%`,
              backgroundColor: 'purple',
              color: 'white',
            }}
          >
            {percent}%
          </div>
        </div>
      </div>
    </section>
  );
}
