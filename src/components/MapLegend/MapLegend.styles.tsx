import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-flow: column;
  gap: 1rem;
  max-width: 12rem;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.white};
  min-height: 10rem;
  border-radius: 4px;
  box-sizing: border-box;
  padding: 1rem 0.75rem;
`;

export const Title = styled.h3`
  font-weight: bold;
  text-align: center;
  font-size: 1rem;
`;

export const DataLegendContainer = styled.div`
  display: flex;
  flex-flow: column;
  gap: 0.25rem;
`;

export const Color = styled.div<{ color: string }>`
  width: 2rem;
  height: 1.25rem;
  border-radius: 4px;
  background-color: ${({ color }) => color};
  box-shadow: 0px 0px 4px #cdcdcd;
  transition: 400ms;
`;

export const DataContainer = styled.div`
  display: flex;
  gap: 0.75rem;
  align-items: center;
  font-weight: bold;
  opacity: 0.7;
  width: 100%;

  &:hover {
    ${Color} {
      flex-grow: 1;
    }
  }
  /* justify-content: space-between; */
`;

export const ColorLabel = styled.span`
  font-size: 0.8rem;
`;
