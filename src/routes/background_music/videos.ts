// Add or remove YouTube links here; any watch, youtu.be, embed, or live URL works
export const backgroundMusic: { videos: string[] } = {
  videos: [
    'https://www.youtube.com/watch?v=jfKfPfyJRdk',
    'https://www.youtube.com/watch?v=4xDzrJKXOOY',
    'https://www.youtube.com/watch?v=rUxyKA_-grg',
  ],
};

// Minimal slice of the YouTube IFrame Player API that this channel uses
// https://developers.google.com/youtube/iframe_api_reference
export interface YouTubePlayer {
  loadVideoById(videoId: string): void;
  playVideo(): void;
  seekTo(seconds: number, allowSeekAhead: boolean): void;
  destroy(): void;
}

interface YouTubeNamespace {
  Player: new (
    element: HTMLElement,
    options: {
      videoId: string;
      width?: string;
      height?: string;
      playerVars?: Record<string, number>;
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
 * Embeds a YouTube video inside `container` and displays it, reusing the existing
 * player when one has already been created so switching videos doesn't rebuild the iframe.
 */
export async function embed_youtube_video(
  container: HTMLElement,
  url: string,
  onStateChange: (state: number) => void
): Promise<YouTubePlayer> {
  const videoId = getYoutubeVideoId(url);

  if (player) {
    player.loadVideoById(videoId);
    return player;
  }

  const YT = await loadYoutubeApi();
  player = new YT.Player(container, {
    videoId,
    width: '100%',
    height: '100%',
    playerVars: { autoplay: 1, rel: 0, playsinline: 1, modestbranding: 1 },
    events: {
      onReady: () => player?.playVideo(),
      onStateChange: (event) => onStateChange(event.data),
    },
  });
  return player;
}

export function destroy_youtube_video() {
  player?.destroy();
  player = undefined;
}
