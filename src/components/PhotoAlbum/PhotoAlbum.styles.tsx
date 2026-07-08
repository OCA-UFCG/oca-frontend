import Image from "next/image";
import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 100%;
  max-width: 520px;
  position: sticky;
  top: 6rem;

  @media screen and (max-width: 1100px) {
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
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.5rem;

  @media screen and (max-width: 540px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;

export const Thumbnail = styled(Image)<{ $active: string }>`
  aspect-ratio: 3 / 2;
  width: 100%;
  height: auto;
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
`;
