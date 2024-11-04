import { Section } from "@/app/globalStyles";
import Image from "next/image";
import styled from "styled-components";
import Link from "next/link";

export const MapSectionWrapper = styled(Section)`
  padding: 3rem 1rem;
  display: flex;
  flex-flow: column;
  align-items: center;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.salmon};
  position: relative;

  &:before {
    content: " ";
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0.05;
    background-image: url("padrao-flores.png");
    background-size: 60vw;
    background-repeat: repeat;
  }
`;

export const BoxWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  max-width: 1440px;
  height: 550px;
  width: 100%;
  box-sizing: border-box;
  z-index: 0;
  /* padding: 1rem; */
  @media screen and (max-width: 700px) {
    flex-direction: column;
  }
`;

export const TagsContainer = styled.div`
  display: flex;
  gap: 1rem;
  width: 100%;
  height: 100%;
  align-items: center;
  flex-direction: column;
  overflow-y: scroll;
  padding: 0.1rem;
  padding-right: 0.75rem;

  @media screen and (min-width: 700px) {
    max-width: 450px;
  }
`;

export const LoadingContainer = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  border: 3px solid ${({ theme }) => theme.colors.white};
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.green};
  gap: 1rem;

  img {
    filter: invert(100%);
  }

  span {
    color: ${({ theme }) => theme.colors.white};
  }
`;

export const PreviewWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  position: relative;
  width: 100%;
  max-width: 950px;
  height: 100%;
  border: 3px solid ${({ theme }) => theme.colors.white};
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.15);
`;

export const MapPoster = styled(Image)`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  border: 3px solid ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.green}80;
  border-radius: 8px;
  object-fit: cover;
`;

export const ExpandBox = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.white};
  opacity: 0.8;
  padding: 0.3rem;
  border-radius: 6px;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.25);
  cursor: pointer;
  z-index: 1;
  transition: 0.3s;

  &:hover {
    scale: 1.1;
  }
`;

export const PinBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.white};
  opacity: 0.8;
  padding: 0.3rem;
  border-radius: 6px;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.25);
  cursor: pointer;
  z-index: 1;
  transition: 0.3s;

  &:hover {
    scale: 1.1;
  }
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  order: 2;
  justify-content: space-between;
  align-items: flex-end;
  margin: 0.5rem;
  gap: 0.3rem;
`;
