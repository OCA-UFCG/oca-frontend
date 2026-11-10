"use client";

import styled from "styled-components";
import { Band, MOBILE } from "@/components/Redesign/styles";

export const Lines = styled(Band)`
  background-color: ${({ theme }) => theme.colors.surface};

  > p:not(:first-child) {
    margin-bottom: 24px;
    font-size: 16px;
    line-height: 24px;
    color: ${({ theme }) => theme.colors["text-primary"]};
  }

  ul {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
    margin: 0;
    list-style: none;

    @media (${MOBILE}) {
      grid-template-columns: 1fr;
    }
  }

  li {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    isolation: isolate;
    min-height: 72px;
    margin: 0;
    padding: 12px 24px;
    overflow: hidden;
    border-radius: 6px;
    text-align: center;
    font-size: 18px;
    font-weight: 600;
    line-height: 26px;
    color: ${({ theme }) => theme.colors.surface};
  }

  li img {
    z-index: -1;
    object-fit: cover;
    filter: brightness(0.45);
  }

  li > span {
    position: relative;
    color: ${({ theme }) => theme.colors.surface};
    text-shadow: 0 1px 2px #00000080;
  }
`;

export const Filters = styled(Band)`
  background-color: #eeeded;

  form {
    display: grid;
    grid-template-columns: 1fr repeat(2, 200px) auto;
    gap: 8px;

    @media (${MOBILE}) {
      grid-template-columns: 1fr;
    }
  }

  input,
  select {
    box-sizing: border-box;
    width: 100%;
    padding: 10px 12px;
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 6px;
    background-color: ${({ theme }) => theme.colors.surface};
    font: inherit;
    font-size: 14px;
    color: ${({ theme }) => theme.colors["text-primary"]};
  }

  button[type="submit"] {
    padding: 10px 16px;
    border: none;
    border-radius: 6px;
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors["primary-foreground"]};
    font: inherit;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
  }
`;

export const Active = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  margin-top: 16px;
  font-size: 14px;
  color: ${({ theme }) => theme.colors["text-primary"]};

  strong {
    font-weight: 600;
  }

  button {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 2px 8px;
    border: 1px solid ${({ theme }) => theme.colors.primary};
    border-radius: 999px;
    background: none;
    font: inherit;
    font-size: 12px;
    color: ${({ theme }) => theme.colors["text-primary"]};
    cursor: pointer;
  }

  button:last-child {
    border: none;
    color: #c0392b;
    font-size: 14px;
  }
`;

export const Results = styled(Band)`
  background-color: ${({ theme }) => theme.colors.surface};

  > div:first-child {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 16px;
    font-size: 14px;
    color: ${({ theme }) => theme.colors["text-primary"]};
  }

  > ul {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
    margin: 0;
    list-style: none;

    @media (${MOBILE}) {
      grid-template-columns: 1fr;
    }
  }

  > ul > li {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin: 0;
    padding: 20px;
    border-radius: 8px;
    background-color: ${({ theme }) => theme.colors.background};
    text-align: left;
  }

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  header span {
    padding: 2px 8px;
    border-radius: 999px;
    background-color: ${({ theme }) => theme.colors.secondary};
    color: ${({ theme }) => theme.colors.surface};
    font-size: 12px;
    font-weight: 500;
  }

  header small {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 14px;
    color: ${({ theme }) => theme.colors.primary};
  }

  h3 {
    font-size: 20px;
    font-weight: 600;
    line-height: 28px;
    color: ${({ theme }) => theme.colors["text-primary"]};
  }

  ul p {
    margin: 0;
    font-size: 14px;
    line-height: 22px;
    text-align: left;
    color: ${({ theme }) => theme.colors["text-secondary"]};
  }

  ul p:last-of-type {
    flex: 1;
    font-style: italic;
  }

  ul a {
    display: flex;
    align-items: center;
    gap: 4px;
    align-self: flex-end;
    font-size: 14px;
    font-weight: 500;
    text-decoration: none;
    color: ${({ theme }) => theme.colors.primary};
  }
`;
