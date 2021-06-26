import { DefaultTheme } from "styled-components";

declare module "styled-components" {
    export interface DefaultTheme {
        primaryBackground: string;
        primaryText: string;
        secondaryText: string;
        primaryFont: string;
        highlightedText: string;
    }
}

export const darkTheme: DefaultTheme = {
    primaryBackground: "#1b1b1b",
    primaryText: "#ffffff",
    highlightedText: "#FF725E",
    primaryFont: "'Red Hat Text', sans-serif;",
    secondaryText: "#E5E5E5",
};
