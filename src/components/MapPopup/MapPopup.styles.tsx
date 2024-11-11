import styled from "styled-components";

export const PopupContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  gap: 0.75rem;
  background-color: white;
  border-radius: 4px;
  min-width: 16rem;
`;

export const Title = styled.h3`
  font-weight: bold;
  font-size: 1.1rem;
`;

export const Subtitle = styled.h4`
  font-size: 0.8rem;
  opacity: 0.7;
  font-weight: normal;
`;

export const TopHeader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;

export const InfoContent = styled.div`
  display: flex;
  flex-flow: column;
  gap: 0.5rem;
`;

export const LineInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  width: 100%;
`;

export const TotalArea = styled.h3`
  font-size: 0.75rem;
  font-weight: normal;
  width: 100%;
  white-space: nowrap;
`;

export const PercentArea = styled.h3`
  font-size: 1rem;
  font-weight: bold;
`;

export const Color = styled.div<{ color: string; $percent: number }>`
  width: ${({ $percent }) => `${$percent / 10}rem`};
  max-width: 100%;
  min-width: 0.2rem;
  height: 1.25rem;
  border-radius: 4px;
  background-color: ${({ color }) => color};
  box-shadow: 0px 0px 4px #cdcdcd;
  transition: 400ms;
  border: solid thin #cdcdcd;
  margin-left: 0;
`;
