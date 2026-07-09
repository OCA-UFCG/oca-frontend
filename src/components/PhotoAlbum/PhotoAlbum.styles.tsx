import Image from "next/image";
import styled from "styled-components";

export const Wrapper = styled.div`
  align-self: flex-start;
  display: grid;
  grid-template-rows: auto auto;
  gap: 0.75rem;
  width: 100%;
  position: sticky;
  top: 6rem;
  overflow: hidden;

  @media screen and (max-width: 1100px) {
    display: flex;
    flex-direction: column;
    position: static;
    max-width: 680px;
  }
`;

export const ActivePhoto = styled(Image)`
  aspect-ratio: 4 / 3;
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 4px;
  box-shadow: 0px 0px 3px #9e9e9e;
`;

export const ThumbnailList = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const Thumbnail = styled(Image)<{ $active: string }>`
  flex: 1 1 0;
  min-width: 0;
  width: 100%;
  height: 6rem;
  object-fit: cover;
  border-radius: 4px;
  box-shadow: 0px 0px 3px #9e9e9e;
  cursor: pointer;
  opacity: ${({ $active }) => ($active === "true" ? "1" : "0.55")};
  outline: ${({ $active, theme }) =>
    $active === "true" ? `2px solid ${theme.colors.green}` : "none"};
  outline-offset: 2px;
  transition:
    opacity 0.2s,
    transform 0.2s;

  &:hover {
    opacity: 1;
    transform: scale(0.98);
  }

  @media screen and (max-width: 540px) {
    height: 4.5rem;
  }
`;
