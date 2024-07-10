import styled from "styled-components";
import { Icon } from "../Icon/Icon";

export const Wrapper = styled.div`
  display: flex;
  flex-flow: column;
  width: fit-content;
  min-width: 12rem;
  max-width: 24rem;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 4px;
  gap: 1rem;
  box-sizing: border-box;
  padding: 0.75rem;
  z-index: 4;
`;

export const HeaderContainer = styled.div`
  display: flex;
  gap: 1rem;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

export const Title = styled.h3`
  font-weight: bold;
  font-size: 0.9rem;
`;

export const SubtractImage = styled(Icon)<{ retracted: string }>`
  ${({ retracted }) =>
    retracted === "retracted" && "transform: rotate(180deg)"};
  transition: 0.3s;
  width: 0.75rem;
  height: fit-content;
`;

export const ContentContainer = styled.div<{ retracted: string }>`
  display: ${({ retracted }) => (retracted !== "retracted" ? "flex" : "none")};
  flex-flow: column;
  gap: 0.5rem;
`;

export const DataLegendContainer = styled.div`
  transition: height 0.5s ease-in-out;
  display: flex;

  flex-flow: column;
  gap: 6px;
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

export const DataContainer = styled.div`
  display: flex;
  gap: 0.75rem;
  align-items: center;
  width: 100%;

  &:hover {
    ${Color} {
      flex-grow: 1;
    }
  }
  justify-content: space-between;
`;

export const ColorLabel = styled.span`
  font-weight: bold;
  font-size: 0.8rem;
  opacity: 0.8;
`;

export const Measurement = styled.span`
  flex-grow: 1;
  text-align: end;
  font-size: 0.75rem;
  opacity: 0.9;
`;

export const MetaInfoContainer = styled.div`
  display: flex;
  flex-flow: column;
  gap: 0.2rem;
`;

export const MetaInfo = styled.span`
  font-size: 0.6rem;
  opacity: 0.7;
`;
