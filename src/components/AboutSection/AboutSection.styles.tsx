import styled from "styled-components";

export const TextContainer = styled.div`
  display: flex;
  align-items: self-start;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  max-width: 1000px;
  min-height: 60vh;
  flex-grow: 2;

  ol,
  ul {
    margin-left: 1rem;
    width: auto;
  }

  @media screen and (max-width: 980px) {
    align-items: center;
    text-align: center;
  }
`;
