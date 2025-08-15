"use client";

import Link from "next/link";
import Image from "next/image";
import styled, { createGlobalStyle } from "styled-components";
import { Icon } from "@/components/Icon/Icon";

export const GlobalStyles = createGlobalStyle`
  :root {
    --main-section-width: 1400px;
  }
  html {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100svh;

    ::-webkit-scrollbar {
      height: 0.5rem;
      width: 0.25rem;
      padding: 10px;
    }
    
    ::-webkit-scrollbar-thumb {
      background: ${({ theme }) => theme.colors.green}75;
      scroll-padding: 0.2rem;
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

    @keyframes fadeIn {
      0% {
        opacity: 0;
        display: none;
      }
      100% {
        opacity: 1;
        display: flex; /* Show element after animation */
      }
    }

    @keyframes fadeOut {
      0% {
        opacity: 1;
      }

      100% {
        opacity: 0;
        display: none;
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

    @keyframes gradient {
      0% {
        background-position: 0% 0%;
      }
      100% {
        background-position: 100% 100%;
      }
    }

    @keyframes close {
      0% {
        height: fit-content;
      }
      100% {
        opacity: 0;
        height: 0px;
        padding: 0;
      }
    }

    @keyframes open {
      0% {
        opacity: 0;
        height: 0px;
        padding: 0;
      }
      100% {
        height: fit-content;
      }
    }

    @keyframes expandWidth {
      from {
        width: 0%;
      }
      to {
        width: 100%;
      }
    }

    @keyframes pulse {
      0%, 40%{
        transform: scale(0.3);
      }
      40%, 80%{
        transform: scale(1.15);
      }
      80%, 100%{
        transform: scale(1);
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
    color: ${({ theme }) => theme.colors["dark-gray"]}
  }

  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure, 
  footer, header, hgroup, menu, nav, section {
      display: block;
  }
  body {
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 100svh;
    justify-content: space-between;
  }
  ol, ul {
    margin-left: 1rem;

    width: 100%;
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
  details {
    display: none;
  }

  .maplibregl-popup-content, .maplibregl-popup-tip {
    background-color: transparent;
    box-shadow: none;
    border-top-color: transparent;
  }

  .maplibregl-popup-content {
    width: 13rem;
  }

  .maplibregl-popup-tip {
    visibility: hidden;
  }

  .grecaptcha-badge {
    visibility: hidden;
  }
`;

export const MapWrapper = styled.main`
  display: flex;
  flex-flow: column;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  min-height: 100svh;
  padding: 0.5rem;
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  width: 100%;
  min-height: 100svh;
  box-sizing: border-box;
  background-size: 150vw;
  background-repeat: repeat;
  justify-content: space-between;
`;

export const Main = styled.main<{ $backThumb: string }>`
  display: flex;
  flex-flow: column;
  align-items: center;
  width: 100%;

  box-sizing: border-box;
  transition: 0.3s;

  background-image: url(${({ $backThumb }) =>
    $backThumb === "true" ? "background.png" : "padrao-verde.png"});

  background-size: ${({ $backThumb }) => $backThumb === "false" && "60vw"};
  background-repeat: ${({ $backThumb }) =>
    $backThumb === "true" ? "repeat-x" : "repeat"};
  background-position: bottom;
`;

export const Section = styled.section<{ $full?: string }>`
  padding: 1rem 1rem;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 1.5rem;
  box-sizing: border-box;
  width: 100%;
  max-width: ${({ $full }) =>
    $full !== "false" ? "100%" : "var(--main-section-width)"};
`;

export const SectionTitle = styled.h2<{ variation?: "black" | "white" }>`
  font-size: 1.75rem;
  font-weight: bold;
  text-align: center;
  padding-bottom: 0.25rem;
  width: fit-content;
  border-bottom: 1px solid ${({ theme }) => theme.colors.green};
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
  height: 50svh;
`;

export const OcaImage = styled(Icon)`
  width: fit-content;
  height: 20rem;
`;

export const SpinningIcon = styled(Image)`
  width: 4rem;
  height: 4rem;
  animation: spin 2s linear infinite;
`;

export const ArticleImage = styled(Image)`
  max-width: 32rem;
  width: 100%;
  margin-bottom: 1rem;
  align-self: center;
  border-radius: 4px;
  height: fit-content;
  background: red;
  height: 10rem;
`;
