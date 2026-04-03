'use client';

/**
 * ChannelCube — equivalent to src/routes/_channels/channel-cube.svelte
 * Renders a 3-D CSS cube that follows the mouse and spins when focused.
 */

import React, { useEffect, useRef, useState } from 'react';
import styles from './ChannelCube.module.scss';
import './channel-cube.scss';

interface ChannelCubeProps {
  description: string;
  frontImagePath: string;
  gifImagePath: string;
  focusedOn: boolean;
  cubeColor: string;
  cubeColorHover: string;
  id: number;
}

export default function ChannelCube({
  description,
  frontImagePath,
  gifImagePath,
  focusedOn,
  cubeColor,
  cubeColorHover,
  id,
}: ChannelCubeProps) {
  const cubeRef = useRef<HTMLDivElement>(null);
  const [, setHover] = useState(false);
  const [touchscreen, setTouchscreen] = useState(false);

  useEffect(() => {
    setTouchscreen('ontouchstart' in window);
  }, []);

  function followMouse(e: React.MouseEvent) {
    if (touchscreen || focusedOn || !cubeRef.current) return;
    const rect = cubeRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    cubeRef.current.style.transform = `rotate3d(${y * -1}, ${x}, 0, 20deg)`;
  }

  function resetMouse() {
    if (!cubeRef.current) return;
    if (!focusedOn) {
      cubeRef.current.style.transform = '';
    } else {
      setTimeout(() => {
        if (cubeRef.current) cubeRef.current.style.transform = '';
      }, 2000);
    }
  }

  const cubeClass = focusedOn
    ? `${styles.cube} ${styles.rotatingCube}`
    : `${styles.cube} ${styles.unfocusedCube}`;

  return (
    <section className={styles.section}>
      <div
        role="gridcell"
        tabIndex={0}
        ref={cubeRef}
        id={`cube-${id}`}
        className={cubeClass}
        style={
          {
            '--cube-color': cubeColor,
            '--cube-hover-color': cubeColorHover,
          } as React.CSSProperties
        }
        onMouseEnter={() => setHover(true)}
        onMouseMove={followMouse}
        onMouseLeave={() => {
          setHover(false);
          resetMouse();
        }}
      >
        <div className={`${styles.bottom} ${styles.face} ${styles.lowOpacity}`} />
        <div className={`${styles.left} ${styles.face} ${styles.lowOpacity}`} />
        <div className={`${styles.right} ${styles.face} ${styles.lowOpacity}`} />

        {/* Front face — image or video */}
        {focusedOn ? (
          gifImagePath.includes('.webm') ? (
            <video
              autoPlay
              loop
              muted
              playsInline
              src={gifImagePath}
              className={`${styles.front} ${styles.face} ${styles.channelImage} ${styles.movingImage}`}
            />
          ) : (
            <img
              className={`${styles.front} ${styles.face} ${styles.channelImage} ${styles.movingImage}`}
              src={gifImagePath}
              alt="cube"
            />
          )
        ) : (
          <img
            className={`${styles.front} ${styles.face} ${styles.channelImage}`}
            src={frontImagePath}
            alt="cube"
          />
        )}

        {/* Text overlay — only when not focused */}
        {!focusedOn && (
          <div style={{ opacity: 1 }} className={`${styles.front} ${styles.face}`}>
            <h1>{description}</h1>
          </div>
        )}

        <div className={`${styles.back} ${styles.face} ${styles.lowOpacity}`} />
        <div className={`${styles.top} ${styles.face} ${styles.lowOpacity}`} />
      </div>
    </section>
  );
}
