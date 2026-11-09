"use client";

import styled from "styled-components";
import { Band, MOBILE } from "@/app/(preview)/preview/_components/styles";

export const Channels = styled(Band)`
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Address = styled(Band)`
  background-color: #f4f8ed;
  background-image: url("/redesign/blob-verde.svg");
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

export const MapFrame = styled.iframe`
  width: 100%;
  height: 200px;
  border: 0;
  border-radius: 6px;
`;

export const Lead = styled.p`
  text-align: left;
`;
