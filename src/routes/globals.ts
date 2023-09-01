import { writable } from "svelte/store";


function createSfxController(){
    const {subscribe, set, update} = writable(true);
    return {
        subscribe,
        allow_sfx: () => set(true),
        disable_sfx: () => set(false),
        toggle_sfx: () => update((bool) => !bool)
    }
}

function createMusicController(){
    const {subscribe, set, update} = writable(true);
    return {
        subscribe,
        allow_music: () => set(true),
        disable_music: () => set(false),
        toggle_music: () => update((bool) => !bool)
    }
}


export const musicController = createMusicController();
export const sfxController = createSfxController();

