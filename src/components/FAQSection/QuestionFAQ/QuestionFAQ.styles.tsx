import { Icon } from "@/components/Icon/Icon";
import styled from "styled-components";

export const SubSectionFAQ = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding-left: 0.5rem;
  transition: 100ms;
  margin-top: 0;
  margin-left: 0.5rem;
`;

export const IconWrapper = styled(Icon)`
  color: ${({ theme }) => theme.colors.black};
  transition: 100ms linear;
  flex-shrink: 0;
`;

export const FieldDetails = styled.details`
  box-sizing: border-box;
  display: flex;
  width: 100%;
  padding: 1rem 0;
  margin: 1rem;
  background-color: white;

  box-shadow: 0px 0px 4px #cdcdcd;

  &:not([open]) ${IconWrapper} {
    transform: rotate(45deg);
  }

  &[open] ${SubSectionFAQ} {
    margin-top: 1rem;
  }

  @media (min-width: 768px) {
    width: 50%;
  }
`;

export const Title = styled.h3`
  word-break: break-word;
  padding: 0.25rem;
`;

export const Summary = styled.summary`
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  cursor: pointer;
  border-radius: 4px;
  padding: 0.5rem;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  transition: 300ms;
  align-items: center;

  &:hover {
    background: #cdcdcd20;
  }
`;
