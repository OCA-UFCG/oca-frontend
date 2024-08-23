import NativeImage from "next/image";
import styled from "styled-components";

export const Gallery = styled.div`
  .lg-react-element {
    justify-content: center;
    padding: 1rem;
    gap: 0.5rem;
    column-count: 3;
    width: fit-content;

    @media screen and (max-width: 700px) {
      column-count: 2;
    }

    @media screen and (max-width: 450px) {
      column-count: 1;
    }
  }
`;

export const ImageLink = styled.a``;

export const Image = styled(NativeImage)`
  margin-bottom: 0.5rem;
  height: 100%;
  width: 100%;
  object-fit: cover;
  background-color: #cdcdcd;
`;

export const Title = styled.h2`
  color: ${({ theme }) => theme.colors.white};
  opacity: 0;
  transition: 300ms;
  transform: translateY(4rem);
  font-size: 20px;
`;

export const Subtitle = styled.p`
  color: ${({ theme }) => theme.colors.white};
  font-weight: 300;
  opacity: 0;
  margin-bottom: 0;
  transform: translateY(4rem);
  transition: 300ms;
`;

export const InfoContainer = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: end;
  position: absolute;
  bottom: 0;
  padding: 1rem;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  box-sizing: border-box;
  color: ${({ theme }) => theme.colors.white};
  height: calc(100% - 0.5rem);
  width: 100%;
  transition: 300ms;
  cursor: pointer;
  overflow: hidden;

  &:hover {
    background-color: #00000070;
    backdrop-filter: blur(4px);
    /* filter: blur(40px);/ */
  }

  &:hover ${Subtitle}, &:hover ${Title} {
    /* animation: open 1s forwards; */
    opacity: 1;
    transform: translateY(0);
  }
`;

export const ImageContainer = styled.div`
  position: relative;
  box-sizing: border-box;
  break-inside: avoid;
`;
