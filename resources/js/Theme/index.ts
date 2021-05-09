import { createGlobalStyle, DefaultTheme } from "styled-components";

declare module "styled-components" {
    export interface DefaultTheme {
        primaryBackground: string;
        primaryColor: string;
    }
}

export const darkTheme: DefaultTheme = {
    primaryBackground: "#1b1b1b",
    primaryColor: "#f1f1f1",
};

export const GlobalStyle = createGlobalStyle`
	*, *::before,*::after{
		margin:0;
		padding:0;
		box-sizing:border-box
	}
`;
