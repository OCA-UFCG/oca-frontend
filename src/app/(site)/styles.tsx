"use client";

import styled from "styled-components";
import { Band, MOBILE } from "@/components/Redesign/styles";

const text = `
  font-size: 14px;
  line-height: 24px;
`;

export const Hero = styled(Band)`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 16px;
  min-height: 578px;
  padding-top: 134px;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors["v-950"]};

  > img {
    object-fit: cover;
    object-position: center 55%;
  }

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, #000000b3 0%, #00000059 60%, #0000 100%);
  }

  > *:not(img) {
    position: relative;
    z-index: 1;
  }

  h1 {
    max-width: 720px;
    font-size: 56px;
    font-weight: 600;
    line-height: 64px;
    color: ${({ theme }) => theme.colors.surface};

    @media (${MOBILE}) {
      font-size: 36px;
      line-height: 44px;
    }
  }

  p {
    max-width: 640px;
    font-size: 16px;
    line-height: 24px;
    color: ${({ theme }) => theme.colors.surface};
  }

  a {
    align-self: flex-start;
    margin-top: 16px;
  }
`;

export const Stats = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  width: 100%;
  box-sizing: border-box;
  margin: 0;
  padding: 40px max(104px, calc((100% - 1232px) / 2));
  list-style: none;
  background: url("/redesign/blob-bege-home.svg") no-repeat center / cover
    ${({ theme }) => theme.colors["secondary-surface"]};

  @media (${MOBILE}) {
    grid-template-columns: repeat(2, 1fr);
    padding: 32px 24px;
  }

  li {
    display: flex;
    flex-direction: column;
    gap: 4px;
    margin: 0;
    text-align: left;
    color: ${({ theme }) => theme.colors["text-secondary"]};
    font-size: 18px;
    line-height: 28px;
  }

  svg {
    color: ${({ theme }) => theme.colors.primary};
  }

  strong {
    font-size: 56px;
    font-weight: 700;
    line-height: 64px;
    color: ${({ theme }) => theme.colors["text-primary"]};
  }
`;

export const Section = styled(Band)<{ $tone: "surface" | "background" }>`
  background-color: ${({ theme, $tone }) => theme.colors[$tone]};
`;

export const SectionTop = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 24px;

  h2 {
    margin: 0;
  }

  @media (${MOBILE}) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const Eyebrow = styled.p`
  margin-bottom: 4px !important;
  font-size: 14px;
  line-height: 20px;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors["text-primary"]};
`;

// 4 cards lado a lado no desktop; no mobile vira faixa com rolagem horizontal.
export const Cards = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  margin: 0;
  list-style: none;

  @media (${MOBILE}) {
    grid-template-columns: none;
    grid-auto-flow: column;
    grid-auto-columns: min(300px, 80%);
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    padding-bottom: 8px;
  }

  > li {
    display: flex;
    flex-direction: column;
    margin: 0;
    overflow: hidden;
    text-align: left;
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 8px;
    background-color: ${({ theme }) => theme.colors.surface};
    box-shadow: 0 1px 2px #0000000d;
    scroll-snap-align: start;
  }
`;

export const PlatformCards = styled(Cards)`
  @media (min-width: 1001px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const Cover = styled.div`
  position: relative;
  aspect-ratio: 382 / 210;

  img {
    object-fit: cover;
  }

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, #0000 40%, #000000cc 100%);
  }

  span {
    position: absolute;
    z-index: 1;
    top: 12px;
    left: 12px;
    padding: 2px 8px;
    border-radius: 4px;
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors["primary-foreground"]};
    font-size: 12px;
    line-height: 16px;
  }

  h3 {
    position: absolute;
    z-index: 1;
    left: 16px;
    right: 16px;
    bottom: 16px;
    font-size: 24px;
    font-weight: 600;
    line-height: 32px;
    color: ${({ theme }) => theme.colors.surface};
  }
`;

export const Thumb = styled.div`
  position: relative;
  aspect-ratio: 382 / 185;

  img {
    object-fit: cover;
  }
`;

export const CardBody = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 16px;
  padding: 24px 16px;

  h3 {
    font-size: 24px;
    font-weight: 600;
    line-height: 32px;
    color: ${({ theme }) => theme.colors["text-primary"]};
  }

  p {
    flex: 1;
    ${text}
    color: ${({ theme }) => theme.colors["text-secondary"]};
  }
`;

export const CardFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  min-height: 24px;

  > span {
    display: flex;
    align-items: center;
    gap: 6px;
    color: ${({ theme }) => theme.colors.primary};
  }

  > span em {
    padding: 0 8px;
    border: 1px solid ${({ theme }) => theme.colors.primary};
    border-radius: 999px;
    font-size: 12px;
    font-style: normal;
    line-height: 18px;
    text-transform: uppercase;
  }

  a {
    display: flex;
    align-items: center;
    gap: 4px;
    margin-left: auto;
    font-size: 14px;
    font-weight: 500;
    text-decoration: none;
    color: ${({ theme }) => theme.colors.primary};
  }

  a:hover {
    text-decoration: underline;
  }
`;

export const Who = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
  background-color: ${({ theme }) => theme.colors["tertiary-hover"]};

  @media (${MOBILE}) {
    grid-template-columns: 1fr;
  }
`;

export const WhoPhoto = styled.div`
  position: relative;
  min-height: 424px;

  img {
    object-fit: cover;
  }

  @media (${MOBILE}) {
    min-height: 260px;
  }
`;

export const WhoText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 16px;
  padding: 48px max(80px, calc(50vw - 640px)) 48px 48px;
  box-sizing: border-box;

  @media (${MOBILE}) {
    padding: 40px 24px;
  }

  p,
  h2 {
    margin: 0;
    text-align: left;
    color: ${({ theme }) => theme.colors.surface};
  }

  p {
    max-width: 560px;
    ${text}
  }

  h2 {
    max-width: 420px;
    font-size: 30px;
    font-weight: 500;
    line-height: 36px;
  }
`;

export const Follow = styled(Band)`
  background: url("/redesign/blob-verde-home.svg") no-repeat center / cover
    ${({ theme }) => theme.colors.background};
`;

export const FollowCards = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 400px));
  gap: 24px;

  @media (${MOBILE}) {
    grid-template-columns: 1fr;
  }

  h3 {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 16px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors["text-primary"]};
  }

  p {
    flex: 1;
    ${text}
    color: ${({ theme }) => theme.colors["text-secondary"]};
  }
`;
