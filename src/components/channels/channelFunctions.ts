import type { Channel } from './channelObject';
import type { YouTubePlayer } from '../../common/youtube';

// A channel's music clip plays from an <audio> tag, or from YouTube once its player is ready
export type MusicClip = HTMLAudioElement | YouTubePlayer | undefined;

// Pause the background music and play the selected channel's clip from the start
export function playChannelMusic(channel: Channel, bg: HTMLAudioElement | null, song: MusicClip) {
  bg?.pause();
  if (song instanceof HTMLAudioElement) {
    song.currentTime = 0;
    song.volume = channel.volumeLevel;
    // stay silent if the clip can't be loaded
    song.play().catch(() => {});
  } else if (song) {
    song.seekTo(0, true);
    song.playVideo();
  }
}

// Stop the channel's clip and go back to the background music
export function playBackgroundMusic(bg: HTMLAudioElement | null, song: MusicClip) {
  stopMusic(song);
  if (bg) {
    bg.volume = 0.2;
    bg.play().catch(() => {});
  }
}

export function stopMusic(song: MusicClip) {
  if (song instanceof HTMLAudioElement) song.pause();
  else song?.pauseVideo();
}

export function openChannel(channel: Channel) {
  if (channel.redirect == '') return;
  // Channels hosted on other sites open in a new tab
  if (/^https?:\/\//.test(channel.redirect)) window.open(channel.redirect, '_blank', 'noopener');
  else location.href = channel.redirect;
}
