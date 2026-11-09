"use client";

import styled from "styled-components";
import {
  Band,
  Cards,
  MOBILE,
} from "@/app/(preview)/preview/_components/styles";

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
