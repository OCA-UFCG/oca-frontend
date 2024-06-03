import styled from "styled-components";
import Image from "next/image";

export const MenuImage = styled(Image)`
  transition: 0.2s;
  cursor: pointer;

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
  ${(props) => {
    if (props.position === "left") {
      const transform =
        props.retracted === "true" ? "translate(-110%)" : "translate(1rem)";
      const transformSmall =
        props.retracted === "true"
          ? "translate(-50rem)"
          : "translate(-50%, -33%)";

      return `
        left: 0; 
        transform: translate(${transform});

        @media screen and (max-width: 600px) {
          top: 50%;
          left: 50%;
          transform: ${transformSmall};
        }
      `;
    } else {
      const transform =
        props.retracted === "true" ? "translate(110%)" : "translate(-1rem)";
      const transformSmall =
        props.retracted === "true"
          ? "translate(-50rem)"
          : "translate(-50%, 11%)";

      return `
        right: 0; 
        transform: ${transform};

        @media screen and (max-width: 600px) {
          bottom: 0;
          left: 50%;
          transform: ${transformSmall};
        }
      `;
    }
  }}

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
  ${(props) => {
    if (props.position === "right") {
      return `
        transform: rotate(180deg);
      `;
    }
  }}

  max-width: 1.25rem;
  height: fit-content;
  transition: 0.2s;
  cursor: pointer;

  &:hover {
    transform: scale(0.9);
    opacity: 0.4;
  }
`;

export const ContentWrapper = styled.div`
  padding: 1rem 0 0.5rem;
`;
