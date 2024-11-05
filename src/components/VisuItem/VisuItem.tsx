import { IVisuMenuItems } from "@/utils/interfaces";
import { Input, ItemWrapper, Label, LoadingIcon } from "./VisuItem.styles";
import { useContext } from "react";
import { MapTiffContext } from "@/contexts/MapContext";

export const VisuItem = ({ info }: { info: IVisuMenuItems }) => {
  const { loading } = useContext(MapTiffContext);
  const { id, name, checked } = info;

  return (
    <ItemWrapper>
      <LoadingIcon loading={loading} id="loading" size={18} />
      <Input
        type={loading ? "hidden" : "radio"}
        id={id}
        name={"selectedVisu"}
        value={id}
        disabled={loading}
        checked={checked}
        readOnly
      />
      <Label isloading={loading} htmlFor={id}>
        {name}
      </Label>
    </ItemWrapper>
  );
};
