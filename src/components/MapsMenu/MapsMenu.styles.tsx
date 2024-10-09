import styled from "styled-components";
import { Icon } from "../Icon/Icon";

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

export const QuestionMarkImg = styled(Icon)`
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
  animation: gradient 2s ease infinite;
  animation-delay: ${({ delay }) => `${delay * 10}ms`};

  height: 2.3rem;
  width: 100%;
  border-radius: 4px;
`;

export const SubSectionWrapper = styled.div`
  display: flex;
  flex-flow: column;
  gap: 0.5rem;
  width: 100%;
  padding: 1rem 0;
`;

export const FieldDetails = styled.details`
  display: flex;
  gap: 0.5rem;
  width: 100%;
  padding: 0.5rem 0;
`;

export const Summary = styled.summary`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  font-weight: bold;
  cursor: pointer;
  color: ${({ theme }) => theme.colors["dark-gray"]};
`;

export const IconWrapper = styled(Icon)`
  color: ${({ theme }) => theme.colors.black};

  &.spin {
    animation: spin 1.5s linear infinite;
  }
`;
