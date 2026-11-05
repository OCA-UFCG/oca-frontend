"use client";

import styled from "styled-components";

const MOBILE = "max-width: 1000px";

const Band = styled.section`
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

export const Hero = styled(Band)`
  padding-top: 40px;
  background-color: ${({ theme }) => theme.colors.background};
  background-image: url("/redesign/blob-rosa.svg");

  p {
    max-width: 560px;
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

export const Channels = styled(Band)`
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Address = styled(Band)`
  background-color: #f4f8ed;
  background-image: url("/redesign/blob-verde.svg");
`;

export const Heading = styled.h2`
  margin-bottom: 24px;
  font-size: 30px;
  font-weight: 600;
  line-height: 1.2;
  color: ${({ theme }) => theme.colors.primary};
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  align-items: start;

  @media (${MOBILE}) {
    grid-template-columns: 1fr;
  }
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
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

export const Label = styled.p`
  font-size: 14px;
  line-height: 20px;
  color: ${({ theme }) => theme.colors["text-secondary"]};
`;

export const Value = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 18px;
  font-weight: 600;
  line-height: 28px;
  color: ${({ theme }) => theme.colors["text-primary"]};
  overflow-wrap: anywhere;

  a {
    font-weight: inherit;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }
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

export const Follow = styled.a`
  padding: 12px 16px;
  border-radius: 6px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors["primary-foreground"]};
  font-size: 14px;
  font-weight: 500;
  text-align: center;
  text-decoration: none;

  &:hover {
    opacity: 0.9;
  }
`;

export const Map = styled.iframe`
  width: 100%;
  height: 200px;
  border: 0;
  border-radius: 6px;
`;
