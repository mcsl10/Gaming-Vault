import { createGlobalStyle } from "styled-components";

//Image import
import darkbr from './images/green3.jpg'

const GlobalStyles = createGlobalStyle`


* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    /* background-color: black; */ 
    background-image: url(${darkbr});
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
    background-color: aquamarine;
    font-family: "Poppins", sans-serif;
    color: mintcream;
}
`;

export default GlobalStyles;
