import { writable } from "svelte/store";
import { onMount } from "svelte";

// https://github.com/sveltejs/kit/issues/1650
// https://www.reddit.com/r/sveltejs/comments/p438og/how_to_access_localstorage_via_store_in_sveltekit/?rdt=60526

// Safe method version of local storage since it doesn't throw errors when doing SSR
const safeLocalStorage = globalThis.localStorage;
const checkLocalstorage = (key:string) => safeLocalStorage?.getItem(key) === null;

function convertToBoolean(input: string): boolean {
    try {
        return JSON.parse(input.toLowerCase());
    }
    catch (e) {
        return true;
    }
}

function createSfxController() {
    const key = 'sfxBool';
    if (checkLocalstorage(key)) { safeLocalStorage?.setItem(key, 'true') }
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

function createMusicController() {
    const key = 'musicBool';
    if (checkLocalstorage(key)) { safeLocalStorage?.setItem(key, 'true') }
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
    if (checkLocalstorage(key)) {safeLocalStorage?.setItem(key, '0')}
}


export const musicController = createMusicController();
export const sfxController = createSfxController();

