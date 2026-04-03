'use client';

import { useState, useCallback } from 'react';

// Safe accessor — returns null during SSR where localStorage is unavailable
export function safeLocalStorage(): Storage | null {
  if (typeof window !== 'undefined' && window.localStorage) {
    return window.localStorage;
  }
  return null;
}

export function isLocalStorageItemNull(key: string): boolean {
  return safeLocalStorage()?.getItem(key) === null;
}

export function convertToBoolean(input: string): boolean {
  try {
    return JSON.parse(input.toLowerCase());
  } catch {
    return true;
  }
}

// Generic localStorage-backed boolean hook
function useBooleanLocalStorage(key: string, defaultValue: boolean) {
  const getInitialValue = () => {
    const ls = safeLocalStorage();
    if (!ls) return defaultValue;
    const stored = ls.getItem(key);
    if (stored === null) {
      ls.setItem(key, String(defaultValue));
      return defaultValue;
    }
    return convertToBoolean(stored);
  };

  const [value, setValueState] = useState<boolean>(getInitialValue);

  const setValue = useCallback((next: boolean) => {
    safeLocalStorage()?.setItem(key, String(next));
    setValueState(next);
  }, [key]);

  const toggle = useCallback(() => {
    setValueState((prev) => {
      const next = !prev;
      safeLocalStorage()?.setItem(key, String(next));
      return next;
    });
  }, [key]);

  return { value, setValue, toggle };
}

// ── sfxController ──────────────────────────────────────────────────────────
export function useSfxController() {
  const { value, setValue, toggle } = useBooleanLocalStorage('sfxBool', false);
  return {
    sfx: value,
    allow_sfx: () => setValue(true),
    disable_sfx: () => setValue(false),
    toggle_sfx: toggle,
  };
}

// ── musicController ─────────────────────────────────────────────────────────
export function useMusicController() {
  const { value, setValue, toggle } = useBooleanLocalStorage('musicBool', false);
  return {
    music: value,
    allow_music: () => setValue(true),
    disable_music: () => setValue(false),
    toggle_music: toggle,
  };
}

// ── hasVisited ──────────────────────────────────────────────────────────────
export function useHasVisited() {
  const { value, setValue } = useBooleanLocalStorage('visitedSite', false);
  return {
    hasVisited: value,
    markVisited: () => setValue(true),
  };
}

// ── musicTime ───────────────────────────────────────────────────────────────
export function useMusicTime() {
  const key = 'songPlayBackTime';
  const ls = safeLocalStorage();
  const initial = Number(ls?.getItem(key) ?? 0);
  const [time, setTime] = useState<number>(initial);

  const setAudioTagTime = useCallback((audioEl: HTMLAudioElement | null) => {
    if (!audioEl) return;
    const stored = Number(safeLocalStorage()?.getItem(key) ?? 0);
    audioEl.currentTime = stored;
  }, []);

  const reset = useCallback(() => {
    safeLocalStorage()?.setItem(key, '0');
    setTime(0);
  }, []);

  const updateTimeStamp = useCallback((audioEl: HTMLAudioElement | null) => {
    if (!audioEl) return;
    const t = audioEl.currentTime;
    safeLocalStorage()?.setItem(key, String(t));
    setTime(t);
  }, []);

  return { time, setAudioTagTime, reset, updateTimeStamp };
}
