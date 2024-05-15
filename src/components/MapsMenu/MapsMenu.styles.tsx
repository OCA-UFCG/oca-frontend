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

export const Form = styled.form`
  display: flex;
  flex-flow: column;
  gap: 0.5rem;
  width: 100%;
  padding: 1.5rem 0 1rem 0;
`;
