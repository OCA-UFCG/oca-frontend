import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";

export const Wrapper = styled.footer`
  display: flex;
  padding: 2rem;
  box-sizing: border-box;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.maroon};

  position: relative;
  width: 100vw;

  @media (max-width: 600px) {
    align-items: center;
    flex-direction: column;
  }
`;

export const Divider = styled.hr`
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.white};
`;

export const LogoImage = styled(Image)`
  filter: brightness(0) invert(1);
`;  

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
  color: #fff;
  cursor: pointer;
  transition: 0.2s;
  font-size: 0.9rem;

  &:hover {
    opacity: 0.6;
  }
`;  

export const Channels = styled(Link)`
  display: flex;
  gap: 0.5rem;
  transition: 0.2s;

  img {
    cursor: pointer;
    max-width: 1.75rem;
    max-height: 1.75rem;
    filter: brightness(0) invert(1);
  }

  img:hover {
    opacity: 0.6;
  }
`;
