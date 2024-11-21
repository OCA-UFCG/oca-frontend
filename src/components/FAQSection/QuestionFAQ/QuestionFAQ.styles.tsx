"use client";
import { Icon } from "@/components/Icon/Icon";
import styled from "styled-components";

export const SubSectionFAQ = styled.p`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: 100ms;
  padding: 0 1rem;
  margin: 0;
`;

export const IconWrapper = styled(Icon)`
  color: ${({ theme }) => theme.colors.black};
  transition: 100ms linear;
  flex-shrink: 0;
`;

export const Summary = styled.summary`
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  cursor: pointer;
  border-radius: 4px;
  padding: 1rem;
  align-items: center;
`;

export const QuestionContainer = styled.details`
  display: flex;
  width: 100%;
  padding: 1rem 0;
  margin: 1rem;
  background-color: white;

  box-shadow: 0px 0px 2px grey;

  &:not([open]) ${IconWrapper} {
    transform: rotate(45deg);
  }

  summary:hover {
    background: #cdcdcd20;
  }

  @media (min-width: 768px) {
    width: 50%;
  }
`;

export const Title = styled.h3`
  word-break: break-word;
  font-size: 1.1rem;
  margin-right: 1rem;
`;
