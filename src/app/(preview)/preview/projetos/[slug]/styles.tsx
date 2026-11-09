"use client";

import styled from "styled-components";
import {
  Band,
  Cards,
  MOBILE,
} from "@/app/(preview)/preview/_components/styles";

export const Banner = styled.div`
  position: relative;
  width: 100%;
  height: 180px;

  img {
    object-fit: cover;
  }
`;

export const Intro = styled(Band)`
  background-color: ${({ theme }) => theme.colors.background};

  > span {
    display: inline-block;
    padding: 0 8px;
    border: 1px solid ${({ theme }) => theme.colors.primary};
    border-radius: 999px;
    font-size: 12px;
    line-height: 18px;
    color: ${({ theme }) => theme.colors.primary};
  }

  h1 {
    margin: 4px 0 24px;
    padding-bottom: 24px;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
    font-size: 40px;
    font-weight: 600;
    line-height: 48px;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const SubHeading = styled.h2`
  margin-bottom: 24px;
  font-size: 24px;
  font-weight: 600;
  line-height: 32px;
  color: ${({ theme }) => theme.colors["text-primary"]};
`;

// O reset global justifica `p`; aqui o texto é alinhado à esquerda.
export const Text = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  font-size: 14px;
  line-height: 24px;
  color: ${({ theme }) => theme.colors["text-primary"]};

  p {
    margin: 0;
    text-align: left;
    line-height: 24px;
  }

  strong,
  a {
    font-size: 16px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors["text-primary"]};
  }
`;

export const Gallery = styled.ul`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  grid-template-rows: repeat(2, 1fr);
  gap: 24px;
  margin: 0;
  list-style: none;

  li {
    position: relative;
    aspect-ratio: 1;
    margin: 0;
    border-radius: 8px;
    overflow: hidden;
  }

  li:first-child {
    grid-row: span 2;
    aspect-ratio: auto;
  }

  img {
    object-fit: cover;
  }

  @media (${MOBILE}) {
    grid-template-columns: 1fr 1fr;
    gap: 12px;

    li:first-child {
      grid-column: span 2;
      grid-row: auto;
      aspect-ratio: 1;
    }
  }
`;

export const Light = styled(Band)`
  background-color: ${({ theme }) => theme.colors.surface};
`;

export const Platform = styled(Band)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  align-items: center;
  background-color: ${({ theme }) => theme.colors["v-900"]};

  @media (${MOBILE}) {
    grid-template-columns: 1fr;
  }

  > div {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }

  > div > img {
    width: auto;
    height: 64px;
  }

  h2 {
    font-size: 30px;
    font-weight: 600;
    line-height: 36px;
    color: ${({ theme }) => theme.colors.surface};
  }

  p {
    max-width: 560px;
    font-size: 14px;
    line-height: 24px;
    color: ${({ theme }) => theme.colors.surface};
  }

  a {
    background-color: ${({ theme }) => theme.colors.secondary};
  }
`;

export const Screenshot = styled.div`
  position: relative;
  aspect-ratio: 1280 / 620;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 8px 24px #00000040;

  img {
    object-fit: cover;
    object-position: top;
  }
`;

export const Others = styled(Cards)`
  grid-template-columns: repeat(3, 1fr);

  @media (${MOBILE}) {
    grid-template-columns: 1fr;
    grid-auto-flow: row;
    overflow-x: visible;
  }

  > li > div:first-child {
    position: relative;
    aspect-ratio: 382 / 140;
  }

  img {
    object-fit: cover;
  }

  > li > div:last-child {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px;
    font-size: 16px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors["text-primary"]};
  }

  a {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 14px;
    font-weight: 500;
    text-decoration: none;
    color: ${({ theme }) => theme.colors.primary};
  }
`;
