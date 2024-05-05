import styled from "styled-components";
import Image from "next/image";

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  box-sizing: border-box;

  @media screen and (max-width: 800px) {
    gap: 2rem;
    flex-flow: column;
  }
`;

export const LogoImage = styled(Image)`
  height: 4rem;
  width: fit-content;

  @media screen and (max-width: 800px) {
    display: none;
  }
`;

export const Navbar = styled.nav`
  @media screen and (max-width: 800px) {
    width: 100%;
  }
`;

export const NavList = styled.ul`
  display: flex;
  align-items: flex-end;
  gap: 2rem;

  @media screen and (max-width: 800px) {
    padding: 1rem 0;
    gap: 1rem;
    flex-flow: column;
    width: 100%;
    gap: 1.5rem;
    align-items: flex-start;

  }
`;

export const NavItem = styled.li`
  transition: 0.3s;
  line-height: 1.5rem;
  font-weight: bold;
  border-bottom: thin solid transparent;
  border-left: thin solid transparent;

  a {
    display: block;
    width: 100%;
  }

  &:hover {
    opacity: 0.6;
  }

  @media screen and (min-width: 801px) {
    &:hover {
      translate: 0 -0.5rem;
      border-bottom: thin solid ${({ theme }) => theme.colors.black};
    }
  }

  @media screen and (max-width: 800px) {
    width: 100%;

    &:hover {
      padding-left: 0.5rem;
      border-left: thin solid ${({ theme }) => theme.colors.black};
    }
  }
`;
