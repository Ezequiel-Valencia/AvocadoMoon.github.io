// Add or remove YouTube links here; any watch, youtu.be, embed, or live URL works.
// Each video's tags place it in groups of the same name in the video picker.
export const videoTags = ['Assorted Collection', 'Jazz', 'Drum n Bass', 'Classical', 
  'Ambient Lounge', 'Psychedelic', 'Video Game OST', 'Hyperpop', 'Surf', 'Hardcore'] as const;

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
  }
];

export const favorites: Video[] = [
  {
    video: 'https://www.youtube.com/watch?v=1seLZKzlQb0',
    title: 'Crumb Locket',
    tags: ['Psychedelic']
  },
  {
    video: 'https://www.youtube.com/watch?v=uwYg1hOGRQQ&list=PLLKXGehIBqSZLp0QcHq_4J9Yi6uBcH7bb',
    title: 'Glow On',
    tags: ['Hardcore']
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
