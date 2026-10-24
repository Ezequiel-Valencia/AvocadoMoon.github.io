import { safeLocalStorage } from '../../../common/myLocalStorage';

// Each theme's look lives in its own stylesheet in this folder (themes/<id>.scss),
// which styles the page whenever its root has data-theme="<id>"
export const themes = [
  { id: 'aero', name: 'Aero' },
  { id: 'fall', name: 'Fall' },
  { id: 'pond', name: 'Pond' },
] as const;

export type ThemeId = (typeof themes)[number]['id'];

const storageKey = 'background-music-theme';

export function loadTheme(): ThemeId {
  const saved = safeLocalStorage?.getItem(storageKey);
  return themes.find((t) => t.id === saved)?.id ?? themes[0].id;
}

export function saveTheme(id: ThemeId) {
  safeLocalStorage?.setItem(storageKey, id);
}

export function themeName(id: ThemeId): string {
  return themes.find((t) => t.id === id)?.name ?? id;
}
