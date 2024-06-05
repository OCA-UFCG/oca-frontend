import { IEEInfo } from "@/utils/interfaces";
import MenuModal from "../MenuModal/MenuModal";
import { ContentWrapper, Title, Description } from "./MapDescription.styles";

const MapDescription = ({
  imageData,
  retracted,
  setRetracted = () => {},
}: {
  imageData: IEEInfo;
  retracted: boolean;
  setRetracted: (retracted: boolean) => void;
}) => {
  const { name, description } = imageData;

  return (
    <MenuModal
      hasIcon={false}
      hasBackground={false}
      position="right"
      retracted={retracted}
      setRetracted={setRetracted}
    >
      <ContentWrapper>
        <Title>{name}</Title>
        <Description>{description}</Description>
      </ContentWrapper>
    </MenuModal>
  );
};

export default MapDescription;
