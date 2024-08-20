import styled from "styled-components";
import MenuModal from "@/components/MenuModal/MenuModal";

export const Modal = styled(MenuModal)`
  pointer-events: all;

  @media screen and (min-width: 1000px) {
    display: none;
  }
`;

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

export const Navbar = styled.nav``;

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

export const ItemWrapper = styled.div`
  display: flex;
  flex-flow: column;
  gap: 1rem;
`;

export const ChildrenWrapper = styled.div`
  display: flex;
  flex-flow: column;
  padding-left: 1rem;
  gap: 1rem;
`;

export const HeaderItem = styled.a`
  text-decoration: none;
  font-weight: normal;
  border-left: 2px solid transparent;
  padding-left: 0.5rem;
  transition: 300ms;

  &:hover {
    opacity: 0.6;
    font-weight: bold;
    border-color: #444;
  }
`;
