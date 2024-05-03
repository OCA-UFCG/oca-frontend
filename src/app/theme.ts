import { DefaultTheme } from "styled-components/dist/types";

declare module "styled-components" {
    export interface colorPalette {
        green: string;
        maroon: string;
        white: string;
        black: string;
    }

    export interface DefaultTheme {
        colors: colorPalette;
    }
}


export const theme: DefaultTheme = {
    colors: {
        green: "green",
        maroon: "red",
        white: "white",
        black: "#1e1e1e",
    }
}