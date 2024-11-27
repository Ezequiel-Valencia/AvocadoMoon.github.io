import { writable } from "svelte/store";
import { onMount } from "svelte";

// https://github.com/sveltejs/kit/issues/1650
// https://www.reddit.com/r/sveltejs/comments/p438og/how_to_access_localstorage_via_store_in_sveltekit/?rdt=60526

// Safe method version of local storage since it doesn't throw errors when doing SSR
export const safeLocalStorage = globalThis.localStorage;
export const isLocalStorageItemNull = (key:string) => safeLocalStorage?.getItem(key) === null;

export function convertToBoolean(input: string): boolean {
    try {
        return JSON.parse(input.toLowerCase());
    }
    catch (e) {
        return true;
    }
}

function createSfxController() {
    const key = 'sfxBool';
    if (isLocalStorageItemNull(key)) { safeLocalStorage?.setItem(key, 'false') }
    const bool = convertToBoolean(safeLocalStorage?.getItem(key) as string);
    const { subscribe, set, update } = writable(bool)

    // subscribe(val => localStorage.setItem("musicStore", val.toString()))
    return {
        subscribe,
        allow_sfx: () => { set(true); safeLocalStorage?.setItem(key, 'true') },
        disable_sfx: () => { set(false); safeLocalStorage?.setItem(key, 'false') },
        toggle_sfx: () => update((bool) => { safeLocalStorage?.setItem(key, String(!bool)); return !bool })
    }
}

function firstTimeVisit(){
    const key = 'visitedSite';
    if (isLocalStorageItemNull(key)) { safeLocalStorage?.setItem(key, 'false') }
    const bool = convertToBoolean(safeLocalStorage?.getItem(key) as string);
    const { subscribe, set, update } = writable(bool)

    return {
        subscribe,
        hasVisited: () => {set(true); safeLocalStorage?.setItem(key, 'true')}
    }
}

function createMusicController() {
    const key = 'musicBool';
    if (isLocalStorageItemNull(key)) { safeLocalStorage?.setItem(key, 'false') }
    const bool = convertToBoolean(safeLocalStorage?.getItem(key) as string);
    const { subscribe, set, update } = writable(bool)

    // subscribe(val => localStorage.setItem("musicStore", val.toString()))
    return {
        subscribe,
        allow_music: () => { set(true); safeLocalStorage?.setItem(key, 'true') },
        disable_music: () => { set(false); safeLocalStorage?.setItem(key, 'false') },
        toggle_music: () => update((bool) => { safeLocalStorage?.setItem(key, String(!bool)); return !bool })
    }
}

function musicPlaybackTime(){
    const key = 'songPlayBackTime';
    if (isLocalStorageItemNull(key)) {safeLocalStorage?.setItem(key, '0')}
    const songTimeStamp = Number(safeLocalStorage?.getItem(key))
    const {subscribe, set, update} = writable(songTimeStamp);

    return {
        subscribe,
        setAudioTagTime: () => {
            let audio = document.getElementById("song") as HTMLAudioElement;
            subscribe((num) => {audio.currentTime = num})
     },
        reset: () => {set(0); safeLocalStorage?.setItem(key, '0')},
        updateTimeStamp: () => {
            let audio = document.getElementById("song") as HTMLAudioElement;
            set(audio.currentTime); 
            safeLocalStorage?.setItem(key, String(audio.currentTime))
        }
    }
}

export const hasVisited = firstTimeVisit()
export const musicController = createMusicController();
export const sfxController = createSfxController();
export const musicTime = musicPlaybackTime();

