"use client";

import styled from "styled-components";
import { SectionTitle } from "../globalStyles";

export const Wrapper = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  padding: 1rem;
  box-sizing: border-box;
  max-width: 100%;
`;

export const ContentWrapper = styled.div`
  overflow-x: scroll;
  max-width: 100%;
  box-shadow: 0px 0px 3px #cdcdcd;
`;

export const Title = styled(SectionTitle)`
  margin-bottom: 1.5rem;
`;
