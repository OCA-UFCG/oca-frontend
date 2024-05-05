import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";

export const Wrapper = styled.footer`
  display: flex;
  background-color: #8f4456;
  justify-content: space-between;

  position: relative;
  width: 100vw;

  @media (max-width: 600px) {
    align-items: center;
    flex-direction: column;
  }
`;

export const Divider = styled.hr`
  width: 100%;
  border: 1px solid #fff;
`;

export const LogoImage = styled(Image)`
  filter: brightness(0) invert(1);
  padding: 2rem;
`;  

export const References = styled.div`
  padding: 2rem;
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
  font-size: 14px;

  &:hover {
    opacity: 0.6;
  }
`;  

export const Channels = styled(Link)`
  transition: 0.2s;

  img {
    cursor: pointer;
    max-width: 1.75rem;
    max-height: 1.75rem;
    filter: brightness(0) invert(1);
  }

  &:hover {
    opacity: 0.6;
  }
`;
