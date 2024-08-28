import styled from "styled-components";
import { getRandomColor } from "@/utils/themes";
import { Icon } from "../Icon/Icon";

export const IconContainer = styled.div`
  width: 0.75rem;
  height: 0.75rem;
  position: relative;
  overflow: hidden;
`;

export const ArrowIcon = styled(Icon)`
  opacity: 0.6;
  position: absolute;
  transition: 300ms;
`;

export const SecondArrowIcon = styled(Icon)`
  position: absolute;
  opacity: 0.6;
  transition: 300ms;
  transform: translate(-1rem, 1rem);
`;

export const Card = styled.a`
  min-width: 12rem;
  width: fit-content;
  box-sizing: border-box;
  text-decoration: none;
  min-height: 9rem;
  height: fit-content;
  padding: 1rem;
  grid-row: span;
  margin-bottom: 20px;
  position: relative;
  break-inside: avoid;
  overflow: hidden;
  border-radius: 4px;

  background-color: ${({ theme }) =>
    getRandomColor([
      theme.colors.green,
      theme.colors.maroon,
      theme.colors.yellow,
      theme.colors.orange,
    ])};

  display: flex;
  flex-direction: column;
  /* justify-content: space-between; */
  transition: 0.25s;

  &::before {
    content: " ";
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    opacity: 0.05;
    object-fit: cover;
    background-size: 250%;
    background-image: url("/padrao-flores.png");
  }

  &:hover {
    transform: scale(0.97);
  }

  @media screen and (max-width: 800px) {
    min-width: 18rem;
  }

  &:hover {
    ${ArrowIcon} {
      opacity: 1;
      transform: translate(1rem, -1rem);
    }

    ${SecondArrowIcon} {
      opacity: 1;
      transform: translate(0rem);
    }
  }
`;

export const TypeContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

export const Type = styled.span`
  color: white;
  opacity: 0.6;
  font-size: 1rem;
  font-weight: bold;
`;

export const CardTitle = styled.span`
  color: white;
  font-size: 1.25rem;
  font-weight: bold;
  padding-top: 0.5rem;
  transition: 0.25s;
  text-decoration: none;
`;
