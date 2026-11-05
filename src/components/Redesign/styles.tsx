"use client";

// Blocos de layout do redesign 2026, compartilhados pelas páginas novas.
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
