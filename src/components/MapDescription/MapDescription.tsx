import MenuModal from "../MenuModal/MenuModal";
import { ContentWrapper, Title, Description } from "./MapDescription.styles";
import { MapTiffContext } from "@/contexts/MapContext";
import { useContext } from "react";

const MapDescription = () => {
  const { currentDescription, descRetracted, setDescRetracted } =
    useContext(MapTiffContext);

  return (
    <MenuModal
      hasIcon={false}
      hasBackground={false}
      position="right"
      retracted={descRetracted}
      setRetracted={setDescRetracted}
    >
      <ContentWrapper>
        <Title>{currentDescription.name}</Title>
        <Description>{currentDescription.description}</Description>
      </ContentWrapper>
    </MenuModal>
  );
};

export default MapDescription;
