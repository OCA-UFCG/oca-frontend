import { DefaultTheme } from "styled-components/dist/types";

declare module "styled-components" {
    export interface colorPalette {
        green: string;
        maroon: string;
        white: string;
    }

    export interface DefaultTheme {
        colors: colorPalette;
    }
}


export const theme: DefaultTheme = {
    colors: {
        green: "green",
        maroon: "red",
        white: "white"
    }
}