<!-- A YouTube video kept on the page but out of sight, so only its audio comes through -->

<script lang="ts">
  import { onMount } from 'svelte';
  import { loadYoutubeApi, youtubeEmbedUrl, type YouTubePlayer } from './youtube';

  interface Props {
    url: string;
    title: string;
    // 0 to 1, like an <audio> tag's volume
    volume?: number;
    onready?: (player: YouTubePlayer) => void;
    onstatechange?: (state: number) => void;
  }

  let { url, title, volume = 1, onready, onstatechange }: Props = $props();

  let frame: HTMLIFrameElement | undefined = $state();

  onMount(() => {
    let player: YouTubePlayer | undefined;
    let destroyed = false;

    loadYoutubeApi().then((YT) => {
      // The page may have moved on while the API was loading
      if (destroyed || !frame) return;
      player = new YT.Player(frame, {
        events: {
          onReady: () => {
            player?.setVolume(volume * 100);
            if (player) onready?.(player);
          },
          onStateChange: ({ data }) => onstatechange?.(data),
        },
      });
    });

    return () => {
      destroyed = true;
      player?.destroy();
    };
  });
</script>

<iframe
  bind:this={frame}
  class="youtube-audio"
  src={youtubeEmbedUrl(url)}
  {title}
  referrerpolicy="strict-origin-when-cross-origin"
  allow="autoplay; encrypted-media"
  tabindex="-1"
  aria-hidden="true"
></iframe>

<style>
  /* YouTube won't play in a player smaller than 200x200, so it's moved off screen instead */
  .youtube-audio {
    position: fixed;
    left: -10000px;
    width: 200px;
    height: 200px;
    opacity: 0;
    pointer-events: none;
    border: none;
  }
</style>
