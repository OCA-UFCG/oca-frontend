import { Section } from "@/app/globalStyles";
import styled from "styled-components";

export const CarouselWrapperSection = styled(Section)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  /* max-width: 1440px; */
  height: 100vh;
  box-sizing: border-box;
`;

export const CarouselWrapper = styled.div`
  display: grid;
  background: #778c6130;
  gap: 1rem;
  width: 100%;
  height: 100%;
  /* padding: 0.5rem; */
  border-radius: 0.2rem;
  aspect-ratio: 16 / 8;
  box-sizing: border-box;

  @media (max-width: 768px) {
    aspect-ratio: 10 / 8;
  }
`;
