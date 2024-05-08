import { SectionTitle } from "@/app/globalStyles";
import Image from "next/image";
import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: 3rem;
  padding: 0 1rem;
  box-sizing: border-box;
  max-width: var(--main-section-width);

  @media screen and (max-width: 980px) {
    align-items: center;
    flex-direction: column;
  }
`;

export const TextContainer = styled.div`
  display: flex;
  align-items: self-start;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  max-width: 800px;
  flex-grow: 2;

  @media screen and (max-width: 980px) {
    align-items: center;
    text-align: center;
  }
`;

export const Title = styled(SectionTitle)`
  text-align: start;
`;

export const CactusImage = styled(Image)`
  max-width: 24rem;
  height: fit-content;
  flex-grow: 1;

  @media screen and (max-width: 980px) {
    max-width: 20rem;
  }
`;