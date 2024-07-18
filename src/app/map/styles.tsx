import Image from "next/image";
import styled from "styled-components";

export const MapContainer = styled.div`
  width: 100vw;
  height: 100svh;
  position: absolute;
  box-sizing: border-box;
  left: 0;
  top: 0;
  z-index: 0;
`;

export const HeaderWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  pointer-events: none;
  box-sizing: border-box;
`;

export const MenuWrapper = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  z-index: 1;
  pointer-events: auto;
`;

export const HomeImage = styled(Image)`
  transition: 0.2s;
  cursor: pointer;
  width: 2rem;
  height: auto;
  box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  &:hover {
    transform: scale(1.05);
  }
`;

export const NameContainer = styled.div`
  display: flex;
  pointer-events: auto;
  gap: 1rem;
  z-index: 0;

  max-width: 18rem;
  border-radius: 4px;
  padding: 0.25rem 1rem;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
  border-radius: 4px;

  @media screen and (max-width: 400px) {
    max-width: 14rem;
  }
`;

export const VisuName = styled.h1`
  font-size: 1rem;
  font-weight: bold;
`;

export const QuestionWrapper = styled.div`
  width: fit-content;
  height: 100%;
  display: flex;
  align-items: center;
`;
export const QuestionImage = styled(Image)`
  transition: 0.2s;
  cursor: pointer;

  &:hover {
    opacity: 0.6;
  }
`;

export const MapLegendContainer = styled.div`
  margin: auto 0 0 auto;
  z-index: 0;
`;
