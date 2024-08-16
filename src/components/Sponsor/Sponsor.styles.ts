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

  &:hover {
    transform: scale(0.95);
    opacity: 0.7;
  }
`;

export const LogoImage = styled(Image)`
  border-radius: 4px;
  height: 100%;
  max-height: 8rem;
  aspect-ratio: 1 / 1;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
`;
