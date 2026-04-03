'use client';

/**
 * Menu — equivalent to src/common/menu.svelte
 * Floating top menu with music player, main menu / return buttons, and contact info.
 * The Flowbite <Marquee> is replaced with a plain CSS marquee using overflow + animation.
 */

import React, { useEffect, useRef, useState } from 'react';
import { useAppState } from '@/hooks/useAppState';
import styles from './Menu.module.scss';
import './menu.scss';

interface MenuProps {
  songName: string;
  songPath?: string;
  songVolumeLevel?: number;
  /** Accepted for API compatibility but not rendered — matches the original menu.svelte behaviour */
  email?: string;
}

function formatAudioTime(t: number): string {
  if (Number.isNaN(t)) return '0:00';
  const mins = Math.floor(t / 60);
  const secs = Math.floor(t % 60);
  return `${mins}:${secs < 10 ? '0' + secs : secs}`;
}

export default function Menu({ songName, songPath = '', songVolumeLevel = 1 }: MenuProps) {
  const { music } = useAppState();

  const audioRef = useRef<HTMLAudioElement>(null);
  const [displayMenu, setDisplayMenu] = useState(false);
  const [paused, setPaused] = useState(!music);
  const [audioLength, setAudioLength] = useState(0);
  const [currentAudioTime, setCurrentAudioTime] = useState(0);

  // Sync play/pause state with the music setting
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = songVolumeLevel;
    if (music) {
      audio.play().catch(() => {/* autoplay blocked */});
      setPaused(false);
    } else {
      audio.pause();
      setPaused(true);
    }
  }, [music, songVolumeLevel]);

  // Wire time tracking
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onTimeUpdate = () => setCurrentAudioTime(audio.currentTime);
    const onDurationChange = () => setAudioLength(audio.duration);
    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('durationchange', onDurationChange);
    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('durationchange', onDurationChange);
    };
  }, []);

  // Respond to paused state changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (paused) {
      audio.pause();
    } else {
      audio.play().catch(() => {});
    }
  }, [paused]);

  return (
    <>
      {/* The audio element is always present but only plays based on state */}
      <audio
        ref={audioRef}
        id="bg-song"
        src={songPath}
        loop
        autoPlay={music}
      />

      {/* Collapsed button */}
      {!displayMenu && (
        <div>
          <nav>
            <button
              id="menu-nav"
              className={styles.menuNav}
              onClick={() => setDisplayMenu(true)}
            >
              Menu
            </button>
          </nav>
        </div>
      )}

      {/* Expanded menu */}
      {displayMenu && (
        <div id="home-menu-nav" className={styles.homeMenuNav}>
          {/* Music player */}
          <span
            className={styles.box}
            id="music-player"
            style={{
              width: 'fit-content',
              textAlign: 'center',
              marginLeft: 'auto',
              marginRight: 'auto',
              height: 'fit-content',
            }}
          >
            <h1 style={{ color: 'white', textAlign: 'center', padding: '5%', paddingBottom: 0 }}>
              Music:
            </h1>
            {/* Simple marquee replacement */}
            <div className={styles.marquee}>
              <span>{songName}</span>
            </div>

            <div id="music-nav" className={styles.musicNav}>
              {/* Play / pause */}
              {!paused ? (
                <span
                  id="play-button"
                  className={styles.musicButtons}
                  onClick={() => setPaused(true)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={() => {}}
                >
                  <i style={{ fontSize: 'x-large' }} className="fas fa-pause music-buttons" />
                </span>
              ) : (
                <span
                  id="play-button"
                  className={styles.musicButtons}
                  onClick={() => setPaused(false)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={() => {}}
                >
                  <i style={{ fontSize: 'x-large' }} className="fas fa-play music-buttons" />
                </span>
              )}

              {/* Seeker */}
              <span id="seeking">
                <span>
                  <input
                    id="seeker"
                    type="range"
                    min={1}
                    max={audioLength || 100}
                    value={currentAudioTime}
                    onChange={(e) => {
                      const t = Number(e.currentTarget.value);
                      setCurrentAudioTime(t);
                      if (audioRef.current) audioRef.current.currentTime = t;
                    }}
                  />
                </span>
                <span className={styles.text}>
                  {formatAudioTime(currentAudioTime)}/{formatAudioTime(audioLength)}
                </span>
              </span>
            </div>

            <hr className={styles.divider} />
          </span>

          {/* Navigation buttons */}
          <div style={{ textAlign: 'center' }} id="big-button-div" className={styles.bigButtonDiv}>
            <button onClick={() => { location.href = '/'; }}>Main Menu</button>
            <button onClick={() => setDisplayMenu(false)}>Return</button>
          </div>

          {/* Contact section */}
          <span id="contact-me" className={styles.contactMe}>
            <h1>Contact Me</h1>
            <p>
              Email:{' '}
              <a style={{ color: 'white' }} href="mailto:ezq.valencia@gmail.com">
                ezq.valencia@gmail.com
              </a>{' '}
              | Github:{' '}
              <a style={{ color: 'white' }} href="https://github.com/AvocadoMoon">
                AvocadoMoon
              </a>{' '}
              | Linkedin:{' '}
              <a
                style={{ color: 'white' }}
                href="https://www.linkedin.com/in/ezequielvalencia/"
              >
                Ezequiel Valencia
              </a>{' '}
              | Resume:{' '}
              <a
                style={{ color: 'white' }}
                href="https://docs.google.com/document/d/e/2PACX-1vQXG6xgS-gXDlE0v03SPC5k56cUHKYMERYuDSOsqoyo8cLsFWslB_Rmr0B_Het3GDX4m7YfRlge-lbo/pub"
              >
                Personal Resume
              </a>
            </p>
          </span>
        </div>
      )}
    </>
  );
}
