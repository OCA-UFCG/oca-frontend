import styled from "styled-components";
import { getRandomColor } from "@/utils/themes";

export const Card = styled.a`
  max-width: 16rem;
  width: 100%;
  text-decoration: none;
  height: fit-content;
  padding: 1rem;

  background-color: ${({ theme }) =>
    getRandomColor([
      theme.colors.green,
      theme.colors.maroon,
      theme.colors.yellow,
      theme.colors.orange,
    ])};

  display: flex;
  flex-direction: column;
  justify-content: start;
  transition: 0.25s;

  &:hover {
    transform: scale(0.97);
  }

`;

export const Type = styled.span`
  color: white;
  opacity: 0.6;
  font-size: 1rem;
  font-weight: bold;
  padding-top: 0.3rem;
`;

export const CardTitle = styled.span`
  color: white;
  font-size: 1.25rem;
  font-weight: bold;
  width: 16rem;
  padding-top: 0.5rem;
  transition: 0.25s;
  text-decoration: none;
`;