import { Section } from "@/app/globalStyles";
import styled from "styled-components";

export const CarouselSection = styled(Section)`
  flex-direction: row;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
`;

export const CarouselWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  background: #778c6130;
  gap: 1rem;
  width: 100%;
  height: 40rem;
  max-width: 1440px;
  padding: 0.75rem;
  border-radius: 0.2rem;
  box-sizing: border-box;
`;
