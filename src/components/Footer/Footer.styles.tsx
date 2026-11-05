import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";

const MOBILE = "max-width: 1000px";

export const Wrapper = styled.footer`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  margin-top: auto;
  padding: 48px 80px;
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.colors["v-950"]};

  @media (${MOBILE}) {
    padding: 40px 24px;
  }
`;

export const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;

  @media (${MOBILE}) {
    flex-direction: column;
  }
`;

export const Logos = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
`;

export const OcaLogo = styled(Image)`
  height: auto;
  filter: brightness(0) invert(1);
`;

export const NavList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 24px;
  width: auto;
  margin: 0;
  list-style: none;

  li {
    margin: 0;
  }
`;

export const NavLink = styled(Link)`
  display: block;
  padding: 6px 8px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 700;
  line-height: 20px;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.surface};

  &:hover {
    text-decoration: underline;
  }
`;

export const Social = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  a {
    display: flex;
    transition: opacity 0.2s;
  }

  a:hover {
    opacity: 0.8;
  }
`;

export const Extra = styled(NavList)`
  justify-content: center;
  gap: 8px 24px;

  a {
    font-weight: 500;
    color: ${({ theme }) => theme.colors["primary-disabled"]};
  }
`;

export const Divider = styled.hr`
  width: 100%;
  height: 1px;
  margin: 0;
  border: none;
  background-color: ${({ theme }) => theme.colors["primary-disabled"]};
`;

export const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 16px;
  font-size: 14px;
  font-weight: 500;
  line-height: 14px;

  p,
  a {
    margin: 0;
    font-weight: 500;
    line-height: inherit;
    text-align: inherit;
    text-decoration: none;
    color: ${({ theme }) => theme.colors.surface};
  }

  @media (${MOBILE}) {
    flex-direction: column;
    align-items: center;
    text-align: center;
    line-height: 20px;
  }
`;
