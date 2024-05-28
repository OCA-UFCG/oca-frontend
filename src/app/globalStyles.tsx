"use client";
import Link from "next/link";
import Image from "next/image";
import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  :root {
    --main-section-width: 1400px;
  }
  html {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-image: url("background.png");
    background-size: 100vw;
    background-repeat: repeat;
    min-height: 100vh;

    ::-webkit-scrollbar {
      height: 0.5rem;
      width: 0.5rem;
      padding: 10px;
    }
    
    ::-webkit-scrollbar-thumb {
      background: ${({ theme }) => theme.colors.green}75;
      scroll-padding: 1rem;
      background-clip: padding-box;
    }

    @keyframes spin {
      0% {
        transform: rotate(360deg);
      }
      100% {
        transform: rotate(0deg);
      }
    }

    @keyframes wordFade {
      0%, 100% {
          opacity: 0;
      }
      20%, 80% {
          opacity: 1;
      }
    }
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

export const MapWrapper = styled.main`
  display: flex;
  flex-flow: column;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  min-height: 100vh;
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  width: 100%;
  padding: 0 0rem 3rem 0rem;
  box-sizing: border-box;
  min-height: 100vh;
`;

export const Main = styled.main`
  display: flex;
  flex-flow: column;
  align-items: center;
  width: 100%;

  box-sizing: border-box;
  transition: 0.3s;
  gap: 3rem;
`;

export const Section = styled.section<{ full?: string }>`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 0;
  box-sizing: border-box;
  width: 100%;
  max-width: ${({ full }) =>
    full !== "false" ? "100%" : "var(--main-section-width)"};
`;

export const SectionTitle = styled.h2<{ variation?: "black" | "white" }>`
  font-size: 1.75rem;
  font-weight: bold;
  text-align: center;
  color: ${({ theme, variation }) => theme.colors[variation || "black"]};
`;

export const LinkButton = styled(Link)`
  background-color: ${({ theme }) => theme.colors.maroon};
  color: ${({ theme }) => theme.colors.white};
  padding: 0.5rem 2rem;
  font-weight: bold;
  cursor: pointer;
  width: 100%;
  text-align: center;
  max-width: 12rem;
  transition: 0.3s;
  text-decoration: none;
  font-size: 14px;

  &:hover {
    opacity: 0.7;
    transform: scale(0.97);
  }
`;

export const LogoSection = styled.div`
  display: flex;
  align-items: center;
  height: 50vh;
`;

export const OcaImage = styled(Image)`
  width: fit-content;
  height: 20rem;
`;

export const SpinningIcon = styled(Image)`
  width: 4rem;
  height: 4rem;
  animation: spin 2s linear infinite;
`;
