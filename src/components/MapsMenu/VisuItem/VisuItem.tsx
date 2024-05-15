import { IVisuMenuItems } from "@/utils/interfaces";
import {
  Input,
  ItemWrapper,
  Label,
  SubItemsContainer,
  Wrapper,
} from "./VisuItem.styles";

export const VisuItem = ({
  mainInfo,
  subItems = [],
}: {
  mainInfo: IVisuMenuItems;
  subItems?: IVisuMenuItems[];
}) => {
  const { name, value, id } = mainInfo;

  return (
    <Wrapper>
      <ItemWrapper>
        <Input type="radio" id={id} name={name} value={value} />
        <Label htmlFor={id}>{name}</Label>
      </ItemWrapper>

      <SubItemsContainer>
        {subItems &&
          subItems.map((item: IVisuMenuItems) => (
            <ItemWrapper key={item.id}>
              <Input
                type="radio"
                id={item.id}
                name={item.name}
                value={item.value}
              />
              <Label htmlFor={item.id}>{item.name}</Label>
            </ItemWrapper>
          ))}
      </SubItemsContainer>
    </Wrapper>
  );
};
