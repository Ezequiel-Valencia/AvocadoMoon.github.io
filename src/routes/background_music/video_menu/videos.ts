// Add or remove YouTube links here; any watch, youtu.be, embed, or live URL works.
// Each video's tags place it in groups of the same name in the video picker.
export const videoTags = ['Assorted Collection', 'Jazz', 'Drum n Bass', 'Classical', 
  'Ambient Lounge', 'Psychedelic', 'Video Game OST', 'Hyperpop', 'Surf', 'Punk/Heavy',
  'Indie', 'Folk', 'Rap', 'Jungle', 'Soul', 'Rock', 'Funk', 'Dream Pop'] as const;

export type VideoTag = (typeof videoTags)[number];

export interface Video {
  video: string;
  title: string;
  tags: VideoTag[];
}

export const backgroundMusic: Video[] = [
  {
    video: 'https://youtu.be/_C_UkCAhRXE?si=Ujn-wL4c0HIpCnXt',
    title: 'Arctic Eggs',
    tags: ['Assorted Collection'],
  },
  {
    video: 'https://www.youtube.com/watch?v=z0_ijQ3r2EI',
    title: 'Xbox Live',
    tags: ['Ambient Lounge'],
  },
  {
    video: 'https://www.youtube.com/watch?v=vcGeWUiWrT4',
    title: 'Music To Heal Brain Rot',
    tags: ['Classical'],
  },
  {
    video: `https://youtu.be/l-vSSYEuO88?si=-z9JKPra51sy0iy6`,
    title: `Smoke Break`,
    tags: ['Jazz']
  },
  {
    video: `https://www.youtube.com/watch?v=Do5_wU9X1pc`,
    title: `PS Liquid Drum n Bass`,
    tags: ['Drum n Bass']
  },
  {
    video: `https://www.youtube.com/watch?v=4ozXwgGFr7k`,
    title: `Ambient Channel`,
    tags: ['Ambient Lounge']
  },
  {
    video: `https://www.youtube.com/watch?v=d3KfkKXRDzk`,
    title: `Sanctuary OS`,
    tags: [`Ambient Lounge`]
  },
  {
    video: `https://www.youtube.com/watch?v=GqS26TkFVlE`,
    title: `Space Lobby`,
    tags: [`Ambient Lounge`]
  },
  {
    video: `https://youtu.be/3IPcjNsV17Q?si=ZiU1juTjNnuDwAE7`,
    title: `Emerald Paradise`,
    tags: [`Drum n Bass`]
  },
  {
    video: `https://www.youtube.com/watch?v=N5rOh4Pps10`,
    title: `Hidden Gems`,
    tags: [`Drum n Bass`]
  },
  {
    video: `https://youtu.be/6BBgKWJRx1o?si=TB2P8uixBveC9Nnn`,
    title: `Video Game Music to Float Away To`,
    tags: [`Ambient Lounge`]
  },
  {
    video: `https://youtu.be/fZIzJvRAEyo?si=YkGW5MXZ_v4C-Zy3`,
    title: `Hylics Chill Music`,
    tags: [`Psychedelic`]
  },
  {
    video: `https://youtu.be/MsjHOAq7WH0?si=YFZIttsIf5VSHjYr`,
    title: `Cat Train`,
    tags: [`Jazz`]
  }
];

export const albums: Video[] = [
  {
    video: `https://www.youtube.com/watch?v=NdwVwX1hWzA&list=PLf93Ae7s390s5Y7Dut1qRibTqTh0cLGPz`,
    title: `Moonage Lobotomy`,
    tags: [`Psychedelic`, 'Video Game OST']
  },
  {
    video: `https://www.youtube.com/watch?v=lJhNRgMIeAE&list=PLuX3i5mdbQK4BQkuSiXuEAtk6k0WRSMDa`,
    title: `The Millennium`,
    tags: ['Surf']
  },
  {
    video: 'https://www.youtube.com/watch?v=_fh133ZO1AE&list=PLEpZan9S2GOFesp-gJqsdD80a7zoaflHa',
    title: 'Charlie Brown Christmas',
    tags: ['Jazz']
  },
  {
    video: 'https://www.youtube.com/watch?v=CJ5sq5qRJHo&list=OLAK5uy_kKsub2F8Fty7H9y4Cx0g36ACBunz5y4UI',
    title: 'Happy Camper',
    tags: ['Surf']
  },
  {
    video: 'https://www.youtube.com/watch?v=1seLZKzlQb0',
    title: 'Crumb Locket',
    tags: ['Psychedelic']
  },
  {
    video: 'https://www.youtube.com/watch?v=uwYg1hOGRQQ&list=PLLKXGehIBqSZLp0QcHq_4J9Yi6uBcH7bb',
    title: 'Glow On',
    tags: ['Punk/Heavy']
  },
  {
    video: 'https://www.youtube.com/watch?v=mzUUQ4KoPGk&list=PLl1bFDcO4TFfVvmZIx89rpdVgVGK_uFzy',
    title: 'Alone',
    tags: ['Jazz']
  },
  {
    video: 'https://www.youtube.com/watch?v=NMZ74lDDn2A&list=PLNPGM2D7aODdKPDDMxbz0aWrsS3wkocuc',
    title: 'No Need to Argue',
    tags: ['Indie']
  },
  {
    video: 'https://www.youtube.com/watch?v=JzYf6qskdfA&list=OLAK5uy_mTLecX_gK_CmqU1GOnd8LP2I3Op0flwno&pp=0gcJCR0Ga94AFGB0',
    title: 'Photographs and Memories',
    tags: ['Folk']
  },
  {
    video: 'https://www.youtube.com/watch?v=4Wkd9UbXFiA&list=PLyWB0TxTMmTlIstq6wCCyiZhVNbSoNKF1',
    title: 'All The Light Above it Too',
    tags: ['Folk']
  },
  {
    video: 'https://www.youtube.com/watch?v=NtWyBNDCqos&list=PL4-oCE2y-CrE18IkWX9jdulS8qEk7Y3rP',
    title: 'America',
    tags: ['Folk']
  },
  {
    video: 'https://www.youtube.com/watch?v=t7hS8FSH-Vs&list=PLsAk6h4n-dS3SZnGOJ07o2WmF_0Ej8F2i',
    title: 'Call Me If You Get Lost',
    tags: ['Rap']
  },
  {
    video: 'https://www.youtube.com/watch?v=cilDrtEgqxQ&list=PLQgE9Vahqeq2TQ28kbUWSzlaBEROEyf0C',
    title: 'Reading, Writing, And Arithemtic',
    tags: ['Indie', 'Dream Pop']
  },
  {
    video: 'https://www.youtube.com/watch?v=AG_Yk-aPoPc&list=PLxA687tYuMWi8hD2cX9gdGazABFz8Ge-B',
    title: 'Submarine',
    tags: ['Indie']
  },
  {
    video: 'https://www.youtube.com/watch?v=XuKq7zT_0nM&list=PLxA687tYuMWhb4sHgwuQIKIiFH-sS3LZE',
    title: 'Fancy That',
    tags: ['Jungle']
  },
  {
    video: 'https://www.youtube.com/watch?v=JBPPnjCipyE&list=PLKPYjLXQxnueOD6DYL7mbOPEyrse-OvYD',
    title: 'Ivy League',
    tags: ['Jazz']
  },
  {
    video: 'https://www.youtube.com/watch?v=IplnMYMp2Mw&list=PL2bfZhCmaYUpyvUPFvH8MaltC-MWO_BgE',
    title: 'Telefone',
    tags: ['Soul']
  },
  {
    video: 'https://www.youtube.com/watch?v=gitBmb75GjY&list=PLxA687tYuMWh25j9dvMi4pbzauj7mTgjC&pp=0gcJCVgDOCosWNin',
    title: 'Flowers',
    tags: ['Soul']
  },
  {
    video: 'https://www.youtube.com/watch?v=bQ-MnLUuakE',
    title: 'I Got Heaven',
    tags: ['Punk/Heavy']
  },
  {
    video: 'https://www.youtube.com/watch?v=FV1YVZV-Wb8&list=PLqaXTO5wp6UjpRUL179-xIGmZ0-qlCrZG',
    title: 'Give Me Convience or Give Me Death',
    tags: ['Punk/Heavy']
  },
  {
    video: 'https://www.youtube.com/watch?v=XLjo0lY450c&list=PL81_CtYCym28M8c2NFVCEIEBDCu6o1tXw',
    title: 'Dookie',
    tags: ['Punk/Heavy']
  },
  {
    video: 'https://www.youtube.com/watch?v=seHlHzYpWBU&list=PLBLv7w9jMAjJ7HSHNpwIMrC4IqKqBLv7m',
    title: 'Rebel Yell',
    tags: ['Rock']
  },
  {
    video: 'https://www.youtube.com/watch?v=nzuMNBG5jHo&list=PLI6kLIhBBwmSFnJULtmGMs8NZkZzN3Jks',
    title: 'Cosmos Factory',
    tags: ['Rock']
  },
  {
    video: 'https://www.youtube.com/watch?v=ltxmyVTbKeQ&list=PLupnXOesQMe9o8031mO3OD-cct8Ps2Qdz&pp=0gcJCVgDOCosWNin',
    title: 'Marcos Valle',
    tags: ['Funk']
  },
  {
    video: 'https://www.youtube.com/watch?v=fYNkPydLaLg&list=PLFop8WQKV7fdVSD-j9I2_Y-8mmxEfGOc2',
    title: 'Bismillah',
    tags: ['Funk']
  },
  {
    video: 'https://www.youtube.com/watch?v=eQAF1h7PEFs&list=PLI6kLIhBBwmRvuv4wr6tdsAq688x8w6qb',
    title: 'Gato',
    tags: ['Funk']
  },
  {
    video: 'https://www.youtube.com/watch?v=hX7RYQq4g5Q&list=PLYH7kyzhOMa85Zz-pLsNG9eaqG8vIudvZ',
    title: 'Bloom',
    tags: ['Dream Pop']
  },
  {
    video: 'https://www.youtube.com/watch?v=fn4GAs2FwWM&list=PL2-6jbknL9AKoYxONk_B-RjJeAixYEbse',
    title: 'Crane Kiss',
    tags: ['Dream Pop']
  },
  {
    video: 'https://www.youtube.com/watch?v=PbbUeLkZt74&list=PLI6kLIhBBwmSEub1HyzIsoL-Z838A2_1V',
    title: 'Heaven or Las Vegas',
    tags: ['Dream Pop']
  },
  {
    video: 'https://www.youtube.com/watch?v=9yEbycO1a58&list=PLBCYJDQ1g88ALuW-gogwFeuf9l1bUZhW0',
    title: 'Pet Grief',
    tags: ['Dream Pop']
  },
  {
    video: 'https://www.youtube.com/watch?v=vzNrvMgjSqI&list=OLAK5uy_msYpWozx77tv-GPWGJFXG527BaSMqgTtY',
    title: 'Oncle Jazz',
    tags: ['Indie']
  },
  {
    video: 'https://www.youtube.com/watch?v=-b0UdNNOwLg&list=PLuQr5w21PwBiEkSMbOJixLcQ9nHLhCKjl',
    title: 'Imaginal Disk',
    tags: ['Indie']
  },
  {
    video: 'https://www.youtube.com/watch?v=n2vNZTunfwk&list=PLqsBPTegBGMGsNy0ORomuzItBJK1I58fc',
    title: 'Americas Next Top Party',
    tags: ['Rap']
  },
  {
    video: 'https://www.youtube.com/watch?v=YXud5QzESXg&list=PLFF0hzeQGf0_I3AiG9qmzED_k1Mb-I7b6',
    title: 'GNX',
    tags: ['Rap']
  },
  {
    video: 'https://www.youtube.com/watch?v=ZR2OM54kcl4&list=PLHTo__bpnlYV2sa6zLf7M5_EMs48Y7dYZ',
    title: 'Melt My Eyez',
    tags: ['Rap']
  },
  {
    video: 'https://www.youtube.com/watch?v=UQBAOjXYo-4&list=PLC80P4gsPr-Z07jDF-2e_8NKlbqCdwjDJ',
    title: 'Melt My Eyez',
    tags: ['Rap', 'Jazz']
  },
  {
    video: 'https://www.youtube.com/watch?v=RweE1xHGlFA&list=PL9_GXtdduXrgwCf54b9pUxX9X61TCNw-y',
    title: 'Nellyville',
    tags: ['Rap']
  },
  {
    video: 'https://www.youtube.com/watch?v=1ZX5gN1yevM&list=PL3r1ldjYHlYOOaxhdQWLK5mnJIWhdJZOD',
    title: 'Reachin',
    tags: ['Rap', 'Jazz']
  },
  {
    video: 'https://www.youtube.com/watch?v=i7FzrKr4XKM&list=PLKUcDyFltysbnDUuN1bLDrXueY0jTANhx',
    title: '2093',
    tags: ['Rap']
  },
  {
    video: 'https://www.youtube.com/watch?v=IrvlCjJBdlE&list=OLAK5uy_kukzppB75K7C7iMIWfFqB9PXdBTJ9s71M&pp=0gcJCR0Ga94AFGB0',
    title: 'No Hands',
    tags: ['Rap']
  },
  {
    video: 'https://www.youtube.com/watch?v=MvEtKc8-n3s&list=PLcSxundcwECqb7nA_6wTUwUGHhkFb7XRs',
    title: 'Flower Boy',
    tags: ['Rap']
  },
  {
    video: 'https://www.youtube.com/watch?v=oYOPz1vqeZU&list=PLJc9GisSQjeiEalpE66RSUb_HLp-uhRoU',
    title: '10,000 Gecs',
    tags: ['Hyperpop']
  },
  {
    video: 'https://www.youtube.com/watch?v=0W-N1DqpmiM&list=PLLg3TrvTuhgl-jQwNXcGTwNswKtch0O-a',
    title: 'Worst Girl In America',
    tags: ['Hyperpop']
  },
  {
    video: 'https://www.youtube.com/watch?v=KAgZVVMmcpE&list=OLAK5uy_np1bPkY0YLe5ZtmuiLQzYZoAh0nrylfos',
    title: 'Teeth',
    tags: ['Punk/Heavy']
  },
  {
    video: 'https://www.youtube.com/watch?v=lbHRAc4vRsA&list=OLAK5uy_klqdtzrbs2UlJfrLX9GBIbaDiCVXwWCwg',
    title: 'Time And Space',
    tags: ['Punk/Heavy']
  },
  {
    video: 'https://www.youtube.com/watch?v=s7ZsYe5Uwg0&list=PLkROH3Eqs0T-21TF61hNOY00vR7bfn833&pp=0gcJCR0Ga94AFGB0',
    title: 'Toxicity',
    tags: ['Punk/Heavy']
  },
  {
    video: 'https://www.youtube.com/watch?v=UzCmERV5hZc&pp=ygUhd2FpdGluZyByb29tIG92ZXJncm93biBmdWxsIGFsYnVt',
    title: 'Waiting Room',
    tags: ['Punk/Heavy']
  },
  {
    video: 'https://www.youtube.com/watch?v=t4c4r65-Xpg&list=PLHTo__bpnlYUWWO7YJcsAMmypiJQA8KWi',
    title: 'Slipknot',
    tags: ['Punk/Heavy']
  }
];

export const favorites: Video[] = [
  {
    video: 'https://www.youtube.com/watch?v=1seLZKzlQb0',
    title: 'Crumb Locket',
    tags: ['Psychedelic']
  }
]

// The first step of the video picker; each collection then groups its own videos by tag
export interface Collection {
  name: string;
  videos: Video[];
  // What one of its entries is called on its tile, e.g. "3 ALBUMS"
  unit: string;
  // Lists its videos straight away instead of grouping them by tag first
  flat?: boolean;
}

export const collections: Collection[] = [
  { name: 'Background Music', videos: backgroundMusic, unit: 'VIDEO' },
  { name: 'Albums', videos: albums, unit: 'ALBUM' },
  { name: 'Favorites', videos: favorites, unit: 'SONG', flat: true }
];
