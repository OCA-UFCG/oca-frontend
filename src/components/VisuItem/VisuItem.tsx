import { IVisuMenuItems } from "@/utils/interfaces";
import { Input, ItemWrapper, Label } from "./VisuItem.styles";
import { capitalize } from "@/utils/functions";

export const VisuItem = ({
  info,
  isLoading,
  onChange,
  onClick,
}: {
  info: IVisuMenuItems;
  isLoading: boolean;
  onChange: (newValue: string) => void;
  onClick: (newValue: string, retract: boolean) => void;
}) => {
  const { id, name, checked } = info;

  return (
    <ItemWrapper>
      <Input
        type="radio"
        id={id}
        name={name}
        checked={checked}
        value={id}
        disabled={isLoading}
        onChange={() => onChange(id)}
        onClick={() => onClick(id, false)}
      />
      <Label htmlFor={id}>{capitalize(name)}</Label>
    </ItemWrapper>
  );
};
