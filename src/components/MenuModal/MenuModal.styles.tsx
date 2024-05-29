import styled from "styled-components";
import Image from "next/image";

export const MenuImage = styled(Image)`
  transition: 0.2s;
  cursor: pointer;
  width: 2rem;
  height: auto;
  box-shadow: 0px 0px 4px #cdcdcd;

  &:hover {
    transform: scale(1.05);
  }
`;

export const Background = styled.div<{ retracted: string }>`
  display: ${({ retracted }) => (retracted === "true" ? "none" : "flex")};
  animation: ${(props) => (props.retracted === "true" ? "fadeOut" : "fadeIn")}
    0.5s forwards;
  width: 100vw;
  height: 100vh;
  background-color: #00000060;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 2;

  @keyframes fadeOut {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
      display: none;
    }
  }

  @keyframes fadeIn {
    0% {
      opacity: 0;
      display: none;
    }
    100% {
      opacity: 1;
    }
  }
`;

export const ModalWrapper = styled.div<{ retracted: string; position: string }>`
  position: fixed;
  top: 50%;
  bottom: 50%;
  margin: auto 0;
  transition: transform 0.5s ease-out;
  background-color: ${({ theme }) => theme.colors.white};
  background-image: url("background.png");
  background-size: 50rem;
  border-radius: 6px;

  height: fit-content;
  max-height: 40rem;
  padding: 1rem;
  box-sizing: border-box;
  min-width: 20rem;
  max-width: 24rem;
  box-shadow: 0px 0px 4px 1px #c8c8c8;
  z-index: 10;

  @media screen and (max-width: 400px) {
    max-width: 92vw;
  }

  ${(props) => {
    const { position, retracted } = props;
    const isLeft = position === "left";

    const transformExpanded = isLeft ? "translateX(1rem)" : "translateX(-1rem)";
    const transformRetracted = isLeft
      ? "translateX(-110%)"
      : "translateX(110%)";

    const transformSmallExpanded = "translateX(-50%)";
    const transformSmallRetracted = isLeft
      ? "translateX(-50rem)"
      : "translateX(50rem)";

    return `
      ${isLeft ? "left: 0;" : "right: 0;"}
      transform: ${retracted === "true" ? transformRetracted : transformExpanded};

      @media screen and (max-width: 750px) {
        left: 50%;
        margin: 0 0;
        ${isLeft ? "top: 9%;" : "top: 57%;"}
        transform: ${retracted === "true" ? transformSmallRetracted : transformSmallExpanded};
      }

      @media screen and (max-width: 750px) and (max-height: 800px) {
        ${isLeft ? "top: 9%;" : "top: 68%;"}
      }        
    `;
  }}
`;

export const HeadWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const OcaImage = styled(Image)`
  max-width: 5.5rem;
  height: fit-content;
`;

export const RetractImage = styled(Image)<{ position: string }>`
  max-width: 1.25rem;
  height: fit-content;
  transition: 0.2s;
  cursor: pointer;

  &:hover {
    transform: scale(0.9);
    opacity: 0.4;
  }

  ${(props) =>
    props.position === "right" &&
    `
      transform: rotate(180deg);

      &:hover {
        transform: rotate(180deg) scale(0.9);
      }
  `}
`;

export const ContentWrapper = styled.div`
  padding: 1rem 0 0.5rem;
`;
