// Add or remove YouTube links here; any watch, youtu.be, embed, or live URL works.
// Each video's tags place it in groups of the same name in the video picker.
export const videoTags = ['Assorted Collection', 'Jazz', 'Drum n Bass', 'Classical', 
  'Ambient Lounge', 'Psychedelic', 'Video Game OST', 'Hyperpop', 'Surf'] as const;

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
  }
]

// The first step of the video picker; each collection then groups its own videos by tag
export interface Collection {
  name: string;
  videos: Video[];
  // What one of its entries is called on its tile, e.g. "3 ALBUMS"
  unit: string;
}

export const collections: Collection[] = [
  { name: 'Background Music', videos: backgroundMusic, unit: 'VIDEO' },
  { name: 'Albums', videos: albums, unit: 'ALBUM' },
  { name: 'Favorites', videos: favorites, unit: 'SONGS'}
];

// Minimal slice of the YouTube IFrame Player API that this channel uses
// https://developers.google.com/youtube/iframe_api_reference
export interface YouTubePlayer {
  loadVideoById(videoId: string): void;
  playVideo(): void;
  seekTo(seconds: number, allowSeekAhead: boolean): void;
  destroy(): void;
}

interface YouTubeNamespace {
  // Given an existing embed iframe (with enablejsapi=1), the API attaches to it instead of building its own
  Player: new (
    element: HTMLIFrameElement,
    options: {
      events?: {
        onReady?: () => void;
        onStateChange?: (event: { data: number }) => void;
      };
    }
  ) => YouTubePlayer;
}

declare global {
  interface Window {
    YT?: YouTubeNamespace;
    onYouTubeIframeAPIReady?: () => void;
  }
}

export const PlayerState = {
  ENDED: 0,
  PLAYING: 1,
  PAUSED: 2,
} as const;

export function getYoutubeVideoId(url: string): string {
  const match = url.match(/(?:youtu\.be\/|[?&]v=|\/embed\/|\/live\/|\/shorts\/)([\w-]{11})/);
  return match ? match[1] : url;
}

/**
 * Plain embed URL for an `<iframe>`. Loading the video through our own iframe (with a
 * referrer policy) instead of letting the API build one avoids YouTube's embed errors.
 */
export function youtubeEmbedUrl(url: string): string {
  const params = new URLSearchParams({
    enablejsapi: '1',
    rel: '0',
    playsinline: '1',
  });
  return `https://www.youtube.com/embed/${getYoutubeVideoId(url)}?${params}`;
}

export function getVideoCoverImage(url: string): string {
  return `https://i.ytimg.com/vi_webp/${getYoutubeVideoId(url)}/maxresdefault.webp`;
}

let apiLoading: Promise<YouTubeNamespace> | undefined;

function loadYoutubeApi(): Promise<YouTubeNamespace> {
  if (window.YT?.Player) return Promise.resolve(window.YT);
  if (apiLoading) return apiLoading;

  apiLoading = new Promise((resolve) => {
    window.onYouTubeIframeAPIReady = () => resolve(window.YT!);
    const script = document.createElement('script');
    script.src = 'https://www.youtube.com/iframe_api';
    document.head.appendChild(script);
  });
  return apiLoading;
}

let player: YouTubePlayer | undefined;

/**
 * Plays a YouTube video in `iframe`, which must already point at `youtubeEmbedUrl(...)`.
 * The first call hooks the IFrame API onto it for state events; later calls reuse that
 * player so switching videos doesn't reload the iframe.
 */
export async function embed_youtube_video(
  iframe: HTMLIFrameElement,
  url: string,
  onStateChange: (state: number) => void
): Promise<YouTubePlayer> {
  if (player) {
    player.loadVideoById(getYoutubeVideoId(url));
    return player;
  }

  const YT = await loadYoutubeApi();
  player = new YT.Player(iframe, {
    events: {
      onStateChange: (event) => onStateChange(event.data),
    },
  });
  return player;
}

export function destroy_youtube_video() {
  player?.destroy();
  player = undefined;
}
