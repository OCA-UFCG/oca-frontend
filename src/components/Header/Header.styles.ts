import styled, { css } from "styled-components";
import Link from "next/link";
import Image from "next/image";

const MOBILE = "max-width: 1000px";

// Na Home o header fica por cima da foto do hero: faixa escura translúcida com
// desfoque, texto branco
// no desktop (no mobile o painel do menu é branco, então as cores não mudam).
const overlay = css`
  position: absolute;
  background-color: #1414157a;
  backdrop-filter: blur(8px);
  border-bottom: 1px solid #ffffff33;

  > a img {
    filter: brightness(0) invert(1);
  }

  @media (min-width: 1001px) {
    > ul > li > a:not([aria-current]),
    > ul > li > button {
      color: ${({ theme }) => theme.colors.surface};
    }

    > ul > li > a:not([aria-current]):hover {
      background-color: #ffffff26;
    }

    > ul > li > button {
      border-color: ${({ theme }) => theme.colors.border};
    }
  }
`;

export const Bar = styled.header<{ $overlay: boolean }>`
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  box-sizing: border-box;
  padding: 18px 80px;
  background-color: ${({ theme }) => theme.colors.surface};
  border-bottom: 2px solid ${({ theme }) => theme.colors["primary-disabled"]};

  @media (${MOBILE}) {
    padding: 18px 24px;
  }

  ${({ $overlay }) => $overlay && overlay}
`;

export const LogoImage = styled(Image)`
  display: block;
  width: 99px;
  height: auto;
`;

export const MenuButton = styled.button`
  display: none;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  color: ${({ theme }) => theme.colors["text-primary"]};
  background-color: ${({ theme }) => theme.colors.background};

  @media (${MOBILE}) {
    display: flex;
  }
`;

export const NavList = styled.ul<{ $open: boolean }>`
  display: flex;
  align-items: center;
  gap: 24px;
  width: auto;
  margin: 0;
  list-style: none;

  @media (${MOBILE}) {
    display: ${({ $open }) => ($open ? "flex" : "none")};
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    flex-direction: column;
    align-items: stretch;
    gap: 4px;
    padding: 12px 24px 24px;
    box-sizing: border-box;
    background-color: ${({ theme }) => theme.colors.surface};
    border-bottom: 2px solid ${({ theme }) => theme.colors["primary-disabled"]};
  }
`;

export const Submenu = styled.ul`
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  min-width: 200px;
  width: auto;
  margin: 0;
  padding: 4px;
  list-style: none;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 6px;
  background-color: ${({ theme }) => theme.colors.surface};
  box-shadow: 0 1px 2px #0000000d;

  li {
    margin: 0;
  }

  @media (${MOBILE}) {
    display: block;
    position: static;
    border: none;
    box-shadow: none;
    padding: 0 0 0 16px;
  }
`;

export const NavItem = styled.li`
  position: relative;
  margin: 0;

  &:hover ${Submenu}, &:focus-within ${Submenu} {
    display: block;
  }

  &:hover svg,
  &:focus-within svg {
    transform: rotate(180deg);
  }

  @media (${MOBILE}) {
    &:hover svg,
    &:focus-within svg {
      transform: none;
    }
  }
`;

const item = css`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  text-decoration: none;
  white-space: nowrap;
`;

export const NavLink = styled(Link)<{ $active: boolean }>`
  ${item}
  color: ${({ theme, $active }) =>
    $active ? theme.colors.background : theme.colors["text-primary"]};
  background-color: ${({ theme, $active }) =>
    $active ? theme.colors.primary : "transparent"};

  svg {
    transition: transform 0.2s;
  }

  &:hover {
    background-color: ${({ theme, $active }) =>
      $active ? theme.colors.primary : theme.colors.background};
  }
`;

export const SubmenuLink = styled(Link)`
  ${item}
  color: ${({ theme }) => theme.colors["text-primary"]};

  &:hover {
    background-color: ${({ theme }) => theme.colors.background};
  }
`;

export const LangItem = styled(NavItem)`
  @media (${MOBILE}) {
    align-self: flex-start;
    margin-top: 8px;
  }
`;

export const Lang = styled.button`
  ${item}
  font-family: inherit;
  color: ${({ theme }) => theme.colors["text-primary"]};
  background: none;
  border: 1px solid ${({ theme }) => theme.colors.border};
  cursor: pointer;

  svg {
    transition: transform 0.2s;
  }
`;

export const LangMenu = styled(Submenu)`
  left: auto;
  right: 0;
  min-width: 160px;
`;

export const LangOption = styled.button`
  ${item}
  width: 100%;
  font-family: inherit;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors["text-primary"]};
  cursor: pointer;

  &:disabled {
    color: ${({ theme }) => theme.colors["text-muted"]};
    cursor: not-allowed;
  }
`;
