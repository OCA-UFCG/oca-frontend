import MenuModal from "../MenuModal/MenuModal";
import { VisuItem } from "./VisuItem/VisuItem";
import { ContentWrapper, Form, Title } from "./MapsMenu.styles";

const MapsMenu = () => {
  return (
    <MenuModal>
      <ContentWrapper>
        <Title>Visualizações Disponíveis</Title>
        <Form>
          <VisuItem
            mainInfo={{ id: "oi", name: "olaa", value: "oiii" }}
            subItems={[
              { id: "oi1", name: "ol2aa", value: "oi123ii" },
              { id: "oi2", name: "o1laa", value: "oii123i" },
            ]}
          />
          <VisuItem mainInfo={{ id: "oii", name: "oliaa", value: "oiiii" }} />
        </Form>
      </ContentWrapper>
    </MenuModal>
  );
};

export default MapsMenu;
