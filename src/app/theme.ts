import { DefaultTheme } from "styled-components/dist/types";

declare module "styled-components" {
  export interface colorPalette {
    wine: string;
    darkgreen: string;
    green: string;
    maroon: string;
    white: string;
    black: string;
    "dark-gray": string;
    gray: string;
    orange: string;
    yellow: string;
    salmon: string;

    // redesign 2026 (tokens do Figma "Página OCA")
    primary: string;
    "primary-disabled": string;
    "primary-foreground": string;
    secondary: string;
    "secondary-surface": string;
    "secondary-surface-hover": string;
    "tertiary-hover": string;
    "tertiary-surface": string;
    background: string;
    surface: string;
    "text-primary": string;
    "text-secondary": string;
    "text-muted": string;
    border: string;
    "v-950": string;
    "v-900": string;
    "v-800": string;
  }

  export interface DefaultTheme {
    colors: colorPalette;
  }
}

export const theme: DefaultTheme = {
  colors: {
    wine: "#A65E5F",
    darkgreen: "#5B8951",
    green: "#778C61",
    maroon: "#8f4456",
    white: "white",
    black: "#1e1e1e",
    "dark-gray": "#444444",
    gray: "#858585",
    orange: "#AA633B",
    yellow: "#CEA15B",
    salmon: "#F9E8DD",
    primary: "#597636",
    "primary-disabled": "#b1ca8c",
    "primary-foreground": "#fbf5ef",
    secondary: "#d08c53",
    "secondary-surface": "#fbf5ef",
    "secondary-surface-hover": "#f3e4d2",
    "tertiary-hover": "#401729",
    "tertiary-surface": "#fbf4f8",
    background: "#f8f7f8",
    surface: "#ffffff",
    "text-primary": "#292829",
    "text-secondary": "#676264",
    "text-muted": "#7e797b",
    border: "#dcdbdc",
    "v-950": "#192211",
    "v-900": "#334126",
    "v-800": "#3b4b29",
  },
};
