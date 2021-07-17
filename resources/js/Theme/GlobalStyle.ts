import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    *, *::before,*::after{
        margin:0;
        padding:0;
        box-sizing:border-box
    }
    body{
        color: white;
        min-height:100vh;
    }
    html, body, #root, .App {
        height: 100%;
    }
`;

export default GlobalStyle;
