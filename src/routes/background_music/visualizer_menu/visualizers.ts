// Visualizer styles to pick from; each theme paints every kind in its own stylesheet
export const visualizers = [
  { id: 'off', name: 'Off' },
  { id: 'bars', name: 'Bars' },
  { id: 'circle', name: 'Circle' },
  { id: 'wave', name: 'Wave' },
] as const;

export type VisualizerId = (typeof visualizers)[number]['id'];
export type VisualizerKind = Exclude<VisualizerId, 'off'>;

export function visualizerName(id: VisualizerId): string {
  return visualizers.find((v) => v.id === id)?.name ?? id;
}
