import styled from "styled-components";
import MenuModal from "@/components/MenuModal/MenuModal";
import Header from "../Header";
import { Icon } from "@/components/Icon/Icon";

export const Wrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 1rem;
  box-sizing: border-box;
`;

export const HeaderModal = styled(MenuModal)`
  @media screen and (min-width: 1000px) {
    display: none;
  }
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
