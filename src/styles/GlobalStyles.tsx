import { Global, css } from '@emotion/react';

export const GlobalStyles = () => (
  <Global
    styles={css`
      body {
        font-family: 'Satoshi', sans-serif;
        margin: 0;
        padding: 0;
        background: #f7fafc;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }

      * {
        box-sizing: border-box;
      }

      h1, h2, h3, h4, h5, h6 {
        font-family: 'Satoshi', sans-serif;
        font-weight: 700;
      }

      p, a, span, div {
        font-family: 'Satoshi', sans-serif;
        font-weight: 400;
      }

      a {
        text-decoration: none;
        color: inherit;
      }
    `}
  />
); 