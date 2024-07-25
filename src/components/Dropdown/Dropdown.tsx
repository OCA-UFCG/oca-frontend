import { ISection } from "@/utils/interfaces";
import {
  ChildrenWrapper,
  ItemContent,
  NavItem,
  Wrapper,
} from "./Dropdown.styles";
import { Icon } from "../Icon/Icon";

export const Dropdown = ({ item }: { item: ISection }) => {
  const { name, path, children } = item;

  if (!children) {
    return (
      <NavItem>
        <ItemContent>
          <a href={path}>{name}</a>
        </ItemContent>
      </NavItem>
    );
  }

  return (
    <NavItem>
      <ItemContent>
        <a href={path}>{name}</a>
        <Icon id="arrow-head" width={11} height={9} />
      </ItemContent>
      {children && (
        <Wrapper>
          <ChildrenWrapper>
            {Object.entries(children).map(([key, item]) => (
              <Dropdown key={key} item={item} />
            ))}
          </ChildrenWrapper>
        </Wrapper>
      )}
    </NavItem>
  );
};
