import { ReactNode, useRef } from "react";
import {
  ContentWrapper,
  Background,
  HeadWrapper,
  MenuImage,
  ModalWrapper,
  OcaImage,
  RetractIcon,
} from "./MenuModal.styles";

const MenuModal = ({
  children,
  hasBackground = true,
  hasIcon = true,
  position = "left",
  retracted = true,
  setRetracted = () => {},
  ...props
}: {
  children?: ReactNode;
  hasBackground?: boolean;
  retracted?: boolean;
  hasIcon?: boolean;
  position?: "left" | "right";
  setRetracted?: (retracted: boolean) => void;
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const updateRetracted = () => setRetracted(!retracted);

  return (
    <div {...props}>
      <div onClick={updateRetracted}>
        {hasIcon && <MenuImage id="modal-button" size={36} />}
      </div>
      {hasBackground && (
        <Background
          onClick={updateRetracted}
          $retracted={retracted.toString()}
        />
      )}
      <ModalWrapper
        $retracted={retracted.toString()}
        ref={modalRef}
        $position={position}
      >
        <HeadWrapper>
          {hasIcon && (
            <OcaImage src="/oca_logan.svg" alt="OCA" width={148} height={75} />
          )}
          <div onClick={updateRetracted}>
            <RetractIcon id="retract" size={20} $position={position} />
          </div>
        </HeadWrapper>
        <ContentWrapper>{children}</ContentWrapper>
      </ModalWrapper>
    </div>
  );
};

export default MenuModal;
