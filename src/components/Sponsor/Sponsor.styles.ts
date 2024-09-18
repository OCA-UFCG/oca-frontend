import styled from "styled-components";
import Image from "next/image";

export const Wrapper = styled.a`
  display: flex;
  flex-flow: column;
  align-items: center;
  width: fit-content;

  text-decoration: none;
  gap: 1rem;
  transition: 0.3s;
  padding: 0.2rem;
  box-shadow: 0 0 3px #cdcdcd;

  &:hover {
    transform: scale(0.95);
    opacity: 0.7;
  }
`;

export const LogoImage = styled(Image)`
  border-radius: 4px;
  height: 100%;
  max-height: 8rem;
  min-width: 4rem;
  max-width: 100%;
  width: fit-content;
  object-fit: cover;

  @media screen and (max-width: 800px) {
    width: fit-content;
    max-height: 6rem;
    min-width: 3rem;
  }
`;
