import Image from "next/image";
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

export const ItemWrapper = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

export const QuestionMarkImg = styled(Image)`
  max-width: 1rem;
  height: fit-content;
  transition: 300ms;
  cursor: pointer;

  &:hover {
    opacity: 0.6;
    transform: scale(0.97);
  }
`;

export const NoDataContainer = styled.div`
  display: flex;
  flex-flow: column;
  gap: 0.5rem;
  width: 100%;
  height: fit-content;
  padding: 1rem 0;
`;

export const NoDataElement = styled.div<{ delay: number }>`
  background: linear-gradient(
    -45deg,
    rgba(242, 242, 242, 60) 44%,
    rgba(222, 222, 222, 60) 48%,
    rgba(242, 242, 242, 60) 52%
  );
  background-size: 600% 1500%;
  opacity: 0.6;
  animation: gradient 3s ease infinite;
  animation-delay: ${({ delay }) => `${delay * 10}ms`};

  height: 2.3rem;
  width: 100%;
  border-radius: 4px;
`;
