import { safeLocalStorage } from '../../common/myLocalStorage';
import { visualizers, type VisualizerId } from './visualizer_menu/visualizers';

// The listener's choices, kept between visits. The theme is saved on its own (theme_menu/themes),
// and live audio is left out since the browser asks for permission to share it every visit
export interface Settings {
  visualizer: VisualizerId;
  // The video's link rather than its place in the list, so editing the list doesn't change it
  video: string;
  minimized: boolean;
}

const storageKey = 'background-music-settings';

export function loadSettings(): Partial<Settings> {
  let saved: Record<string, unknown>;
  try {
    saved = JSON.parse(safeLocalStorage?.getItem(storageKey) ?? '{}') ?? {};
  } catch {
    return {};
  }

  // Anything missing or no longer valid falls back to the page's default
  const settings: Partial<Settings> = {};
  const visualizer = visualizers.find((v) => v.id === saved.visualizer);
  if (visualizer) settings.visualizer = visualizer.id;
  if (typeof saved.video === 'string') settings.video = saved.video;
  if (typeof saved.minimized === 'boolean') settings.minimized = saved.minimized;
  return settings;
}

export function saveSettings(settings: Settings) {
  safeLocalStorage?.setItem(storageKey, JSON.stringify(settings));
}
