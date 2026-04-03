'use client';

/**
 * AppStateContext — provides the shared audio/visit state that was previously
 * held in Svelte stores (myLocalStorage.ts). Wraps the entire app so every
 * component can read/write without prop-drilling.
 */

import React, { createContext, useContext, ReactNode } from 'react';
import {
  useSfxController,
  useMusicController,
  useHasVisited,
  useMusicTime,
} from './useLocalStorage';

interface AppStateContextValue {
  sfx: boolean;
  allow_sfx: () => void;
  disable_sfx: () => void;
  toggle_sfx: () => void;

  music: boolean;
  allow_music: () => void;
  disable_music: () => void;
  toggle_music: () => void;

  hasVisited: boolean;
  markVisited: () => void;

  time: number;
  setAudioTagTime: (el: HTMLAudioElement | null) => void;
  resetMusicTime: () => void;
  updateTimeStamp: (el: HTMLAudioElement | null) => void;
}

const AppStateContext = createContext<AppStateContextValue | null>(null);

export function AppStateProvider({ children }: { children: ReactNode }) {
  const sfxCtrl = useSfxController();
  const musicCtrl = useMusicController();
  const visitCtrl = useHasVisited();
  const musicTime = useMusicTime();

  const value: AppStateContextValue = {
    sfx: sfxCtrl.sfx,
    allow_sfx: sfxCtrl.allow_sfx,
    disable_sfx: sfxCtrl.disable_sfx,
    toggle_sfx: sfxCtrl.toggle_sfx,

    music: musicCtrl.music,
    allow_music: musicCtrl.allow_music,
    disable_music: musicCtrl.disable_music,
    toggle_music: musicCtrl.toggle_music,

    hasVisited: visitCtrl.hasVisited,
    markVisited: visitCtrl.markVisited,

    time: musicTime.time,
    setAudioTagTime: musicTime.setAudioTagTime,
    resetMusicTime: musicTime.reset,
    updateTimeStamp: musicTime.updateTimeStamp,
  };

  return (
    <AppStateContext.Provider value={value}>
      {children}
    </AppStateContext.Provider>
  );
}

export function useAppState(): AppStateContextValue {
  const ctx = useContext(AppStateContext);
  if (!ctx) {
    throw new Error('useAppState must be used inside <AppStateProvider>');
  }
  return ctx;
}
