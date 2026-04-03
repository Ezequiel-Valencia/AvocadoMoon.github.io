'use client';

/**
 * Work Experience page — equivalent to src/routes/work_experience/+page.svelte
 * Orchestrates percentLoaded state across Intro (GSAP canvas), Loading screen,
 * and Experience list. percentLoaded was a Svelte writable store; here it is
 * plain React useState passed as props.
 */

import React, { useState, useEffect } from 'react';
import Menu from '@/components/common/Menu';
import Experience from './Experience';
import Intro from './Intro';
import Loading from './Loading';
import { experiencesSong } from './experiences';
import { useAppState } from '@/hooks/useAppState';
import styles from './page.module.scss';

const FRAME_COUNT = 200;
const INCREMENT = (1 / FRAME_COUNT) * 100;

export default function WorkExperiencePage() {
  const { music, setAudioTagTime } = useAppState();
  const [percentLoaded, setPercentLoaded] = useState(0);
  const [fromExperiencePage, setFromExperiencePage] = useState(false);

  useEffect(() => {
    if (window.location.href.includes('#myExperience')) {
      setFromExperiencePage(true);
    }
    if (music) {
      setAudioTagTime(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Called by Intro once per image that finishes loading
  const handleFrameLoaded = () => {
    setPercentLoaded((prev) => Math.min(prev + INCREMENT, 100));
  };

  const loaded = percentLoaded >= 100;

  return (
    <div
      id="main-div"
      className={styles['main-div']}
      style={{
        height: loaded || fromExperiencePage ? 'auto' : '100vh',
        overflow: loaded || fromExperiencePage ? 'visible' : 'hidden',
      }}
    >
      <Menu
        songVolumeLevel={0.5}
        songPath={experiencesSong}
        songName="Sabbath - Saya No Uta"
      />

      {!fromExperiencePage && (
        <div style={{ opacity: loaded ? 1 : 0 }}>
          <Intro onFrameLoaded={handleFrameLoaded} />
        </div>
      )}

      <Experience />

      {!loaded && !fromExperiencePage && (
        <Loading percentLoaded={percentLoaded} />
      )}
    </div>
  );
}
