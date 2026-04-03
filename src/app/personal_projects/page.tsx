'use client';

/**
 * Personal Projects page — equivalent to src/routes/personal_projects/+page.svelte
 * Manages the transition state between Dream intro and Projects display.
 * The Svelte writable store (createTransitionControl) is replaced with useState.
 */

import React, { useState } from 'react';
import Menu from '@/components/common/Menu';
import Dream from './Dream';
import Projects from './Projects';
import styles from './page.module.scss';

const TRANSITION_STATES = {
  stillInDream: 'stillInDream',
  transitionToProjects: 'transitionToProjects',
  showPersonalProjects: 'showPersonalProjects',
} as const;

type TransitionState = (typeof TRANSITION_STATES)[keyof typeof TRANSITION_STATES];

export default function PersonalProjectsPage() {
  const [transitionState, setTransitionState] = useState<TransitionState>(
    TRANSITION_STATES.stillInDream
  );

  const handleTransitionToProjects = () => {
    setTransitionState(TRANSITION_STATES.transitionToProjects);
  };

  const handleSkip = () => {
    setTransitionState(TRANSITION_STATES.showPersonalProjects);
  };

  const handleTransitioned = () => {
    setTransitionState(TRANSITION_STATES.showPersonalProjects);
  };

  return (
    <div id="main-div" className={styles['main-div']}>
      <Menu
        songVolumeLevel={0.3}
        songPath="https://files.catbox.moe/way98y.mp3"
        songName="Zora's Domain - Day (Breath of the Wild)"
      />
      {transitionState === TRANSITION_STATES.stillInDream ? (
        <Dream
          onTransitionToProjects={handleTransitionToProjects}
          onSkip={handleSkip}
        />
      ) : (
        <Projects
          transitionState={transitionState}
          onTransitioned={handleTransitioned}
        />
      )}
    </div>
  );
}
