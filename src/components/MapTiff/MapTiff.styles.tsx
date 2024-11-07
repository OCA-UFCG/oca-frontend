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
  background-image: url("flower-background.webp");
  color: ${({ theme }) => theme.colors.white};
`;

export const LoadingText = styled.span`
  color: inherit;
`;

export const Loading = styled(Icon)`
  animation: spin 1.5s linear infinite;
`;
