import React from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { darkTheme } from "./Theme";
import GlobalStyle from "./Theme/GlobalStyle";
import App from "./components/App";
import { Provider } from "react-redux";
import store from "./store";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

render(
    <Provider store={store}>
        <ThemeProvider theme={darkTheme}>
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                    <GlobalStyle />
                    <App />
                </BrowserRouter>
            </QueryClientProvider>
        </ThemeProvider>
    </Provider>,
    document.getElementById("app")
);
