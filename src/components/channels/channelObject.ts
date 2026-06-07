  /*
  Trying to create reactive elements using classes is to much of a pain.
  Svelte only seems to recognize top level abstraction elements, and does not bother with 
  reactivity of nested class objects
  */


import { SvelteComponent } from "svelte";
import { sfxController, musicController } from "../../common/myLocalStorage";

const nRows = 4;
const nCols = 3;


// Needs to be initalized with some form of variables or else compiler throws fit
export let channels: { coverImage: string; 
    gifImage: string, currentImage: string, 
    focused: boolean, hover: boolean, redirect: string, channelName: string,
    musicClip: string,
    volumeLevel: number, cubeColor: string, cubeHoverColor: string }[] = [
    {
        coverImage: '/Channel Covers/cover-image/union.svg',
        gifImage: '/Channel Covers/focused-image/about me cover.webp',
        channelName: 'About Me',
        currentImage: '',
        focused: false,
        hover: false,
        redirect: '/about_me',
        musicClip: 'https://files.catbox.moe/fw5j3q.mp3',
        volumeLevel: .4,
        cubeColor: "rgb( 38, 219, 191 )",
        cubeHoverColor: "rgb(28, 163, 141)"
    },
    {
        coverImage: "/Channel Covers/cover-image/bottom-waves.svg",
        gifImage: "/Channel Covers/focused-image/Work_Exp.webm",
        channelName: 'Work Experience',
        currentImage: '',
        focused: false,
        hover: false,
        redirect: '/work_experience',
        musicClip: 'https://files.catbox.moe/o9ja1i.mp3',
        volumeLevel: .5,
        cubeColor: "rgb(  82, 82, 82 )",
        cubeHoverColor: "black"
    },
    {
        coverImage: "/Channel Covers/cover-image/waves.svg",
        gifImage: "/Channel Covers/focused-image/personal_projects.jpg",
        channelName: 'Personal Projects',
        currentImage: '',
        focused: false,
        hover: false,
        redirect: "/personal_projects",
        musicClip: 'https://files.catbox.moe/b63jos.mp3',
        volumeLevel: .3,
        cubeColor: "skyblue",
        cubeHoverColor: "rgb(33, 185, 255)"
    },
    {
        coverImage: "/Channel Covers/cover-image/oscillate.svg",
        gifImage: "/Channel Covers/focused-image/book.gif",
        channelName: 'Education',
        currentImage: '',
        focused: false,
        hover: false,
        redirect: "/education",
        musicClip: 'https://files.catbox.moe/bb5qbv.mp3',
        volumeLevel: .3,
        cubeColor: "rgb( 34, 22, 81 )",
        cubeHoverColor: "rgb( 20, 13, 47 )"
    },
    {
        coverImage: "/Channel Covers/cover-image/disc.svg",
        gifImage: "Channel Covers/focused-image/threemix.png",
        channelName: "Three Mix",
        currentImage: '',
        focused: false,
        hover: false,
        redirect: "/threemix",
        musicClip: "https://files.catbox.moe/x3l165.mp3",
        volumeLevel: 0.5,
        cubeColor: "rgb( 132, 129, 255 )",
        cubeHoverColor: "rgb( 55, 51, 229 )"
    },
    {
        coverImage: "/Channel Covers/cover-image/blob-sandwich.svg",
        gifImage: "Channel Covers/focused-image/CTGrassRoots Cover.jpg",
        channelName: 'CTGrassRoots',
        currentImage: '',
        focused: false,
        hover: false,
        redirect: "/ctgrassroots",
        musicClip: 'https://files.catbox.moe/cc55u4.mp3',
        volumeLevel: .3,
        cubeColor: "rgb(  255, 141, 40  )",
        cubeHoverColor: "rgb(   219, 93, 33  )"
    },
    {
        coverImage: "/Channel Covers/cover-image/low-poly.svg",
        gifImage: "/Channel Covers/focused-image/cat-encryption.webp",
        channelName: 'Cat Steganography',
        currentImage: '',
        focused: false,
        hover: false,
        redirect: "/cat_encryption",
        musicClip: 'https://files.catbox.moe/g8n27k.mp3',
        volumeLevel: .3,
        cubeColor: "rgb( 47, 96, 167 )",
        cubeHoverColor: "rgb( 33, 65, 113 )"
    },
    {
        coverImage: "/Channel Covers/cover-image/chaos.svg",
        gifImage: "/Channel Covers/focused-image/zekeanimsmall.gif",
        channelName: 'Web Ring',
        currentImage: '',
        focused: false,
        hover: false,
        redirect: "/web_ring",
        musicClip: 'https://files.catbox.moe/j7ggzi.mp3',
        volumeLevel: .3,
        cubeColor: "rgb(  15, 30, 52  )",
        cubeHoverColor: "rgb(  29, 67, 122 )"
    },
    {
        coverImage: "/Channel Covers/cover-image/flux.svg",
        gifImage: "/Channel Covers/focused-image/book-pen.jpg",
        channelName: 'Geocache',
        currentImage: '',
        focused: false,
        hover: false,
        redirect: "/guest_book",
        musicClip: 'https://files.catbox.moe/mi55xm.mp3',
        volumeLevel: .3,
        cubeColor: "rgb(  15, 30, 52  )",
        cubeHoverColor: "rgb(  29, 67, 122 )"
    },
    // {
    //     coverImage: "/Channel Covers/Zine_Cover.webp",
    //     gifImage: "Channel Covers/Zine_Cover.webp",
    //     channelName: 'Zine',
    //     currentImage: '',
    //     focused: false,
    //     hover: false,
    //     redirect: "/zines",
    //     musicClip: 'https://files.catbox.moe/tlb833.mp3',
    //     volumeLevel: .2
    // },
];
const channelPriorLength = channels.length

// Fill channels with default if still space
for (let index = 0; index < nRows * nCols; index++) {
    index < ((nRows * nCols) - channelPriorLength)
        ? channels.push({ coverImage: '', 
        gifImage: '', currentImage: '', 
        hover: false, focused: false, redirect: '', 
        musicClip: '', volumeLevel:.5, channelName: '', cubeColor: "", cubeHoverColor: ""})
        : null;
    channels[index].currentImage = channels[index].coverImage
};