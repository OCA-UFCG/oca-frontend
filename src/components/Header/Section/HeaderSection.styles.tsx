import styled from "styled-components";
import Header from "../Header";
import Image from "next/image";

export const Wrapper = styled.div`
  display: flex;
  width: 100%;
  top: 0;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  box-sizing: border-box;
  position: sticky;
  z-index: 1;
  pointer-events: none;
  background-image: url("padrao-verde.png");
  background-size: 60vw;
  background-repeat: repeat;
`;

export const LogoImage = styled(Image)`
  width: 6rem;
  height: auto;
  pointer-events: all;

  @media screen and (min-width: 1000px) {
    display: none;
  }
`;

export const MainHeader = styled(Header)`
  @media screen and (max-width: 1000px) {
    display: none;
  }
`;
