import styled from "styled-components";
import Image from "next/image";

export const Wrapper = styled.a`
  display: inline-flex;
  flex-flow: column;
  align-items: center;
  width: fit-content;
  background: ${({ theme }) => theme.colors.white};

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
  max-height: 8rem;
  width: auto;
  height: auto;
  object-fit: contain;

  @media screen and (max-width: 800px) {
    max-height: 5rem;
  }
`;
