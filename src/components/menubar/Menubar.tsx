'use client';

/**
 * Menubar — equivalent to src/routes/_menubar/menubar.svelte
 * Fixed bottom bar showing the clock, audio button, and contact button.
 */

import React, { useEffect, useState } from 'react';
import { clickedOff } from '@/lib/globals';
import MusicOptions from './MusicOptions';
import ContactInfo from './ContactInfo';
import MenuCube from './MenuCube';
import styles from './Menubar.module.scss';

function dayToName(d: number): string {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return days[d] ?? '';
}

export default function Menubar() {
  const [time, setTime] = useState(new Date());
  const [musicOptions, setMusicOptions] = useState(false);
  const [contactInfo, setContactInfo] = useState(false);

  const hour = time.getHours();
  const min = time.getMinutes();
  const dayOrNight = hour >= 12 ? 'PM' : 'AM';
  const date = time.getDate();
  const month = time.getMonth() + 1;
  const day = dayToName(time.getDay());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    const handleClick = (event: MouseEvent) => {
      if (clickedOff('contact', event) && clickedOff('right-bar-button', event)) {
        setContactInfo(false);
      }
      if (clickedOff('left-bar-button', event) && clickedOff('music-options', event)) {
        setMusicOptions(false);
      }
    };

    document.addEventListener('click', handleClick);
    return () => {
      clearInterval(interval);
      document.removeEventListener('click', handleClick);
    };
  }, []);

  const displayHour = hour > 12 ? hour - 12 : hour;
  const displayMin = min > 9 ? String(min) : `0${min}`;

  return (
    <>
      <div id="menu-bar" className={styles.menuBar}>
        {/* Left — Audio button */}
        <div>
          <h4
            className={styles.text}
            style={{ position: 'absolute', left: '3%', bottom: '80%', fontSize: '1.8vmin' }}
          >
            | Audio |
          </h4>
          <button
            id="left-bar-button"
            className={`${styles.barButton} ${styles.leftBarButton}`}
            onClick={() => setMusicOptions((v) => !v)}
          >
            <MenuCube cubeImage="musical-note.png" />
          </button>
        </div>

        {/* Center — clock and description */}
        <div style={{ textAlign: 'center' }}>
          <div id="top-text" className={styles.topText}>
            <h3
              style={{ fontSize: '2.5vmin', transform: 'translateY(-100%)' }}
              className={styles.text}
            >
              Ezequiel Valencia
            </h3>
            <p
              style={{ fontSize: '1.8vmin', transform: 'translateY(-200%)' }}
              id="description"
              className={styles.text}
            >
              University of Connecticut Cybersecurity graduate, Bio-Informatics innovator,
            </p>
            <p
              style={{ fontSize: '1.8vmin', transform: 'translateY(-200%)' }}
              id="description"
              className={styles.text}
            >
              Dev-Ops specialist, and Full-Stack developer
            </p>
          </div>

          <div
            style={{
              textAlign: 'center',
              width: 'fit-content',
              transform: 'translateX(-50%)',
              left: '50%',
            }}
            id="bar-div"
            className={styles.barDiv}
          >
            <p style={{ textAlign: 'center' }} id="clock" className={styles.clock}>
              {displayHour}:{displayMin} {dayOrNight} | {day} {date}/{month}
            </p>
          </div>
        </div>

        {/* Right — Contact button */}
        <div>
          <h4
            className={styles.text}
            style={{ position: 'absolute', right: '3%', bottom: '80%', fontSize: '1.8vmin' }}
          >
            | Contact |
          </h4>
          <button
            id="right-bar-button"
            className={`${styles.barButton} ${styles.rightBarButton}`}
            onClick={() => setContactInfo((v) => !v)}
          >
            <MenuCube cubeImage="mail.png" />
          </button>
        </div>
      </div>

      {musicOptions && <MusicOptions />}
      {contactInfo && <ContactInfo />}
    </>
  );
}
