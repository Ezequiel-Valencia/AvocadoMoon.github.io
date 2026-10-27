import { channels } from './channelObject.js';
import type { YouTubePlayer } from '../../common/youtube';

// A channel's music clip plays from an <audio> tag, or from YouTube once its player is ready
export type MusicClip = HTMLAudioElement | YouTubePlayer | undefined;

export class ChannelFunctions {
  staticImage(_event: PointerEvent, id: number) {
    channels[id].currentImage = channels[id].coverImage;
    channels[id].hover = false;
  }

  async playgif(_event: PointerEvent, id: number) {
    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
    channels[id].hover = true;
    await sleep(1000);
    if (channels[id].hover) channels[id].currentImage = channels[id].gifImage;
  }

  playMusic(id: number, bg: HTMLAudioElement, song: MusicClip, background: boolean) {
    if (background) {
      this.stopMusic(song);
      bg.volume = 0.2;
      bg.play();
    } else {
      bg.pause();
      if (song instanceof HTMLAudioElement) {
        song.currentTime = 0;
        song.volume = channels[id].volumeLevel;
        // stay silent if the clip can't be loaded
        song.play().catch(() => {});
      } else if (song) {
        song.seekTo(0, true);
        song.playVideo();
      }
    }
  }

  stopMusic(song: MusicClip) {
    if (song instanceof HTMLAudioElement) song.pause();
    else song?.pauseVideo();
  }

  redirect(id: number) {
    if (channels[id].redirect == '') return;
    if (channels[id].redirect == '/ctgrassroots') window.open('https://ctgrassroots.org');
    else if (channels[id].redirect == '/threemix')
      window.open('https://threemix.ezequielvalencia.com');
    else {
      location.href = channels[id].redirect;
    }
  }

  // https://developer.mozilla.org/en-US/docs/Web/CSS/animation
}
