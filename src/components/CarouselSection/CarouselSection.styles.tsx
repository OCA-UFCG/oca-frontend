import { Section } from "@/app/globalStyles";
import styled from "styled-components";

export const CarouselWrapperSection = styled(Section)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 1rem 1rem;
  width: 100%;
  max-width: 1440px;
  height: 100%;
  box-sizing: border-box;
`;

export const CarouselWrapper = styled.div`
  display: grid;
  background: #778c6130;
  gap: 1rem;
  width: 100%;
  height: auto;
  /* padding: 0.15rem; */
  border-radius: 0.2rem;
  aspect-ratio: 16 / 8;
  box-sizing: border-box;
  box-shadow: 0px 0px 4px #cdcdcd;

  @media (max-width: 1000px) {
    height: 80svh;
  }
`;
