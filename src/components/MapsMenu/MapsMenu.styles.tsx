import styled from "styled-components";
import { Icon } from "../Icon/Icon";

export const ContentWrapper = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
`;

export const Form = styled.form`
  display: flex;
  flex-flow: column;
  box-sizing: border-box;
  width: 20rem;
  padding-right: 0.3rem;

  overflow-y: scroll;
  overflow-x: hidden;
`;

export const ItemWrapper = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

export const InfoContainer = styled.div`
  margin-right: 0.45rem;
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
  transition: 100ms;
  margin-top: 0;
`;

export const IconWrapper = styled(Icon)`
  color: ${({ theme }) => theme.colors.black};
  transition: 100ms linear;
`;

export const FieldDetails = styled.details`
  box-sizing: border-box;
  display: flex;
  gap: 0.5rem;
  width: 100%;
  padding: 0.5rem 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.green}40;
  color: ${({ theme }) => theme.colors.green};

  &:not([open]) ${IconWrapper} {
    transform: rotate(45deg);
  }

  &[open] ${SubSectionWrapper} {
    margin-top: 1rem;
  }

  &:not([open]) ${SubSectionWrapper} {
    margin-top: 0rem;
  }
`;

export const Title = styled.h3`
  font-weight: bold;
  transition: 300ms;
`;

export const Summary = styled.summary`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  font-weight: bold;
  cursor: pointer;
  border-radius: 4px;
  padding: 0.5rem;
  box-sizing: border-box;
  margin-left: 1px;
  transition: 300ms;

  &:hover {
    background: #cdcdcd20;
  }

  &:hover ${Title}, &:hover ${IconWrapper} {
    color: ${({ theme }) => theme.colors.green};
  }
`;
