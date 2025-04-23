import Image from "next/image";
import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  gap: 0.75rem;
  align-items: center;
  width: 550px;
  max-width: 550px;

  @media screen and (max-width: 1000px) {
    width: 450px;
  }

  @media screen and (max-width: 542px) {
    flex-flow: column;
    max-width: none;
    width: 100%;
  }
`;

export const PhotoWrapper = styled.div`
  position: relative;
  flex-shrink: 0;

  &:before {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: red;
  }
`;

export const Photo = styled(Image)<{ $active: string; distance: number }>`
  object-fit: cover;
  width: ${({ $active, distance }) =>
    $active === "true" ? "26rem" : `${2 - distance / 3}rem`};
  height: ${({ $active, distance }) =>
    $active === "true" ? "17rem" : `${16 - distance / 2}rem`};
  border-radius: 4px;
  box-shadow: 0px 0px 3px #9e9e9e;
  transition: 1s ease-in-out;
  transition-property: width height;

  cursor: ${({ $active }) => ($active === "true" ? "" : "pointer")};
  position: relative;
  opacity: ${({ $active }) => ($active === "true" ? "1" : "0.7")};

  @media screen and (max-width: 1000px) {
    width: ${({ $active, distance }) =>
      $active === "true" ? "20rem" : `${2.5 - distance / 3}rem`};
    height: ${({ $active, distance }) =>
      $active === "true" ? "14rem" : `${12 - distance / 2}rem`};
  }

  @media screen and (max-width: 540px) {
    height: ${({ $active, distance }) =>
      $active === "true" ? "15rem" : `${2.5 - distance / 3}rem`};
    width: ${({ $active, distance }) =>
      $active === "true" ? "100%" : `calc(100% - ${distance}rem)`};
  }
`;
