"use client";

import styled from "styled-components";
import { SectionTitle } from "../globalStyles";

export const ContentWrapper = styled.div`
  display: flex;
  flex-flow: column;
  padding: 1rem;
  overflow-x: scroll;
  max-width: 100%;
  box-sizing: border-box;
`;

export const Title = styled(SectionTitle)`
  margin-bottom: 1.5rem;
  align-self: center;
`;
