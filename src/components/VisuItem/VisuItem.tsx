import { IEEInfo } from "@/utils/interfaces";
import {
  InfoContainer,
  Input,
  ItemWrapper,
  Label,
  LoadingIcon,
  QuestionMarkIcon,
} from "./VisuItem.styles";
import { useContext } from "react";
import { MapTiffContext } from "@/contexts/MapContext";

export const VisuItem = ({ info }: { info: IEEInfo }) => {
  const {
    currentDescription,
    setCurrentDescription,
    setDescRetracted,
    descRetracted,
    loading,
  } = useContext(MapTiffContext);
  const { id, name, checked, description } = info;

  const handleIconClick = () => {
    setDescRetracted(!descRetracted);

    if (currentDescription.name === name) {
      setDescRetracted(!descRetracted);
    } else {
      setDescRetracted(false);
      setCurrentDescription({
        name: name,
        description: description,
      });
    }
  };

  return (
    <ItemWrapper>
      <LoadingIcon $loading={loading} id="loading" size={18} />
      <Input
        type={loading ? "hidden" : "radio"}
        id={id}
        name={"selectedVisu"}
        value={id}
        disabled={loading}
        checked={checked}
        readOnly
      />
      <Label $isloading={loading} htmlFor={id}>
        {name}
      </Label>
      <InfoContainer onClick={handleIconClick} title={`Sobre ${name}`}>
        <QuestionMarkIcon id="question" height={20} width={20} />
      </InfoContainer>
    </ItemWrapper>
  );
};
