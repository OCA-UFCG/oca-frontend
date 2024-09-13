import { DefaultTheme } from "styled-components/dist/types";

declare module "styled-components" {
  export interface colorPalette {
    wine: string;
    darkgreen: string;
    green: string;
    maroon: string;
    white: string;
    black: string;
    gray: string;
    orange: string;
    yellow: string;
    salmon: string;
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
    gray: "#858585",
    orange: "#AA633B",
    yellow: "#CEA15B",
    salmon: "#F9E8DD",
  },
};
