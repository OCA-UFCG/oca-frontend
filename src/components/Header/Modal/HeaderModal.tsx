"use client";
import {
  ChildrenWrapper,
  HeaderItem,
  ItemWrapper,
  Modal,
  NavList,
  Navbar,
} from "./HeaderModal.styles";
import { sections } from "@/utils/constants";
import { ISection } from "@/utils/interfaces";
import { useState } from "react";

const NavItem = ({ item }: { item: ISection }) => {
  if (!item.children) {
    return <HeaderItem href={item.path}>{item.name}</HeaderItem>;
  }

  return (
    <ItemWrapper>
      <HeaderItem href={item.path}>{item.name}</HeaderItem>
      <ChildrenWrapper>
        {Object.entries(item.children).map(([key, child]) => (
          <NavItem key={key} item={child} />
        ))}
      </ChildrenWrapper>
    </ItemWrapper>
  );
};

const HeaderModal = () => {
  const [retracted, setRetracted] = useState<boolean>(true);

  return (
    <Modal retracted={retracted} setRetracted={setRetracted}>
      <Navbar>
        <NavList>
          {Object.entries(sections).map(([key, item]) => (
            <NavItem key={key} item={item} />
          ))}
        </NavList>
      </Navbar>
    </Modal>
  );
};

export default HeaderModal;
