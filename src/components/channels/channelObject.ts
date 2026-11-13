// The desktop grid is 4 channels wide and 3 tall
const nCols = 4;
const nRows = 3;

export interface Channel {
  // Shown on the cube's face while it sits in the grid
  coverImage: string;
  // Shown (image or .webm) once the channel is selected
  gifImage: string;
  channelName: string;
  // Site path, or a full URL for channels that live on another site
  redirect: string;
  // Audio file or YouTube link played while the channel is selected
  musicClip: string;
  volumeLevel: number;
  cubeColor: string;
  cubeHoverColor: string;
  frontHasBackground: boolean;
}

export const channels: Channel[] = [
  {
    coverImage: '/Channel Covers/cover-image/union.svg',
    gifImage: '/Channel Covers/focused-image/about me cover.webp',
    channelName: 'About Me',
    redirect: '/about_me',
    musicClip: 'https://files.catbox.moe/fw5j3q.mp3',
    volumeLevel: 0.4,
    cubeColor: 'rgb( 38, 219, 191 )',
    cubeHoverColor: 'rgb(28, 163, 141)',
    frontHasBackground: false,
  },
  {
    coverImage: '/Channel Covers/cover-image/bottom-waves.svg',
    gifImage: '/Channel Covers/focused-image/Work_Exp.webm',
    channelName: 'Work Experience',
    redirect: '/work_experience',
    musicClip: 'https://files.catbox.moe/o9ja1i.mp3',
    volumeLevel: 0.5,
    cubeColor: 'rgb(  82, 82, 82 )',
    cubeHoverColor: 'black',
    frontHasBackground: false,
  },
  {
    coverImage: '/Channel Covers/cover-image/waves.svg',
    gifImage: '/Channel Covers/focused-image/personal_projects.jpg',
    channelName: 'Personal Projects',
    redirect: '/personal_projects',
    musicClip: 'https://files.catbox.moe/b63jos.mp3',
    volumeLevel: 0.3,
    cubeColor: 'skyblue',
    cubeHoverColor: 'rgb(33, 185, 255)',
    frontHasBackground: false,
  },
  {
    coverImage: '/Channel Covers/cover-image/oscillate.svg',
    gifImage: '/Channel Covers/focused-image/book.gif',
    channelName: 'Education',
    redirect: '/education',
    musicClip: 'https://files.catbox.moe/bb5qbv.mp3',
    volumeLevel: 0.3,
    cubeColor: 'rgb( 34, 22, 81 )',
    cubeHoverColor: 'rgb( 20, 13, 47 )',
    frontHasBackground: false,
  },
  // {
  //   coverImage: '/Channel Covers/cover-image/disc.svg',
  //   gifImage: '/Channel Covers/focused-image/threemix.png',
  //   channelName: 'Three Mix',
  //   redirect: 'https://threemix.ezequielvalencia.com',
  //   musicClip: '/Audio/channels/threemix-music.mp3',
  //   volumeLevel: 0.5,
  //   cubeColor: 'rgb( 132, 129, 255 )',
  //   cubeHoverColor: 'rgb( 55, 51, 229 )',
  //   frontHasBackground: false,
  // },
  {
    coverImage: '/Channel Covers/cover-image/blob-sandwich.svg',
    gifImage: '/Channel Covers/focused-image/CTGrassRoots Cover.jpg',
    channelName: 'CTGrassRoots',
    redirect: 'https://ctgrassroots.org',
    musicClip: 'https://files.catbox.moe/cc55u4.mp3',
    volumeLevel: 0.3,
    cubeColor: 'rgb(  255, 141, 40  )',
    cubeHoverColor: 'rgb(   219, 93, 33  )',
    frontHasBackground: false,
  },
  {
    coverImage: '/Channel Covers/cover-image/low-poly.svg',
    gifImage: '/Channel Covers/focused-image/cat-encryption.webp',
    channelName: 'Cat Steganography',
    redirect: '/cat_encryption',
    musicClip: 'https://files.catbox.moe/g8n27k.mp3',
    volumeLevel: 0.3,
    cubeColor: 'rgb( 47, 96, 167 )',
    cubeHoverColor: 'rgb( 33, 65, 113 )',
    frontHasBackground: false,
  },
  {
    coverImage: '/Channel Covers/cover-image/flux.svg',
    gifImage: '/Channel Covers/focused-image/book-pen.jpg',
    channelName: 'Geocache',
    redirect: '/guest_book',
    musicClip: '/Audio/channels/geocache-music.mp3',
    volumeLevel: 0.3,
    cubeColor: 'rgb(  15, 30, 52  )',
    cubeHoverColor: 'rgb(  29, 67, 122 )',
    frontHasBackground: false,
  },
  {
    coverImage: '/Channel Covers/cover-image/blue_ssstar.svg',
    gifImage: '/Channel Covers/focused-image/pink_ssstar.svg',
    channelName: 'Music',
    redirect: '/background_music',
    musicClip: '/Audio/channels/threemix-music.mp3',
    volumeLevel: 0.3,
    cubeColor: 'rgb(22, 25, 29)',
    cubeHoverColor: 'rgb(0, 0, 0)',
    frontHasBackground: true,
  },
  {
    coverImage: '/Channel Covers/cover-image/forecast.svg',
    gifImage: '/Channel Covers/focused-image/forecast-anim.svg',
    channelName: 'Weather',
    redirect: '/weather',
    musicClip: 'https://youtu.be/385KWOld3OI?si=rybsvLPTpmvltdEZ',
    volumeLevel: 0.3,
    cubeColor: 'rgb( 52, 190, 237 )',
    cubeHoverColor: 'rgb( 18, 76, 150 )',
    frontHasBackground: false,
  },
  {
    coverImage: '/Channel Covers/cover-image/chaos.svg',
    gifImage: '/Channel Covers/focused-image/zekeanimsmall.gif',
    channelName: 'Web Ring',
    redirect: '/web_ring',
    musicClip: 'https://files.catbox.moe/j7ggzi.mp3',
    volumeLevel: 0.3,
    cubeColor: 'rgb(  15, 30, 52  )',
    cubeHoverColor: 'rgb(  29, 67, 122 )',
    frontHasBackground: false,
  },
  // {
  //   coverImage: '/Channel Covers/Zine_Cover.webp',
  //   gifImage: '/Channel Covers/Zine_Cover.webp',
  //   channelName: 'Zine',
  //   redirect: '/zines',
  //   musicClip: 'https://files.catbox.moe/tlb833.mp3',
  //   volumeLevel: 0.2,
  // },
];

// Fill remaining grid slots with blank placeholders
while (channels.length < nRows * nCols) {
  channels.push({
    coverImage: '',
    gifImage: '',
    channelName: '',
    redirect: '',
    musicClip: '',
    volumeLevel: 0.5,
    cubeColor: '',
    cubeHoverColor: '',
    frontHasBackground: false,
  });
}
