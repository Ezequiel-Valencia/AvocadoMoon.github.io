'use client';

/**
 * BlocksAnimated — equivalent to src/routes/_decals/blocks-animated.svelte
 * Animated floating square particles in the background.
 */

import React, { useEffect } from 'react';
import styles from './BlocksAnimated.module.scss';

export default function BlocksAnimated() {
  useEffect(() => {
    const circlesList = document.querySelector<HTMLElement>(`.${styles.circles}`);
    if (circlesList) {
      const pix = document.documentElement.scrollHeight * 0.8 * -1;
      circlesList.style.setProperty('--circle-height', `${pix}px`);
    }
  }, []);

  return (
    <div className={styles.area}>
      <ul className={styles.circles}>
        {Array.from({ length: 10 }).map((_, i) => (
          <li key={i} />
        ))}
      </ul>
    </div>
  );
}
