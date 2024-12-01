import { safeLocalStorage, convertToBoolean } from "../../common/myLocalStorage";
import { writable } from "svelte/store";

export const transitionStates = {
  stillInDream: "stillInDream",
  transitionToProjects: "transitionToProjects",
  showPersonalProjects: "showPersonalProjects"
}

export function createTransitionControl() {
    const key = 'personalProjectsTransitionControl';
    safeLocalStorage?.setItem(key, transitionStates.stillInDream)
    const { subscribe, set, update } = writable(transitionStates.stillInDream)

    return {
        subscribe,
        read: () => {return safeLocalStorage.getItem(key);},
        updateToTransitioning: () => {update((string) => {safeLocalStorage?.setItem(key, transitionStates.transitionToProjects); return transitionStates.transitionToProjects})},
        updateToTransitioned: () => {update((string) => {safeLocalStorage?.setItem(key, transitionStates.showPersonalProjects); return transitionStates.showPersonalProjects})}
    }
}
