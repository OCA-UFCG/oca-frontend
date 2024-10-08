"use client";

import styled from "styled-components";

export const ContentWrapper = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  gap: 2rem;
  width: 100%;
  max-width: var(--main-section-width);
  padding: 0 1rem 1rem;
  box-sizing: border-box;
`;

export const Carousel = styled.div`
  border: 1px red solid;
  display: flex;
  height: fit-content;
  width: 800px;
  height: 300px;
  overflow: hidden;
`;
