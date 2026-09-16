// Palette derived from the Observatório da Caatinga e Desertificação logo:
// sage green (map silhouette) + warm sand (background panel).

export const theme = {
  colors: {
    // Brand
    sage: "#7d8c5e",
    sageDark: "#5a6843",
    sageLight: "#a8b393",
    sand: "#c4a880",
    sandDark: "#a08560",
    sandLight: "#e0cba8",

    // Surfaces
    bg: "#fafaf7",
    panel: "#ffffff",
    panelMuted: "#f3f1eb",
    border: "#e5e1d5",
    borderStrong: "#cfc9b8",

    // Text
    text: "#2a2a26",
    textMuted: "#6b6b62",
    textFaint: "#9a9a90",

    // Functional
    accent: "#7d8c5e",
    accentHover: "#5a6843",
    danger: "#b04a3a",
    info: "#3d6b7d",

    // Map highlights
    priorityRed: "#dc2626", // C5 / Alta Prioridade — fill + outline
    priorityRedDark: "#991b1b", // selected/hover outline accent
    drawnYellow: "#facc15", // drawn-polygon fill (vivid yellow)
    drawnYellowDark: "#a16207", // gold accent
    drawnHalo: "#1e293b", // dark slate halo behind the yellow stroke — keeps the polygon legible on any background
  },
  radius: {
    sm: 4,
    md: 8,
    lg: 12,
  },
  shadow: {
    sm: "0 1px 2px rgba(40,40,30,0.06)",
    md: "0 2px 6px rgba(40,40,30,0.10)",
    lg: "0 6px 16px rgba(40,40,30,0.12)",
  },
  font: {
    ui: '"DM Sans", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
    mono: '"DM Mono", ui-monospace, "Cascadia Code", "Consolas", monospace',
  },
} as const;

export type Theme = typeof theme;
