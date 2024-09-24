import styled from "styled-components";
import { Icon } from "../Icon/Icon";

export const DownloadSelectorWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const YearSelect = styled.select`
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.white};
  border: none;
  padding: 0.5rem;
  font-size: 1rem;
  width: 5rem;
  cursor: pointer;
  text-align-last: center;

  &:disabled {
    cursor: not-allowed;
  }
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
