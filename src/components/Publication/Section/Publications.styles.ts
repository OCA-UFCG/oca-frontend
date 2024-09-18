"use client";
import { Section } from "@/app/globalStyles";
import styled from "styled-components";

export const Wrapper = styled(Section)`
  margin: 2rem 0;
`;

export const PublicationsContainer = styled.div`
  column-count: 4;
  flex-wrap: wrap;
  justify-content: center;
  padding: 1rem;
  align-items: center;
  gap: 1rem;

  @media screen and (max-width: 1000px) {
    column-count: 3;
  }

  @media screen and (max-width: 700px) {
    column-count: 2;
  }

  @media screen and (max-width: 600px) {
    column-count: 1;
  }
`;
