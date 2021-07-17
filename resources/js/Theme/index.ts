import { DefaultTheme } from "styled-components";

declare module "styled-components" {
    export interface DefaultTheme {
        primaryBackground: string;
        primaryText: string;
        secondaryText: string;
        primaryFont: string;
        colorOrange: string;
        colorDark500: string;
        boxShadow: string;
        colorBackDrop: string;
        errorText: string;
    }
}

export const darkTheme: DefaultTheme = {
    primaryBackground: "#1b1b1b",
    primaryText: "#ffffff",
    colorOrange: "#FF725E",
    colorDark500: "#292929",
    primaryFont: "'Red Hat Text', sans-serif;",
    secondaryText: "#E5E5E5",
    boxShadow: "4px 10px 30px rgba(0, 0, 0, 0.2)",
    colorBackDrop: "rgba(0,0,0,0.5)",
    errorText: "#f44336",
};
