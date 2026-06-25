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
    const { subscribe, set } = writable(transitionStates.stillInDream)

    return {
        subscribe,
        read: () => safeLocalStorage?.getItem(key),
        updateToTransitioning: () => { safeLocalStorage?.setItem(key, transitionStates.transitionToProjects); set(transitionStates.transitionToProjects) },
        updateToTransitioned: () => { safeLocalStorage?.setItem(key, transitionStates.showPersonalProjects); set(transitionStates.showPersonalProjects) }
    }
}
