"use client";
import Link from "next/link";
import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  html {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-image: url("background.png");
    background-size: 100vw;
    background-repeat: repeat;
    min-height: 100vh;
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
    margin-left: 1rem;

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
    font-weight: bold;
  }
  p, li {
    margin-bottom: 1rem;
    text-align: justify;
    line-height: 1.5rem;
  }
`;

export const ContentContainer = styled.div`
  width: 100%;
  padding: 0 1rem 0 1rem;
  box-sizing: border-box;
  max-width: 1900px;
  min-height: 100vh;


`

export const Main = styled.main`
  display: flex;
  flex-flow: column;
  align-items: center;
  width: 100%;

  box-sizing: border-box;
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

export const LinkButton = styled(Link)`
  background-color: ${({ theme }) => theme.colors.maroon};
  color: ${({ theme }) => theme.colors.white};
  padding: 0.5rem 2rem;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s;
  font-size: 14px;

  &:hover {
    opacity: 0.7;
    transform: scale(0.95);
  }
`;
