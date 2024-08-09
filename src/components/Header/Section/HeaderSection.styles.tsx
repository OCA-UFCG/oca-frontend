import styled from "styled-components";
import Header from "../Header";
import { Icon } from "@/components/Icon/Icon";

export const Wrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  box-sizing: border-box;
  position: fixed;
  z-index: 10;
  padding: 1rem;
  align-items: center;
`;

export const LogoImage = styled(Icon)`
  width: 8rem;
  height: 4rem;

  @media screen and (min-width: 1000px) {
    display: none;
  }
`;

export const MainHeader = styled(Header)`
  @media screen and (max-width: 1000px) {
    display: none;
  }
`;
