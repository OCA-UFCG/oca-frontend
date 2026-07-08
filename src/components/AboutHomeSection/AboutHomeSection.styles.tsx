import { Section, SectionTitle } from "@/app/globalStyles";
import Link from "next/link";
import styled from "styled-components";
import { Icon } from "../Icon/Icon";
import { SectionHeader as DefaultSectionHeader } from "../SectionHeader/SectionHeader";

export const Wrapper = styled(Section)`
  background-image: url("Grass.webp");
  background-repeat: repeat-x;
  min-height: 40rem;
  height: 100%;
  justify-content: center;
  background-position: bottom;
`;

export const SectionHeader = styled(DefaultSectionHeader)`
  align-items: flex-end;
`;

export const AboutTitle = styled(SectionTitle)`
  text-align: left;
  align-self: flex-start;
  margin-bottom: 0.5rem;
`;

export const ContentWrapper = styled.div`
  display: flex;
  gap: 1.25rem;
  justify-content: space-between;
  align-items: flex-start;
  max-width: 1440px;
  width: 100%;
  flex-shrink: 0;
  margin-bottom: 3rem;

  @media screen and (max-width: 1100px) {
    justify-content: center;
    align-items: center;
    flex-flow: column;
  }
`;

export const ContentModal = styled.div`
  display: flex;
  flex-flow: column;
  gap: 1rem;
  box-sizing: border-box;
  background-color: #ffffff;
  max-width: 680px;
  padding: 1rem;
  box-shadow: 0px 0px 4px #cdcdcd;
  border-radius: 4px;
`;

export const PhotoColumn = styled.div`
  align-self: flex-start;
  flex: 0 1 560px;
  width: 100%;
  max-width: 560px;
  height: 39rem;

  @media screen and (max-width: 1100px) {
    height: auto;
    max-width: 680px;
  }
`;

export const OcaLogo = styled(Icon)``;

export const TextContainer = styled.div`
  display: flex;
  align-items: self-start;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  max-width: 1000px;
  flex-grow: 2;

  ol,
  ul {
    margin-left: 1rem;
    width: auto;
  }

  p {
    margin: 0;
  }

  h3 {
    color: ${({ theme }) => theme.colors.green};
    font-size: 1.25rem;
    font-weight: bold;
    margin: 0;
  }

  h4 {
    color: ${({ theme }) => theme.colors.black};
    font-size: 1rem;
    font-weight: bold;
    margin: 0;
    text-transform: uppercase;
  }

  ul {
    margin: 0 0 0 1rem;
  }

  li {
    margin-bottom: 0.5rem;
  }

  @media screen and (max-width: 980px) {
    align-items: center;
    text-align: center;
  }
`;

export const ViewMore = styled(Link)`
  color: ${({ theme }) => theme.colors.orange};
  transition: 300ms;

  &:hover {
    opacity: 0.6;
  }

  &:after {
    content: " >";
  }
`;
