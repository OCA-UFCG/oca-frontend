import styled from "styled-components";

export const ContentWrapper = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
`;

export const Title = styled.h3`
  font-weight: bold;
  font-size: 1.1rem;
  &::before,
  &::after {
    content: " - ";
  }
`;

export const Description = styled.p`
  font-size: 1rem;
  text-align: center;
  margin-top: 0.5rem;
  overflow-y: scroll;
  max-height: 12rem;
`;
