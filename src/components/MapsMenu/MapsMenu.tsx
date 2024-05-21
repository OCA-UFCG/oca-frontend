import MenuModal from "../MenuModal/MenuModal";
import { VisuItem } from "./VisuItem/VisuItem";
import {
  ContentWrapper,
  Form,
  ItemWrapper,
  QuestionMarkImg,
  Title,
} from "./MapsMenu.styles";
import { useEffect, useState } from "react";
import QuestionMarkIcon from "@/../public/questionMark.svg";

const MapsMenu = ({ initialValue }: { initialValue: string }) => {
  const [checked, setChecked] = useState<boolean>(false);
  console.log(initialValue);
  const onItemChange = (e: any) => {
    console.log(e);
    setChecked((previous) => !previous);
  };

  useEffect(() => {
    console.log(checked);
  }, [checked]);

  return (
    <MenuModal>
      <ContentWrapper>
        <Title onClick={onItemChange}>Visualizações Disponíveis</Title>
        <Form>
          <ItemWrapper>
            <VisuItem
              mainInfo={{ id: "oi", name: "olaa", value: "oiii" }}
              onChange={onItemChange}
            />
            <QuestionMarkImg
              src={QuestionMarkIcon}
              alt={QuestionMarkIcon}
              height={16}
              width={16}
            />
          </ItemWrapper>
        </Form>
      </ContentWrapper>
    </MenuModal>
  );
};

export default MapsMenu;
