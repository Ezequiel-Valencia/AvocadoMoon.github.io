'use client';

/**
 * FirstVisit — equivalent to src/routes/first-visit.svelte
 * Shown on the user's first visit to collect audio preferences.
 */

import React, { useEffect, useState } from 'react';
import { useAppState } from '@/hooks/useAppState';
import { resumeURL } from '@/lib/globals';
import styles from './FirstVisit.module.scss';
import './first-visit.scss';

export default function FirstVisit() {
  const {
    allow_sfx,
    disable_sfx,
    allow_music,
    disable_music,
    music,
    markVisited,
  } = useAppState();

  const [showResumeBlock, setShowResumeBlock] = useState(false);
  const [finished, setFinished] = useState(false);
  const [selectedButton, setSelectedButton] = useState(-1);
  const [touchscreen, setTouchscreen] = useState(false);

  useEffect(() => {
    setTouchscreen('ontouchstart' in window);
  }, []);

  function handleAnimationEnd(e: React.AnimationEvent) {
    if (e.animationName.includes('fadeOut')) {
      markVisited();
    }
  }

  return (
    <section
      onAnimationEnd={handleAnimationEnd}
      className={finished ? styles.fadeOut : ''}
      style={{
        position: 'absolute',
        left: '0%',
        top: '0%',
        height: '100vh',
        width: '100vw',
      }}
    >
      <div className={styles.gradientBg}>
        <div className={styles.textGlass}>
          <h1 style={{ textAlign: 'center', marginTop: '10%', paddingTop: '2%' }}>
            Welcome to EzequielOS
          </h1>
          <i>
            <p>Before we continue please answer the following questions</p>
          </i>

          <hr />

          <div id="allowAudio" className={styles.textBox}>
            <h2>Allow Audio?</h2>
            {music && (
              <>
                <u>
                  <p>Even if audio is turned on, autoplay needs to be enabled in the browser.</p>
                </u>
                <br />
              </>
            )}
            <button
              className={selectedButton === 1 ? styles.selected : ''}
              onClick={() => {
                allow_sfx();
                allow_music();
                setShowResumeBlock(true);
                setSelectedButton(1);
              }}
            >
              Yes
            </button>
            <button
              className={selectedButton === 2 ? styles.selected : ''}
              onClick={() => {
                disable_sfx();
                disable_music();
                setShowResumeBlock(true);
                setSelectedButton(2);
              }}
            >
              No
            </button>
          </div>

          {showResumeBlock && (
            <>
              {touchscreen && (
                <h1
                  style={{
                    textAlign: 'center',
                    fontSize: 'large',
                    margin: 'auto',
                    color: 'red',
                  }}
                >
                  This website is best viewed on a computer. It will function, but certain features
                  will be unavailable.
                </h1>
              )}
              <div className={styles.textBox} id="view-resume">
                <h2>Resume</h2>
                <p>
                  For people who want to see everything I&apos;ve done in the quickest manner
                  possible.
                </p>
                <br />
                <br />
                <button onClick={() => window.open(resumeURL)}>Open Resume</button>
                <button onClick={() => setFinished(true)}>Continue</button>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
