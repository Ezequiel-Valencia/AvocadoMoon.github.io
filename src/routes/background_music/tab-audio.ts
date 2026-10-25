// The YouTube iframe is cross-origin, so its audio can't be read directly. Chromium browsers
// do let a page capture its own tab's audio once the visitor agrees in the share prompt,
// which is what the visualizers listen to.

export interface TabAudio {
  analyser: AnalyserNode;
  stop(): void;
}

// Chromium-only constraint, used as a sign the browser can share tab audio; others can't
export function canCaptureTabAudio(): boolean {
  const constraints = navigator.mediaDevices?.getSupportedConstraints?.() ?? {};
  return 'suppressLocalAudioPlayback' in constraints;
}

export class NoAudioSharedError extends Error {}

/**
 * Prompts the visitor to share this tab's audio and returns an analyser listening to it.
 * Rejects with a NotAllowedError DOMException if they cancel, or NoAudioSharedError if they
 * share without ticking the audio option. `onEnded` runs if they stop sharing from the
 * browser's own controls.
 */
export async function captureTabAudio(onEnded: () => void): Promise<TabAudio> {
  const stream = await navigator.mediaDevices.getDisplayMedia({
    // Browsers require video in the request even though only the audio is used
    video: true,
    audio: true,
    preferCurrentTab: true,
    selfBrowserSurface: 'include',
    surfaceSwitching: 'exclude',
    systemAudio: 'exclude',
  } as DisplayMediaStreamOptions);

  // Only the sound is needed; ending the video track keeps the capture light
  stream.getVideoTracks().forEach((t) => t.stop());
  const [track] = stream.getAudioTracks();
  if (!track) throw new NoAudioSharedError('No audio was shared');

  const context = new AudioContext();
  const analyser = context.createAnalyser();
  // Fine enough that the lowest bars each get their own slice of the bass
  analyser.fftSize = 2048;
  analyser.smoothingTimeConstant = 0.75;
  // Extra headroom so loud bass doesn't pin the bars at full height
  analyser.minDecibels = -90;
  analyser.maxDecibels = -20;
  // Left unconnected to the speakers: the tab already plays the sound itself
  context.createMediaStreamSource(stream).connect(analyser);

  let stopped = false;
  function stop() {
    if (stopped) return;
    stopped = true;
    stream.getTracks().forEach((t) => t.stop());
    context.close();
  }

  track.addEventListener('ended', () => {
    stop();
    onEnded();
  });

  return { analyser, stop };
}
