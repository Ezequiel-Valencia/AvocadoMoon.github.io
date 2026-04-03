'use client';

/**
 * Dream — equivalent to src/routes/personal_projects/dream.svelte
 * Interactive ocean/moon dream animation. Dragging the moon into its reflection
 * triggers the transition to the Projects view.
 *
 * transControl.updateToTransitioning() → setTransitionState('transitionToProjects')
 * transControl.updateToTransitioned()  → setTransitionState('showPersonalProjects')
 */

import React, { useEffect, useRef, useState } from 'react';
import {
  setStarPositions,
  createReflections,
  moveMoonAndGradient,
  checkAndPerformIfMoonIntersection,
  moveAndShowDragMe,
  setCircleTextStyle,
  dreamThoughts,
} from './dream';
import styles from './Dream.module.scss';

interface DreamProps {
  onTransitionToProjects: () => void;
  onSkip: () => void;
}

const DREAM_TEXT = 'End Dream? ';
const NUM_FISHES = 5;

export default function Dream({ onTransitionToProjects, onSkip }: DreamProps) {
  const [touchscreen, setTouchscreen] = useState(false);
  const [fishHoverIndex, setFishHoverIndex] = useState(-1);
  const holdingDownMoon = useRef(false);
  const inTransition = useRef(false);

  // Stable random starting index for dream thoughts
  const startDreamThoughtsIndex = useRef(
    Math.floor(Math.random() * (dreamThoughts.length - NUM_FISHES - 1))
  );

  useEffect(() => {
    if ('ontouchstart' in window) {
      setTouchscreen(true);
    }
  }, []);

  useEffect(() => {
    if (touchscreen) return;

    const ogMoon = document.querySelector<HTMLElement>('#og-moon');
    const sky = document.querySelector<HTMLElement>('#sky');
    const ocean_reflection = document.querySelector<HTMLElement>('#ocean');
    const drag_me_text = document.querySelector<HTMLElement>('#drag-me-text');
    const missing_piece = document.querySelector<HTMLElement>('#circle-missing');
    const intro_section = document.querySelector<HTMLElement>('#intro-wrapper');
    const invisibleMoon = document.querySelector<HTMLElement>('#invisible-moon');
    const dreamTextSpans = document.querySelectorAll<HTMLElement>('.circle-text');

    if (
      !ogMoon ||
      !sky ||
      !ocean_reflection ||
      !drag_me_text ||
      !missing_piece ||
      !intro_section ||
      !invisibleMoon
    )
      return;

    setStarPositions();
    createReflections(ocean_reflection);
    setCircleTextStyle(missing_piece, DREAM_TEXT, dreamTextSpans);

    const reflectedMoon = document.getElementsByClassName('reflected moon')[0] as HTMLElement;

    const handlePointerDown = () => {
      holdingDownMoon.current = true;
      drag_me_text.style.opacity = '0';
      invisibleMoon.style.opacity = '1';
      dreamTextSpans.forEach((e) => (e.style.opacity = '1'));
    };
    ogMoon.addEventListener('pointerdown', handlePointerDown);

    const handlePointerUp = () => {
      holdingDownMoon.current = false;
      if (!inTransition.current) {
        moveAndShowDragMe(ogMoon, drag_me_text);
        invisibleMoon.style.opacity = '0';
        dreamTextSpans.forEach((e) => (e.style.opacity = '0'));
      }
    };
    document.addEventListener('pointerup', handlePointerUp);

    const handleAnimationEnd = async () => {
      intro_section.style.maskImage = 'url(./personal_projects/dream-transition.gif)';
      intro_section.style.maskSize = 'cover';
      setTimeout(() => {
        onTransitionToProjects();
      }, 3000);
    };
    ogMoon.addEventListener('animationend', handleAnimationEnd);

    const handlePointerMove = (e: PointerEvent) => {
      if (holdingDownMoon.current && !inTransition.current && reflectedMoon) {
        moveMoonAndGradient(e, ogMoon, sky, reflectedMoon, ocean_reflection);
        const intersected = checkAndPerformIfMoonIntersection(
          ogMoon,
          reflectedMoon,
          invisibleMoon
        );
        if (intersected) inTransition.current = true;
      }
    };
    sky.addEventListener('pointermove', handlePointerMove);

    const handleResize = () =>
      setCircleTextStyle(missing_piece, DREAM_TEXT, dreamTextSpans);
    window.addEventListener('resize', handleResize);

    return () => {
      ogMoon.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('pointerup', handlePointerUp);
      ogMoon.removeEventListener('animationend', handleAnimationEnd);
      sky.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('resize', handleResize);
    };
  }, [touchscreen, onTransitionToProjects]);

  if (touchscreen) {
    return (
      <section id="intro-wrapper" className={styles['intro-wrapper']}>
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            backgroundImage: "url('/Backgrounds/stars.jpg')",
            width: '100vw',
            height: '100vh',
          }}
        >
          <div
            style={{
              opacity: 0.92,
              marginTop: '8vh',
              textAlign: 'center',
              marginLeft: 'auto',
              marginRight: 'auto',
              width: '80vw',
              height: '60vh',
              backgroundColor: 'white',
            }}
          >
            <h1 style={{ paddingTop: '2vh' }}>
              This channel features an intro that is only available on computers.
            </h1>
            <h3>You can skip that intro and view my personal projects.</h3>
            <button onClick={onSkip}>
              <u>
                <i>
                  <h3
                    style={{
                      fontFamily: "'Times New Roman', Times, serif",
                      fontSize: 'x-large',
                    }}
                  >
                    Skip Intro
                  </h3>
                </i>
              </u>
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="intro-wrapper" className={styles['intro-wrapper']}>
      <div id="sky" className={styles.sky}>
        <div id="circle-missing" className={styles['circle-missing']}>
          {DREAM_TEXT.split('').map((char, i) => (
            <span key={i} className={`${styles['circle-text']} circle-text`}>
              {char}
            </span>
          ))}
          <img
            src="./personal_projects/moon.svg"
            alt="invisible-moon"
            id="invisible-moon"
            className={styles['invisible-moon']}
          />
        </div>

        {Array.from({ length: NUM_FISHES }, (_, i) => (
          <figure
            key={i}
            className={`${styles['fish-slide']} fish-slide`}
            style={
              {
                '--l-val': `-${i * (Math.random() * 20) + i * 2}%`,
                left: 'var(--l-val)',
                position: 'absolute',
                top: `${i * 18}%`,
              } as React.CSSProperties
            }
            onPointerEnter={() => setFishHoverIndex(i)}
            onPointerLeave={() => setFishHoverIndex(-1)}
          >
            <img
              draggable={false}
              className={`${styles.fish} fish`}
              src={
                i % 2 === 0
                  ? './personal_projects/fish.svg'
                  : './personal_projects/fish-2.svg'
              }
              alt="fish"
              style={{ transform: i % 2 === 0 ? 'scale(-1, 1)' : undefined }}
            />
            {fishHoverIndex === i && (
              <figcaption
                className={styles['fish-caption']}
                style={{ opacity: 1, color: 'white' }}
              >
                Fish Idea: <br />
                {dreamThoughts[startDreamThoughtsIndex.current + i]}
              </figcaption>
            )}
          </figure>
        ))}

        <figure>
          <img
            className={`${styles['og-moon']} moon to-be-reflected og-moon`}
            id="og-moon"
            draggable={false}
            style={{
              height: '10vmin',
              color: 'white',
              zIndex: 5,
              position: 'absolute',
              top: '45%',
            }}
            src="./personal_projects/moon.svg"
            alt="Moon"
          />
          <figcaption
            id="drag-me-text"
            style={{
              left: '50%',
              top: '65%',
              zIndex: 10,
              color: 'white',
              position: 'absolute',
            }}
          >
            Drag Me
          </figcaption>
        </figure>

        {Array.from({ length: 30 }, (_, i) => (
          <div key={i} className={`${styles.star} to-be-reflected star`} />
        ))}
      </div>

      <div id="ocean" className={styles.ocean} />

      <div
        style={{
          position: 'absolute',
          bottom: '5%',
          right: '15%',
          textAlign: 'center',
          zIndex: 5,
        }}
      >
        <button
          onClick={onSkip}
          style={{
            backgroundColor: 'transparent',
            borderColor: 'white',
            borderRadius: '20%',
          }}
        >
          <u style={{ color: 'white' }}>
            <i>
              <h3
                style={{
                  color: 'white',
                  fontFamily: "'Times New Roman', Times, serif",
                  fontSize: 'x-large',
                }}
              >
                Skip Intro
              </h3>
            </i>
          </u>
        </button>
      </div>

      {/* Hidden div — ensures animation classes compile: remove-gradient reflected slide-in-moon slide-in-moon-reflected moon-to-sun */}
      <div
        style={{ opacity: 0 }}
        className={`${styles['remove-gradient']} reflected ${styles['slide-in-moon']} ${styles['slide-in-moon-reflected']}`}
      />
    </section>
  );
}
