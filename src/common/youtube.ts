// Minimal slice of the YouTube IFrame Player API that the site uses
// https://developers.google.com/youtube/iframe_api_reference
export interface YouTubePlayer {
  loadVideoById(videoId: string): void;
  playVideo(): void;
  pauseVideo(): void;
  seekTo(seconds: number, allowSeekAhead: boolean): void;
  getCurrentTime(): number;
  getDuration(): number;
  // 0 to 100
  setVolume(volume: number): void;
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

export function isYoutubeUrl(url: string): boolean {
  return /^https?:\/\/(www\.|m\.|music\.)?(youtube\.com|youtu\.be)\//.test(url);
}

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

export function loadYoutubeApi(): Promise<YouTubeNamespace> {
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
