import styled from "styled-components";
import { Icon } from "../Icon/Icon";

export const Wrapper = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  padding: 1rem 1.5rem;
  z-index: 50;
  justify-content: space-between;
  align-items: center;
  width: 100vw;
  box-sizing: border-box;

  @media screen and (max-width: 1000px) {
    gap: 1rem;
    flex-flow: column;
  }
`;

export const LogoImage = styled(Icon)`
  height: 4rem;
  width: 8rem;

  @media screen and (max-width: 1000px) {
    display: none;
  }
`;

export const Navbar = styled.nav`
  backdrop-filter: blur(40px);
  padding: 0.5rem 0.75rem;
  background-color: #ffffff98;
  border: 1px solid #44444410;
  border-radius: 4px;
  box-shadow: 0px 0px 4px #00000015;

  @media screen and (max-width: 1000px) {
    width: 100%;
    display: none;
  }
`;

export const NavList = styled.ul`
  display: flex;
  align-items: flex-end;
  gap: 2rem;

  @media screen and (max-width: 1000px) {
    box-sizing: border-box;
    padding: 1rem 0;
    flex-flow: column;
    gap: 1rem;
    align-items: flex-start;
  }
`;
