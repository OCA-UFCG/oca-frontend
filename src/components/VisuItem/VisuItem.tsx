import { IVisuMenuItems } from "@/utils/interfaces";
import { Input, ItemWrapper, Label, LoadingIcon } from "./VisuItem.styles";

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
      {isLoading ? (
        <LoadingIcon id="isLoading" />
      ) : (
        <Input
          type={isLoading ? "hidden" : "radio"}
          id={id}
          name={name}
          checked={checked}
          value={id}
          disabled={isLoading}
          onChange={() => onChange(id)}
          onClick={() => onClick(id, false)}
        />
      )}
      <Label isLoading={isLoading} htmlFor={id}>
        {name}
      </Label>
    </ItemWrapper>
  );
};
