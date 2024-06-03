import { ReactNode, useCallback, useRef } from "react";
import {
  ContentWrapper,
  Background,
  HeadWrapper,
  MenuImage,
  ModalWrapper,
  OcaImage,
  RetractImage,
} from "./MenuModal.styles";
import OcaLogo from "@/../public/logo-oca-simple.svg";
import RetractIcon from "@/../public/retract-icon.svg";
import MenuIcon from "@/../public/modal-icon.svg";

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

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setRetracted(true);
        document.removeEventListener("click", handleClickOutside);
      }
    },
    [setRetracted],
  );

  const switchRetract = useCallback(() => {
    if (retracted) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    setRetracted(!retracted);
  }, [handleClickOutside, setRetracted, retracted]);

  return (
    <div {...props}>
      <div onClick={switchRetract}>
        {hasIcon && <MenuImage src={MenuIcon} alt="" />}
      </div>
      {hasBackground && <Background retracted={retracted.toString()} />}
      <ModalWrapper
        retracted={retracted.toString()}
        ref={modalRef}
        position={position}
      >
        <HeadWrapper>
          <OcaImage src={OcaLogo} alt="" />
          <div onClick={switchRetract}>
            <RetractImage src={RetractIcon} alt="" />
          </div>
        </HeadWrapper>
        <ContentWrapper>{children}</ContentWrapper>
      </ModalWrapper>
    </div>
  );
};

export default MenuModal;
