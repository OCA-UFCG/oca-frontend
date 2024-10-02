import styled from "styled-components";
import { Icon } from "../Icon/Icon";

export const Wrapper = styled.div<{ loading: string }>`
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

export const MapContainer = styled.div<{ loading: string }>`
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column;
  gap: 0.5rem;
  justify-content: center;
  color: ${({ theme }) => theme.colors.white};
  align-items: center;
  background: ${({ loading }) => (Boolean(loading) ? "#00000080" : "")};
  background-image: url("flower-background.png");
  color: ${({ theme }) => theme.colors.white};
`;

export const LoadingText = styled.span`
  color: inherit;
`;

export const Loading = styled(Icon)`
  animation: spin 1.5s linear infinite;
`;

export const PopupContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  gap: 5px;
  background-color: white;
  border-radius: 8px;
  color: black;
`;

export const Title = styled.h3`
  font-weight: bold;
  font-size: 1.1rem;
`;

export const Subtitle = styled.h4`
  font-size: 0.8rem;
  opacity: 0.7;
`;

export const TopHeader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;

export const BoxArea = styled.div`
  width: 5rem;
`;

export const TotalArea = styled.h3`
  font-size: 1rem;
  min-width: 7rem;
`;

export const PercentArea = styled.h3`
  font-size: 1rem;
  font-weight: bold;
  min-width: 3rem;
`;

export const LineInfo = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
`;

export const Color = styled.div<{ color: string }>`
  width: 2.5rem;
  box-sizing: border-box;
  height: 1.25rem;
  border-radius: 4px;
  background-color: ${({ color }) => color};
  box-shadow: 0px 0px 4px #cdcdcd;
  transition: 400ms;
  border: solid thin #cdcdcd;
`;
