'use client';

/**
 * MusicOptions — equivalent to src/routes/_menubar/musicOptions.svelte
 */

import React from 'react';
import { useAppState } from '@/hooks/useAppState';
import styles from './Popup.module.scss';
import optionStyles from './MusicOptions.module.scss';

export default function MusicOptions() {
  const { sfx, toggle_sfx, music, toggle_music } = useAppState();

  return (
    <div id="music-options" className={styles.menuPopup}>
      <h2 className={styles.menuLargeText}>Audio Options</h2>
      <p className={styles.menuMedText} style={{ margin: '5%' }}>
        If you can&apos;t hear this site&apos;s music here are some trouble shooting methods:
      </p>
      <ol className={styles.menuMedText} style={{ margin: '5%' }}>
        <li className={styles.menuMedText}>Turn on and off the audio.</li>
        <li className={styles.menuMedText}>
          Go to site settings in your browser, and enable autoplay.
        </li>
        <li className={styles.menuMedText}>Unmute the tab</li>
      </ol>
      <a
        target="_blank"
        rel="noreferrer"
        style={{ textAlign: 'center', margin: 'auto' }}
        className={styles.menuMedText}
        href="https://docs.google.com/document/d/e/2PACX-1vSkQh2B7KYF8omxPyYL0deWwESOxGK9V_uYcxOaFljqY3RCpwSB0rmU0HjWcz3p5RE5ShrXQv-5MjIQ/pub"
      >
        <p>Songs I Use</p>
      </a>
      <button
        id="sfx"
        className={`${styles.menuMedText} ${optionStyles.optionButton}`}
        onClick={toggle_sfx}
      >
        Turn SFX {sfx ? 'Off' : 'On'}
      </button>
      <button
        id="music"
        className={`${styles.menuMedText} ${optionStyles.optionButton}`}
        onClick={toggle_music}
      >
        Turn Music {music ? 'Off' : 'On'}
      </button>
    </div>
  );
}
