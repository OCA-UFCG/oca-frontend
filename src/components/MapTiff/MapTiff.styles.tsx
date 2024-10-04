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
  padding: 0.5rem;
  gap: 0.2rem;
  background-color: white;
  border-radius: 8px;
  color: black;
  width: 12rem;
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

export const LineInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
`;

export const TotalArea = styled.h3`
  font-size: 1rem;
  width: 6.5rem;
`;

export const PercentArea = styled.h3`
  font-size: 1rem;
  font-weight: bold;
  text-align: right;
  margin-left: auto; /* Isso alinha o PercentArea à extrema direita */
  width: 2rem;
`;

export const Color = styled.div<{ color: string; percent: number }>`
  width: ${({ percent }) => percent / 30}rem;
  max-width: 100%;
  height: 1.25rem;
  border-radius: 4px;
  background-color: ${({ color }) => color};
  box-shadow: 0px 0px 4px #cdcdcd;
  transition: 400ms;
  border: solid thin #cdcdcd;
  margin-left: 0;
`;
