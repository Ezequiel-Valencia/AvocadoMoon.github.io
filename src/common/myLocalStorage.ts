import { writable } from "svelte/store";

// https://github.com/sveltejs/kit/issues/1650
// https://www.reddit.com/r/sveltejs/comments/p438og/how_to_access_localstorage_via_store_in_sveltekit/?rdt=60526

// Safe method version of local storage since it doesn't throw errors when doing SSR
const _ls = globalThis.localStorage;
export const safeLocalStorage = (_ls && typeof _ls.getItem === 'function') ? _ls : undefined;
export const isLocalStorageItemNull = (key:string) => safeLocalStorage?.getItem(key) === null;

export function convertToBoolean(input: string): boolean {
    try {
        return JSON.parse(input.toLowerCase());
    }
    catch (e) {
        return true;
    }
}

function createBooleanStore(key: string, defaultValue = false) {
    if (isLocalStorageItemNull(key)) { safeLocalStorage?.setItem(key, String(defaultValue)) }
    const stored = safeLocalStorage?.getItem(key) ?? null;
    const initial = stored !== null ? convertToBoolean(stored) : defaultValue;
    const { subscribe, set, update } = writable(initial);

    return {
        subscribe,
        enable:  () => { set(true);  safeLocalStorage?.setItem(key, 'true') },
        disable: () => { set(false); safeLocalStorage?.setItem(key, 'false') },
        toggle:  () => update((v) => { safeLocalStorage?.setItem(key, String(!v)); return !v }),
    };
}

function musicPlaybackTime(){
    const key = 'songPlayBackTime';
    if (isLocalStorageItemNull(key)) {safeLocalStorage?.setItem(key, '0')}
    const songTimeStamp = Number(safeLocalStorage?.getItem(key))
    const {subscribe, set, update} = writable(songTimeStamp);

    return {
        subscribe,
        setAudioTagTime: () => {
            let audio = document.getElementById("bg-song") as HTMLAudioElement;
            subscribe((num) => {audio.currentTime = num})
     },
        reset: () => {set(0); safeLocalStorage?.setItem(key, '0')},
        updateTimeStamp: () => {
            let audio = document.getElementById("bg-song") as HTMLAudioElement;
            set(audio.currentTime); 
            safeLocalStorage?.setItem(key, String(audio.currentTime))
        }
    }
}

export const hasVisited      = createBooleanStore('visitedSite');
export const musicController = createBooleanStore('musicBool');
export const sfxController   = createBooleanStore('sfxBool');
export const musicTime = musicPlaybackTime();

