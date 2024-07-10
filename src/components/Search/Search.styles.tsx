import styled from "styled-components";
import Image from "next/image";

export const SearchWrapper = styled.div`
  top: 0;
  left: 0;
  z-index: 1000;
  width: fit-content;
  height: fit-content;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: red;
`;

export const SearchImage = styled(Image)`
  transition: 0.2s;
  cursor: pointer;
  width: 2rem;
  height: auto;
  box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  &:hover {
    transform: scale(1.05);
  }
`;

export const SearchBackground = styled.div`
  background-color: rgba(0, 0, 0, 0.4);
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
`;
