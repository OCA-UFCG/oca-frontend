import styled from "styled-components";
import Link from "next/link";
import { Icon } from "../Icon/Icon";

export const Wrapper = styled.footer`
  display: flex;
  padding: 2rem;
  margin-top: auto;
  box-sizing: border-box;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.green};

  gap: 1rem;
  position: relative;
  width: 100%;
  align-items: start-flex;

  @media (max-width: 800px) {
    align-items: center;
    flex-direction: column;
  }
`;

export const Divider = styled.hr`
  border: none;
  height: 1px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.white};
  margin-top: 0px;
`;

export const LogoImage = styled(Icon)``;

export const References = styled.div`
  display: flex;
  gap: 0.5rem;

  flex-direction: column;
  justify-content: flex-end;

  flex-grow: 2;

  @media (max-width: 800px) {
    align-items: center;
    flex-direction: column;
    gap: 2rem;
  }
`;

export const Sections = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  gap: 2.2rem;

  @media (max-width: 800px) {
    flex-direction: column;
  }
`;

export const SectionTitle = styled(Link)`
  color: ${({ theme }) => theme.colors.white};
  font-weight: bolder;

  cursor: pointer;
  text-decoration: none;
  transition: 0.2s;
  font-size: 1.1rem;
  margin-bottom: 1px;

  &:hover {
    opacity: 0.6;
  }

  @media (max-width: 800px) {
    text-align: center;
    width: fit-content;
    align-self: center;
  }
`;

export const InnerSections = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  @media (max-width: 800px) {
    text-align: center;
  }
`;

export const SectionOptions = styled(Link)`
  color: ${({ theme }) => theme.colors.white};
  cursor: pointer;
  text-decoration: none;
  transition: 0.2s;
  font-size: 0.9rem;
  font-weight: lighter;
`;

export const SocialMediasContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  align-self: flex-end;

  @media (max-width: 800px) {
    align-self: center;
  }
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
