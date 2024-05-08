import styled from "styled-components";
import Image from "next/image";
import MenuModal from "@/components/MenuModal/MenuModal";
import Header from "../Header";

export const Wrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 1rem;
  box-sizing: border-box;
`;

export const HeaderModal = styled(MenuModal)`
  @media screen and (min-width: 800px) {
    display: none;
  }
`;

export const LogoImage = styled(Image)`
  max-width: 8rem;
  height: fit-content;
  @media screen and (min-width: 800px) {
    display: none;
  }
`;

export const MainHeader = styled(Header)`

  @media screen and (max-width: 800px) {
    display: none;
  }
`