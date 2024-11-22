  /*
  Trying to create reactive elements using classes is to much of a pain.
  Svelte only seems to recognize top level abstraction elements, and does not bother with 
  reactivity of nested class objects
  */


import { SvelteComponent } from "svelte";
import { sfxController, musicController } from "../common/myLocalStorage";

const nRows = 4;
const nCols = 3;


// Needs to be initalized with some form of variables or else compiler throws fit
export let channels: { coverImage: string; 
    gifImage: string, currentImage: string, 
    focused: boolean, hover: boolean, redirect: string, 
    musicClip: string,
    volumeLevel: number }[] = [
    {
        coverImage: '/Channel Covers/about me cover.webp',
        gifImage: '/Channel Covers/about me cover.webp',
        currentImage: '',
        focused: false,
        hover: false,
        redirect: '/about_me',
        musicClip: 'https://files.catbox.moe/fw5j3q.mp3',
        volumeLevel: .4
    },
    {
        coverImage: "/Channel Covers/Work_Exp.webm",
        gifImage: "/Channel Covers/Work_Exp.webm",
        currentImage: '',
        focused: false,
        hover: false,
        redirect: '/work_experience',
        musicClip: 'https://files.catbox.moe/o9ja1i.mp3',
        volumeLevel: .5
    },
    {
        coverImage: "/Channel Covers/Zine_Cover.webp",
        gifImage: "Channel Covers/Zine_Cover.webp",
        currentImage: '',
        focused: false,
        hover: false,
        redirect: "/zines",
        musicClip: 'https://files.catbox.moe/tlb833.mp3',
        volumeLevel: .2
    },
    {
        coverImage: "/Channel Covers/personal_projects.jpg",
        gifImage: "Channel Covers/personal_projects.jpg",
        currentImage: '',
        focused: false,
        hover: false,
        redirect: "/personal_projects",
        musicClip: 'https://files.catbox.moe/b63jos.mp3',
        volumeLevel: .3
    },
    {
        coverImage: "/Channel Covers/open book.png",
        gifImage: "Channel Covers/open book.png",
        currentImage: '',
        focused: false,
        hover: false,
        redirect: "/education",
        musicClip: 'https://files.catbox.moe/bb5qbv.mp3',
        volumeLevel: .3
    },
    {
        coverImage: "/Channel Covers/zekeanimsmall.gif",
        gifImage: "Channel Covers/zekeanimsmall.gif",
        currentImage: '',
        focused: false,
        hover: false,
        redirect: "/web_ring",
        musicClip: 'https://files.catbox.moe/j7ggzi.mp3',
        volumeLevel: .3
    },
    {
        coverImage: "/Channel Covers/CTGrassRoots Cover.png",
        gifImage: "Channel Covers/CTGrassRoots Cover.png",
        currentImage: '',
        focused: false,
        hover: false,
        redirect: "/ctgrassroots",
        musicClip: 'https://files.catbox.moe/cc55u4.mp3',
        volumeLevel: .3
    },
    // {
    //     coverImage: "/Channel Covers/music_player.png",
    //     gifImage: "Channel Covers/music_player.png",
    //     currentImage: '',
    //     focused: false,
    //     hover: false,
    //     redirect: "/music_player",
    //     musicClip: ""
    // },
    {
        coverImage: "/Channel Covers/cat-encryption.webp",
        gifImage: "Channel Covers/cat-encryption.webp",
        currentImage: '',
        focused: false,
        hover: false,
        redirect: "/cat_encryption",
        musicClip: 'https://files.catbox.moe/g8n27k.mp3',
        volumeLevel: .3
    },
];
const channelPriorLength = channels.length

// Fill channels with default if still space
for (let index = 0; index < nRows * nCols; index++) {
    index < ((nRows * nCols) - channelPriorLength)
        ? channels.push({ coverImage: '/Channel Covers/no signal low con.gif', gifImage: '/Channel Covers/no signal low con.gif', currentImage: '', hover: false, focused: false, redirect: '', musicClip: '', volumeLevel:.5 })
        : null;
    channels[index].currentImage = channels[index].coverImage
};