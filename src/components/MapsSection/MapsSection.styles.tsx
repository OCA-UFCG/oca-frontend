import { Section } from "@/app/globalStyles";
import Image from "next/image";
import styled from "styled-components";
import { Icon } from "@/components/Icon/Icon";
import Link from "next/link";

export const MapSectionWrapper = styled(Section)`
  padding: 2.5rem 1rem;
  display: flex;
  flex-flow: column;
  align-items: center;
  overflow: hidden;
`;

export const BoxWrapper = styled.div`
  display: flex;
  gap: 1rem;
  max-width: 1440px;
  height: 550px;
  width: 100%;
  box-sizing: border-box;
  padding: 1rem;

  @media screen and (max-width: 700px) {
    flex-direction: column;
  }
`;

export const TagsContainer = styled.div`
  display: flex;
  gap: 1rem;
  width: 100%;
  height: 100%;
  max-width: 450px;
  align-items: center;
  flex-direction: column;
  overflow-y: scroll;
  padding: 0.1rem;
`;

export const TagButton = styled.span<{ active?: string }>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  color: ${({ theme, active }) =>
    active === "true" ? theme.colors.green : theme.colors.black};
  padding: 1rem 1rem;
  background-color: ${({ theme }) => theme.colors.white};
  width: 100%;
  font-size: 1.1rem;
  box-shadow: 0 0 4px #a3a3a3;
  border-radius: 2px;
  transition: 1s;
  z-index: 0;
  box-sizing: border-box;
  cursor: ${({ active }) => (active === "true" ? "not-allowed" : "pointer")};

  &:hover {
    transform: scale(${({ active }) => active !== "true" && "0.99"});
    color: ${({ theme }) => theme.colors.green};
    background-color: ${({ theme, active }) =>
      active === "true" ? "transparent" : theme.colors.black}10;
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
  position: relative;
  width: 100%;
  max-width: 950px;
  height: 100%;
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
  position: absolute;
  align-items: center;
  justify-content: center;
  bottom: 1rem;
  left: 1rem;
  background-color: ${({ theme }) => theme.colors.white};
  opacity: 0.8;
  padding: 8px;
  border-radius: 8px;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.25);
  cursor: pointer;
  z-index: 1;
  transition: 0.3s;

  &:hover {
    scale: 1.1;
  }
`;

export const VisuHeader = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  width: 100%;
  align-items: center;
`;

export const VisuName = styled.h3<{ active: string }>`
  align-self: flex-start;
  font-size: 1.1rem;
  color: ${({ theme, active }) =>
    active === "true" ? theme.colors.green : theme.colors.black};
`;

export const Description = styled.p<{ active?: string }>`
  color: ${({ theme }) => theme.colors.black};
  text-align: left;
  max-height: ${({ active }) => (active === "true" ? "200px" : "0")};
  opacity: ${({ active }) => (active === "true" ? "1" : "0")};
  overflow: hidden;
  transition:
    max-height 1s ease,
    opacity 1s ease;
  margin: 0;
  margin-top: ${({ active }) => (active === "true" ? "1rem" : "0")};
  font-size: 0.9rem;
`;

export const IconWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const VisuIcon = styled(Icon)<{ active?: string }>`
  width: 100%;
  height: 100%;
  color: ${({ theme, active }) =>
    active === "true" ? theme.colors.green : theme.colors.black};
`;

export const Divider = styled.div`
  height: 20px;
  border-left: 1px solid ${({ theme }) => theme.colors.black}20;
  margin: 0 1rem;
`;

export const LinkButton = styled(Link)<{ active?: string }>`
  color: ${({ theme, active }) =>
    active === "true" ? theme.colors.green : theme.colors.black};
  cursor: pointer;
  width: 100%;
  text-align: flex-end;
  transition: 0.3s;
  text-decoration: none;
  font-size: 1rem;
  font-weight: normal;
  border-radius: 4px;

  &:hover {
    opacity: 0.7;
    text-decoration: underline;
  }
`;
