import { DefaultTheme } from "styled-components/dist/types";

declare module "styled-components" {
    export interface colorPalette {
        green: string;
        maroon: string;
        white: string;
        black: string;
        gray: string;
    }

    export interface DefaultTheme {
        colors: colorPalette;
    }
}


export const theme: DefaultTheme = {
    colors: {
        green: "green",
        maroon: "#8f4456",
        white: "white",
        black: "#1e1e1e",
        gray: "#858585",
    }
}