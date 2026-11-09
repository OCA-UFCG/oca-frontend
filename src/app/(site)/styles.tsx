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

export const Eyebrow = styled.p`
  margin-bottom: 4px !important;
  font-size: 14px;
  line-height: 20px;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors["text-primary"]};
`;

export const Thumb = styled.div`
  position: relative;
  aspect-ratio: 382 / 185;

  img {
    object-fit: cover;
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
