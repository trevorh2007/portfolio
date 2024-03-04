"use client";

import { createGlobalStyle, css } from "styled-components";

const styles = css`
  body {
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    transition: all 0.5s linear;

    padding: 0;
    margin: 0;
  }
`;

const GlobalStyles = createGlobalStyle`
  ${styles}
`;

export default GlobalStyles;
