'use client';

/**
 * Channels — equivalent to src/routes/_channels/channels.svelte
 * Renders the channel grid and manages audio / navigation behaviour.
 */

import React, { useEffect, useRef, useState } from 'react';
import { channels } from './channelObject';
import { ChannelFunctions } from './channelFunctions';
import ChannelCube from './ChannelCube';
import { useAppState } from '@/hooks/useAppState';
import styles from './Channels.module.scss';

const channelFunctions = new ChannelFunctions();

export default function Channels() {
  const { sfx, music, resetMusicTime } = useAppState();

  const [focusedChannel, setFocusedChannel] = useState(-1);
  const [windowWidth, setWindowWidth] = useState(1000);

  // Refs to audio elements expected to exist in the DOM
  const songRefs = useRef<(HTMLAudioElement | null)[]>([]);
  const bgmRef = useRef<HTMLAudioElement | null>(null);
  const hoverAudioRef = useRef<HTMLAudioElement | null>(null);
  const clickAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Slow down any video on the page
    const video = document.querySelector('video');
    if (video) video.playbackRate = 0.5;

    // Collect song element refs
    songRefs.current = channels.map((_, i) =>
      document.getElementById(`music-clip-${i}`) as HTMLAudioElement | null,
    );

    getAudioElements();
    setWindowWidth(window.innerWidth);

    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);

    // Play background music
    bgmRef.current?.play();

    // Reset music playback time on mount
    resetMusicTime();

    return () => window.removeEventListener('resize', handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function getAudioElements() {
    bgmRef.current = document.getElementById('bgm') as HTMLAudioElement | null;
    hoverAudioRef.current = document.getElementById(
      'channel-hover-audio',
    ) as HTMLAudioElement | null;
    clickAudioRef.current = document.getElementById(
      'channel-click-audio',
    ) as HTMLAudioElement | null;
  }

  function focus(index: number, zIndex: string) {
    const node = document.getElementById(`channelBox-${index}`);
    if (node) node.style.zIndex = zIndex;
    const menuNode = document.getElementById('menu-bar') as HTMLElement | null;
    if (menuNode) menuNode.style.zIndex = '-20';
  }

  function moveChannelToCenter(channelIndex: number) {
    const box = document.getElementById(
      `channelBox-${channelIndex}`,
    ) as HTMLElement | null;
    if (!box) return;
    const boxRect = box.getBoundingClientRect();
    const centerX = window.innerWidth / 2 + boxRect.width / 4;
    const centerY = window.innerHeight / 2 + boxRect.height / 4;
    const boxCenterX = boxRect.left + boxRect.width;
    const boxCenterY = boxRect.top + boxRect.height;
    const deltaX = centerX - boxCenterX;
    const deltaY = centerY - boxCenterY;
    box.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
  }

  function resetChannelPosition(channelIndex: number) {
    const box = document.getElementById(
      `channelBox-${channelIndex}`,
    ) as HTMLElement | null;
    if (box) box.style.transform = '';
  }

  return (
    <section id="grid-container" className={styles.gridContainer}>
      {channels.map((currentChannel, index) => (
        <React.Fragment key={index}>
          <div
            onMouseDown={() => {
              if (
                !currentChannel.focused &&
                music &&
                currentChannel.redirect !== '' &&
                focusedChannel !== index
              ) {
                getAudioElements();
                if (bgmRef.current && songRefs.current[index]) {
                  channelFunctions.playMusic(
                    index,
                    bgmRef.current,
                    songRefs.current[index]!,
                    false,
                  );
                }
              }
              if (currentChannel.redirect !== '' && focusedChannel !== index) {
                setFocusedChannel(index);
                moveChannelToCenter(index);
              }
            }}
            onMouseEnter={() => {
              if (sfx) {
                getAudioElements();
                hoverAudioRef.current?.play();
              }
            }}
            role="tab"
            aria-controls={`tabpanel-${index}`}
            tabIndex={index}
            className={styles.channelContainer}
          >
            {/* Image Div */}
            {currentChannel.redirect !== '' ? (
              <div
                className={
                  focusedChannel === index
                    ? styles.bigChannelContainer
                    : styles.channelBox
                }
                id={`channelBox-${index}`}
                onAnimationStart={() => focus(index, '50')}
                onAnimationEnd={() => focus(index, '1')}
              >
                <ChannelCube
                  cubeColor={currentChannel.cubeColor}
                  cubeColorHover={currentChannel.cubeHoverColor}
                  id={index}
                  focusedOn={focusedChannel === index}
                  gifImagePath={currentChannel.gifImage}
                  frontImagePath={currentChannel.coverImage}
                  description={currentChannel.channelName}
                />
              </div>
            ) : windowWidth > 600 ? (
              <div
                className={`${styles.channelBox} ${styles.glass}`}
                id={`channelBox-${index}`}
              />
            ) : null}

            {/* Button section — shown when a channel is focused */}
            {focusedChannel === index && (
              <div className={styles.channelBar}>
                <h2>Continue to {currentChannel.channelName} Channel?</h2>
                <button
                  onClick={() => {
                    setFocusedChannel(-1);
                    resetChannelPosition(index);
                    if (sfx) clickAudioRef.current?.play();
                    if (music && bgmRef.current && songRefs.current[index]) {
                      channelFunctions.playMusic(
                        index,
                        bgmRef.current,
                        songRefs.current[index]!,
                        true,
                      );
                    }
                  }}
                  className={`${styles.menuButton} ${styles.channelButtons} ${styles.futureButton}`}
                  id={`mbutton-${index}`}
                >
                  Back
                </button>
                <button
                  onClick={() => {
                    if (sfx) clickAudioRef.current?.play();
                    if (music) songRefs.current[index]?.pause();
                    channelFunctions.redirect(index);
                  }}
                  className={`${styles.playButton} ${styles.channelButtons} ${styles.futureButton}`}
                  id={`pbutton-${index}`}
                >
                  Continue
                </button>
              </div>
            )}
          </div>

          {/* Blurred background overlay when any channel is focused */}
          {focusedChannel !== -1 && (
            <div
              style={{
                height: '100vh',
                width: '100vw',
                position: 'absolute',
                backgroundColor: 'rgba(255, 255, 255, 0.111)',
                backdropFilter: 'blur(2px)',
                top: 0,
                left: 0,
              }}
            />
          )}

          {/* Per-channel audio clip */}
          <audio
            src={currentChannel.musicClip}
            id={`music-clip-${index}`}
          />
        </React.Fragment>
      ))}
    </section>
  );
}
