"use client";

import Image from "next/image";
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

export const CoverImage = styled(Image)`
  aspect-ratio: 16 / 9;
  object-fit: cover;
  max-width: 1000px;
  width: 100%;
  height: auto;
  border-radius: 8px;
`;
