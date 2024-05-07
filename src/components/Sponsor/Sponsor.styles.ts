import styled from "styled-components";
import Image from "next/image";

export const Wrapper = styled.a`
  display: flex;
  flex-flow: column;
  align-items: center;

  text-decoration: none;
  gap: 1rem;
  transition: 0.3s;

  &:hover {
    transform: scale(0.95);
    opacity: 0.7;
  }
`;

export const LogoImage = styled(Image)`
  width: fit-content;
  height: fit-content;
  max-width: 6rem;
`;
