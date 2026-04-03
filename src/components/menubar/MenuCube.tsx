'use client';

/**
 * MenuCube — equivalent to src/routes/_menubar/cube.svelte
 * Small decorative 3-D cube shown in the menu bar buttons.
 */

import React from 'react';
import styles from './MenuCube.module.scss';
import './menu-cube.scss';

interface MenuCubeProps {
  cubeImage: string;
}

export default function MenuCube({ cubeImage }: MenuCubeProps) {
  return (
    <section className={styles.section}>
      <div className={styles.cube}>
        <div className={`${styles.bottom} ${styles.face}`} />
        <div className={`${styles.left} ${styles.face}`} />
        <div className={`${styles.right} ${styles.face}`} />
        <img className={`${styles.front} ${styles.face}`} src={cubeImage} alt="cube" />
        <div className={`${styles.back} ${styles.face}`} />
        <div className={`${styles.top} ${styles.face}`} />
      </div>
    </section>
  );
}
