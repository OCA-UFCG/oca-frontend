"use client";

import styled from "styled-components";

export const Wrapper = styled.div<{ alignment: string }>`
  display: flex;
  flex-flow: column;
  gap: 1rem;
  max-width: 900px;
  align-items: ${({ alignment }) => alignment};
`;

export const SubTitle = styled.h2`
  font-size: 1rem;
  color: #00000080;
  margin-bottom: 1rem;
  align-self: center;
  text-align: center;
  width: fit-content;
  padding: 0 1rem;
`;
