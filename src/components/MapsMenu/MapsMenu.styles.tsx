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

  max-height: 24rem;
  overflow-y: scroll;
  overflow-x: hidden;
`;

export const ItemWrapper = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
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
  flex-flow: column;
  gap: 0.5rem;
  width: 100%;
  padding: 0.5rem 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.green}40;
  color: ${({ theme }) => theme.colors.green};

  &:not([open]) ${IconWrapper} {
    transform: rotate(45deg);
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
