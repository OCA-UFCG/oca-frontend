"use client";
import styled, { createGlobalStyle } from "styled-components";

<<<<<<< HEAD

=======
>>>>>>> main
export const GlobalStyles = createGlobalStyle`
  html {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-image: url("background.png");
    background-size: 100vw;
    background-repeat: repeat;
  }

  
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed, 
  figure, figcaption, footer, header, hgroup, 
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
    font-family: 'lato', monospace;
    color: ${({ theme }) => theme.colors.black}
  }

  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure, 
  footer, header, hgroup, menu, nav, section {
      display: block;
  }
  body {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
  ol, ul {
      list-style: none;
  }
  blockquote, q {
      quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
      content: '';
      content: none;
  }
  table {
      border-collapse: collapse;
      border-spacing: 0;
  }
    a {
    color: inherit;
    text-decoration: inherit; /* no underline */
  }
`;

export const Wrapper = styled.main`
  display: flex;
  flex-flow: column;
  align-items: center;
  width: 100vw;
  max-width: 1900px;
  min-height: 100vh;
  box-sizing: border-box;
  padding: 0 1rem 0 1rem;
  transition: 0.3s;
  gap: 5rem;
`;

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
`;
