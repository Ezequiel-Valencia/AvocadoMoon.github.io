'use client';

/**
 * ScrollDown — equivalent to src/common/scroll-down.svelte
 */

import React, { useEffect, useState } from 'react';
import styles from './ScrollDown.module.scss';

interface ScrollDownProps {
  text?: string;
}

export default function ScrollDown({ text = 'Scroll Down' }: ScrollDownProps) {
  const [scrolledDown, setScrolledDown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolledDown(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={`${styles.scrollDown} ${scrolledDown ? styles.hidden : ''}`}
      id="scrollDown"
    >
      {text}
      <span className={styles.arrow}>&#x2193;</span>
    </div>
  );
}
