import styled from "styled-components";
import Image from "next/image";

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

export const Article = styled.article`
  display: flex;
  flex-flow: column;
  align-items: center;
`;

export const OcaImage = styled(Image)`
  width: fit-content;
  height: 15rem;
`;
