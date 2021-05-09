import React from "react";
import { render } from "react-dom";
import App from "./components/App";
import { ThemeProvider } from "styled-components";
import { GlobalStyle, darkTheme } from "./Theme";
render(
    <ThemeProvider theme={darkTheme}>
        <GlobalStyle />
        <App />
    </ThemeProvider>,
    document.getElementById("app")
);
