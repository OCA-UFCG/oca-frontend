import { Section } from "@/app/globalStyles";
import Link from "next/link";
import styled from "styled-components";
import { Icon } from "../Icon/Icon";

export const Wrapper = styled(Section)`
  background-image: url("Grass.png");
  background-repeat: repeat-x;
  min-height: 60vh;
  justify-content: center;
  background-position: right;
`;

export const ContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1440px;
  width: 100%;
  margin-bottom: 3rem;

  @media screen and (max-width: 800px) {
    justify-content: center;
  }
`;

export const ContentModal = styled.div`
  display: flex;
  flex-flow: column;
  gap: 1rem;
  box-sizing: border-box;
  background-color: #ffffff99;
  backdrop-filter: blur(40px);
  height: fit-content;
  max-width: 600px;
  padding: 1rem;
  box-shadow: 0px 0px 4px #cdcdcd;
  border-radius: 4px;
  transform: translateY(-3rem);
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