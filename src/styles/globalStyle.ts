import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Matrix Bold';
    src: url('/matrix_bold-webfont.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }

  body, input, select, button, textarea {
    font-family: 'Matrix Bold', sans-serif;
  }
`;

export const Container = styled.div`
  min-height: 90vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 1rem;
`;

export const theme = {
  colors: {
    primary: "#4f4355",
    secondary: "#2a253a",
    accent: "#0077cc",
    background: "#ffffff",
    text: "#000000",
    white: "#ffffff",
    gray: "#ddd",
    darkGray: "#757575",
    lightGray: "#b3b3b3",
  },
};
