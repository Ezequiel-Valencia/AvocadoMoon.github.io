'use client';

/**
 * Home page — equivalent to src/routes/+page.svelte
 * Houses the channel grid, menu bar, background decals, and first-visit overlay.
 */

import styles from './page.module.scss';
import Channels from '@/components/channels/Channels';
import Menubar from '@/components/menubar/Menubar';
import BlocksAnimated from '@/components/decals/BlocksAnimated';
import FirstVisit from '@/components/FirstVisit';
import { useAppState } from '@/hooks/useAppState';
import { useEffect, useRef } from 'react';

export default function HomePage() {
  const { sfx, music, hasVisited } = useAppState();

  // Refs for the two audio elements that channels.svelte expected to find by ID
  const hoverAudioRef = useRef<HTMLAudioElement>(null);
  const clickAudioRef = useRef<HTMLAudioElement>(null);
  const bgmRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (bgmRef.current) {
      bgmRef.current.volume = 0.2;
    }
  }, [music]);

  useEffect(() => {
    if (hoverAudioRef.current) {
      hoverAudioRef.current.volume = 0.1;
    }
  }, [sfx]);

  return (
    <div id="mainDiv" className={styles.mainDiv}>
      {/* SFX audio elements — only rendered when sfx is enabled */}
      {sfx && (
        <>
          <audio
            ref={hoverAudioRef}
            src="/Audio/hoverchannel.wav"
            id="channel-hover-audio"
          />
          <audio
            src="/Audio/hover.wav"
            id="channel-click-audio"
            ref={clickAudioRef}
          />
        </>
      )}

      {/* Background music */}
      {music && (
        <audio
          ref={bgmRef}
          src="/Audio/bgm.wav"
          id="bgm"
          autoPlay
          loop
        />
      )}

      <Channels />

      <Menubar />

      <BlocksAnimated />

      {!hasVisited && <FirstVisit />}
    </div>
  );
}
