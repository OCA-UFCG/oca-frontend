import { IVisuMenuItems } from "@/utils/interfaces";
import { Input, ItemWrapper, Label, LoadingIcon } from "./VisuItem.styles";

export const VisuItem = ({
  info,
  isLoading,
}: {
  info: IVisuMenuItems;
  isLoading: boolean;
}) => {
  const { id, name, checked } = info;

  return (
    <ItemWrapper>
      {isLoading && <LoadingIcon id="loading" size={18} />}
      <Input
        type={isLoading ? "hidden" : "radio"}
        id={id}
        name={"selectedVisu"}
        value={id}
        disabled={isLoading}
        defaultChecked={checked}
      />
      <Label isLoading={isLoading} htmlFor={id}>
        {name}
      </Label>
    </ItemWrapper>
  );
};
