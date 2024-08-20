import styled from "styled-components";
import Link from "next/link";
import { Icon } from "../Icon/Icon";

export const Wrapper = styled.footer`
  display: flex;
  padding: 2rem;
  box-sizing: border-box;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.green};

  gap: 1rem;
  position: relative;
  width: 100%;
  align-items: center;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

export const Divider = styled.hr`
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.white};
`;

export const LogoImage = styled(Icon)``;

export const References = styled.div`
  display: flex;

  gap: 0.5rem;
  align-items: end;
  flex-direction: column;
  justify-content: center;

  @media (max-width: 600px) {
    align-items: center;
  }
`;

export const Sections = styled(Link)`
  color: ${({ theme }) => theme.colors.white};
  cursor: pointer;
  text-decoration: none;
  transition: 0.2s;
  font-size: 0.9rem;

  &:hover {
    opacity: 0.6;
  }
`;

export const SocialMediasContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

export const SocialMedia = styled(Link)`
  display: flex;
  gap: 0.5rem;
  transition: 0.2s;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.white};

  &:hover {
    opacity: 0.6;
  }

  img {
    cursor: pointer;
    max-width: 1.75rem;
    max-height: 1.75rem;
    filter: brightness(0) invert(1);
  }
`;
