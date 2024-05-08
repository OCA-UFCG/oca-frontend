import styled from "styled-components";
import Image from "next/image";

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  box-sizing: border-box;

  @media screen and (max-width: 1000px) {
    gap: 1rem;
    flex-flow: column;
  }
`;

export const LogoImage = styled(Image)`
  height: 4rem;
  width: fit-content;

  @media screen and (max-width: 1000px) {
    display: none;
  }
`;

export const Navbar = styled.nav`
  @media screen and (max-width: 1000px) {
    width: 100%;
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

export const NavItem = styled.li`
  transition: 0.3s;
  line-height: 1.5rem;
  list-style: none;
  border-bottom: thin solid transparent;
  border-left: thin solid transparent;
  margin: 0;

  a {
    display: block;
    text-decoration: none;
    width: 100%;
    font-style: none;
  }

  &:hover {
    opacity: 0.6;
  }

  @media screen and (min-width: 1001px) {
    &:hover {
      translate: 0 -0.25rem;
      border-bottom: thin solid ${({ theme }) => theme.colors.black};
    }
  }

  @media screen and (max-width: 1000px) {
    width: 100%;

    &:hover {
      padding-left: 0.5rem;
      border-left: thin solid ${({ theme }) => theme.colors.black};
    }
  }
`;
