"use client";

// Blocos de layout do redesign 2026, compartilhados pelas páginas novas.
import Link from "next/link";
import styled from "styled-components";

export const MOBILE = "max-width: 1000px";

// Faixa de largura total com conteúdo limitado a 1280 px (80 px de margem em 1440).
export const Band = styled.section`
  width: 100%;
  box-sizing: border-box;
  padding: 48px max(80px, calc((100% - 1280px) / 2));
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;

  @media (${MOBILE}) {
    padding: 40px 24px;
  }

  p {
    margin: 0;
    text-align: left;
  }
`;

export const Hero = styled(Band)<{ $blob: string }>`
  padding-top: 40px;
  background-color: ${({ theme }) => theme.colors.background};
  background-image: url(${({ $blob }) => $blob});

  p {
    margin-top: 8px;
    font-size: 14px;
    line-height: 24px;
    color: ${({ theme }) => theme.colors["text-primary"]};
  }
`;

export const Title = styled.h1`
  font-size: 48px;
  font-weight: 700;
  line-height: 1.2;
  color: ${({ theme }) => theme.colors["text-primary"]};
`;

export const Heading = styled.h2`
  margin-bottom: 24px;
  font-size: 30px;
  font-weight: 600;
  line-height: 1.2;
  color: ${({ theme }) => theme.colors.primary};
`;

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 24px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.surface};
  box-shadow: 0 1px 2px #0000000d;
`;

export const IconBadge = styled.span`
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors["primary-foreground"]};

  svg {
    color: inherit;
  }
`;

export const Posts = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 4px;

  a {
    position: relative;
    aspect-ratio: 1;
  }

  img {
    object-fit: cover;
  }
`;

export const Logos = styled.ul`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 48px;
  margin: 0;
  list-style: none;

  li {
    margin: 0;
  }

  img {
    width: auto;
    height: 80px;
  }

  @media (${MOBILE}) {
    gap: 24px;

    img {
      height: 48px;
    }
  }
`;

export const ButtonLink = styled(Link)<{ $small?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: ${({ $small }) => ($small ? "8px 12px" : "12px 16px")};
  border-radius: 6px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors["primary-foreground"]};
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  text-decoration: none;
  white-space: nowrap;

  svg {
    color: inherit;
  }

  &:hover {
    opacity: 0.9;
  }
`;

export const SparkleSvg = styled.svg<{ $size: number; $floating?: boolean }>`
  flex-shrink: 0;
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  fill: ${({ $floating }) => ($floating ? "#fff" : "#e6eed9")};
  ${({ $floating }) =>
    $floating && "position: absolute; z-index: 1; left: 40px; bottom: 24px;"}
`;
