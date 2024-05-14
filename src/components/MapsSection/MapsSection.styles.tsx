import { Section } from "@/app/globalStyles";
import Image from "next/image";
import styled from "styled-components";

export const Wrapper = styled(Section)`
  padding: 2.5rem 1rem;
  background-color: ${({ theme }) => theme.colors.green};
  background-image: url("flower-background.png");
  background-repeat: repeat;
  background-size: 40rem;
  display: flex;
  flex-flow: column;
  align-items: center;
  overflow: hidden;
`;

export const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  max-width: 600px;

  @media screen and (max-width: 700px) {
    justify-content: flex-start;
    align-items: center;
    max-width: 100vw;
    padding: 0 1rem 0.5rem 1rem;
    box-sizing: border-box;
    height: fit-content;
    flex-wrap: nowrap;
    overflow: scroll;
    -ms-overflow-style: none; /* IE and Edge */
    overflow-y: hidden;
  }
`;

export const Tag = styled.span<{ active?: string }>`
  color: ${({ theme, active }) =>
    active === "true" ? theme.colors.green : theme.colors.white};
  opacity: ${({ active }) => (active === "true" ? 0.6 : 1)};
  transform: scale(${({ active }) => (active === "true" ? 0.9 : 1)});
  padding: 0.25rem 1rem;
  font-weight: bold;
  border: 2px solid ${({ theme }) => theme.colors.white};
  border-radius: 2px;
  transition: 0.3s;
  text-wrap: nowrap;
  cursor: ${({ active }) => (active === "true" ? "not-allowed" : "pointer")};
  background-color: ${({ theme, active }) =>
    active === "false" ? "transparent" : theme.colors.white};

  &:hover {
    transform: scale(${({ active }) => active !== "true" && "0.97"});
    color: ${({ theme }) => theme.colors.green};
    background-color: ${({ theme }) => theme.colors.white};
  }
`;

export const MapPoster = styled(Image)`
  max-width: 600px;
  width: 100%;
  height: fit-content;
  box-sizing: border-box;
  border: 3px solid ${({ theme }) => theme.colors.white};
  height: 350px;
  border-radius: 8px;
  object-fit: cover;
`;

export const VisuName = styled.h3`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.white};
`;

export const Description = styled.p`
  color: ${({ theme }) => theme.colors.white};
  text-align: center;
  max-width: 600px;
`;
