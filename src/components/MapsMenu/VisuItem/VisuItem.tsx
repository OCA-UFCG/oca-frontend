import { IVisuMenuItems } from "@/utils/interfaces";
import { Input, ItemWrapper, Label } from "./VisuItem.styles";
import { capitalize } from "@/utils/functions";

export const VisuItem = ({
  mainInfo,
  onChange,
}: {
  mainInfo: IVisuMenuItems;
  onChange: (e: any) => void;
}) => {
  const { name, value, id } = mainInfo;

  return (
    <ItemWrapper>
      <Input
        type="radio"
        id={id}
        name={name}
        value={value}
        onChange={onChange}
      />
      <Label htmlFor={id}>{capitalize(name)}</Label>
    </ItemWrapper>
  );
};
