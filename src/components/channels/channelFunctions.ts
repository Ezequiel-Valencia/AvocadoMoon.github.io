// Equivalent to src/routes/_channels/channelFunctions.ts
import { channels } from './channelObject';

export class ChannelFunctions {
  playMusic(
    id: number,
    bg: HTMLAudioElement,
    song: HTMLAudioElement,
    background: boolean,
  ) {
    if (background) {
      song.pause();
      bg.volume = 0.2;
      bg.play();
    } else {
      bg.pause();
      song.currentTime = 0;
      song.volume = channels[id].volumeLevel;
      song.play();
    }
  }

  redirect(id: number) {
    if (channels[id].redirect === '') return;
    if (channels[id].redirect === '/ctgrassroots') {
      window.open('https://ctgrassroots.org');
    } else if (channels[id].redirect === '/threemix') {
      window.open('https://threemix.ezequielvalencia.com');
    } else {
      location.href = channels[id].redirect;
    }
  }
}
