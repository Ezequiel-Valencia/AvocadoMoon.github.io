  /*
  Trying to create reactive elements using classes is to much of a pain.
  Svelte only seems to recognize top level abstraction elements, and does not bother with 
  reactivity of nested class objects
  */


import { SvelteComponent } from "svelte";
import { sfxController, musicController } from "../myLocalStorage";

const nRows = 4;
const nCols = 3;

let musicClipDir = "/Audio/Intro-Clips"

// Needs to be initalized with some form of variables or else compiler throws fit
export let channels: { coverImage: string; gifImage: string, currentImage: string, focused: boolean, hover: boolean, redirect: string, musicClip: string }[] = [
    {
        coverImage: '/Channel Covers/about me cover.png',
        gifImage: '/Channel Covers/about me cover.png',
        currentImage: '',
        focused: false,
        hover: false,
        redirect: '/about_me',
        musicClip: musicClipDir + '/About_Me_Intro.mp3'
    },
    {
        coverImage: "/Channel Covers/work experience.jpg",
        gifImage: "/Channel Covers/work experience.jpg",
        currentImage: '',
        focused: false,
        hover: false,
        redirect: '/work_experience',
        musicClip: musicClipDir + '/Work_Exp_Intro.mp3'
    },
    {
        coverImage: "/Channel Covers/Zine_Cover.png",
        gifImage: "Channel Covers/Zine_Cover.png",
        currentImage: '',
        focused: false,
        hover: false,
        redirect: "/zines",
        musicClip: musicClipDir + '/Zine_Intro.mp3'
    }
];
const channelPriorLength = channels.length

// Fill channels with default if still space
for (let index = 0; index < nRows * nCols; index++) {
    index < ((nRows * nCols) - channelPriorLength)
        ? channels.push({ coverImage: '/Channel Covers/no signal low con.gif', gifImage: '/Channel Covers/no signal low con.gif', currentImage: '', hover: false, focused: false, redirect: '', musicClip: '' })
        : null;
    channels[index].currentImage = channels[index].coverImage
};