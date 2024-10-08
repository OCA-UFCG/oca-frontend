import styled from "styled-components";
import { Icon } from "../Icon/Icon";
import Link from "next/link";

export const Wrapper = styled.div`
  display: flex;
  padding: 1rem 1.5rem;
  z-index: 50;
  justify-content: space-between;
  align-items: center;
  width: 100vw;
  box-sizing: border-box;
  pointer-events: none;

  @media screen and (max-width: 1000px) {
    gap: 1rem;
    flex-flow: column;
  }
`;

export const LogoImage = styled(Icon)`
  height: 3.5rem;
  width: 3.5rem;
  pointer-events: all;

  @media screen and (max-width: 1000px) {
    display: none;
  }
`;

export const Navbar = styled.nav`
  backdrop-filter: blur(40px);
  padding: 0.5rem 0.75rem;
  background-color: #ffffff99;
  border-radius: 4px;
  border-bottom: 2px solid ${({ theme }) => theme.colors.green};
  pointer-events: all;

  @media screen and (max-width: 1000px) {
    width: 100%;
    display: none;
  }
`;

export const NavList = styled.ul`
  display: flex;
  align-items: flex-end;
  margin: 0;
  gap: 2rem;

  @media screen and (max-width: 1000px) {
    box-sizing: border-box;
    padding: 1rem 0;
    flex-flow: column;
    gap: 1rem;
    align-items: flex-start;
  }
`;

export const SocialMedia = styled.div`
  display: flex;
  gap: 0.75rem;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(40px);
  padding: 0.3rem 0.5rem;
  border-radius: 4px;
  background-color: #ffffff60;
  margin-left: 3rem;
  pointer-events: all;
`;

export const MediaWrapper = styled(Link)`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.green};
  transition: 300ms;

  &:hover {
    transform: scale(110%);
  }
`;
