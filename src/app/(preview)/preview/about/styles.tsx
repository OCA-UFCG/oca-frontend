"use client";

import styled from "styled-components";
import { Band, MOBILE } from "@/app/(preview)/preview/_components/styles";

const text = `
  font-size: 14px;
  line-height: 24px;
`;

export const Who = styled(Band)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.surface};

  @media (${MOBILE}) {
    grid-template-columns: 1fr;
  }

  p {
    ${text}
    color: ${({ theme }) => theme.colors["text-primary"]};
  }
`;

export const UfcgNote = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  margin-top: 24px;
  padding: 24px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors["secondary-surface"]};

  img {
    flex-shrink: 0;
  }
`;

export const Photo = styled.div<{ $ratio: string }>`
  position: relative;
  aspect-ratio: ${({ $ratio }) => $ratio};
  border-radius: 8px;
  overflow: hidden;

  img {
    object-fit: cover;
  }
`;

export const Territory = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;

  @media (${MOBILE}) {
    grid-template-columns: 1fr;
  }
`;

export const TerritoryText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 24px;
  padding: 48px 48px 48px max(80px, calc(50vw - 640px));
  box-sizing: border-box;
  background: url("/redesign/blob-verde-sobre.svg") no-repeat center / cover
    #632a24;

  @media (${MOBILE}) {
    padding: 40px 24px;
  }

  h2 {
    max-width: 420px;
    font-size: 30px;
    font-weight: 500;
    line-height: 36px;
    color: ${({ theme }) => theme.colors.white};
  }

  p {
    max-width: 560px;
    margin: 0;
    text-align: left;
    ${text}
    color: ${({ theme }) => theme.colors.white};
  }
`;

export const TerritoryPhoto = styled.div`
  position: relative;
  min-height: 408px;

  img {
    object-fit: cover;
  }

  @media (${MOBILE}) {
    min-height: 260px;
  }
`;

export const Acting = styled(Band)`
  background-color: ${({ theme }) => theme.colors["secondary-surface"]};
`;

export const ActingTop = styled.div`
  display: grid;
  grid-template-columns: 1fr 465px;
  gap: 24px;
  align-items: start;

  @media (${MOBILE}) {
    grid-template-columns: 1fr;
  }

  h3 {
    margin-bottom: 8px;
    font-size: 18px;
    font-weight: 600;
    line-height: 28px;
    color: ${({ theme }) => theme.colors["text-primary"]};
  }

  p {
    ${text}
    color: ${({ theme }) => theme.colors["text-primary"]};
  }
`;

export const Pillars = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin: 24px 0 0;
  list-style: none;

  @media (${MOBILE}) {
    grid-template-columns: 1fr;
  }

  li {
    display: flex;
    align-items: center;
    gap: 8px;
    margin: 0;
    text-align: left;
    padding: 12px 16px;
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 8px;
    background-color: ${({ theme }) => theme.colors.surface};
    font-size: 24px;
    font-weight: 500;
    line-height: 32px;
    color: ${({ theme }) => theme.colors["text-primary"]};
  }
`;

export const Work = styled(Band)`
  background-color: ${({ theme }) => theme.colors.background};

  > p {
    max-width: 640px;
    ${text}
    color: ${({ theme }) => theme.colors["text-primary"]};
  }

  h3 {
    margin: 24px 0;
    font-size: 16px;
    line-height: 24px;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const Areas = styled.ol`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  margin: 0;
  list-style: none;

  @media (${MOBILE}) {
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  }

  li {
    margin: 0;
    text-align: left;
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 8px;
    overflow: hidden;
    background-color: ${({ theme }) => theme.colors.surface};
  }

  span {
    display: block;
    padding: 24px 16px 4px;
    font-size: 14px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.secondary};
  }

  h4 {
    padding: 0 16px 24px;
    font-size: 24px;
    font-weight: 500;
    line-height: 32px;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const Partners = styled(Band)`
  background-color: ${({ theme }) => theme.colors.surface};
`;
