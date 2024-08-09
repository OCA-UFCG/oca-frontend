import styled from "styled-components";
import { Icon } from "@/components/Icon/Icon";

export const ContentWrapper = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  gap: 2rem;
  width: 100%;
  max-width: var(--main-section-width);
  padding: 0 1rem 1rem;
  box-sizing: border-box;
  margin-top: 4rem;
`;

export const Article = styled.article`
  display: flex;
  flex-flow: column;
  align-items: center;
`;

export const OcaImage = styled(Icon)`
  width: fit-content;
  height: 15rem;
`;
