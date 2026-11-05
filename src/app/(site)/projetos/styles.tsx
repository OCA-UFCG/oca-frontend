"use client";

import styled from "styled-components";
import { Band, Cards, Hero, MOBILE } from "@/components/Redesign/styles";

export const HeroGrid = styled(Hero)`
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  gap: 24px 64px;

  p {
    max-width: 560px;
  }

  @media (${MOBILE}) {
    grid-template-columns: 1fr;
  }
`;

export const Numbers = styled.ul`
  display: flex;
  gap: 64px;
  margin: 0;
  list-style: none;

  @media (${MOBILE}) {
    gap: 32px;
  }

  li {
    display: flex;
    flex-direction: column;
    margin: 0;
    font-size: 20px;
    line-height: 28px;
    color: ${({ theme }) => theme.colors["text-secondary"]};
  }

  strong {
    font-size: 56px;
    font-weight: 700;
    line-height: 64px;
    color: ${({ theme }) => theme.colors["text-primary"]};
  }
`;

export const List = styled(Band)`
  background-color: ${({ theme }) => theme.colors.surface};
`;

export const Grid = styled(Cards)`
  grid-template-columns: repeat(3, 1fr);

  @media (${MOBILE}) {
    grid-template-columns: 1fr;
    grid-auto-flow: row;
    overflow-x: visible;
  }
`;
