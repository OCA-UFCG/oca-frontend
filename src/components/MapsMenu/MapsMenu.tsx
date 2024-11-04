import MenuModal from "@/components/MenuModal/MenuModal";
import { VisuItem } from "@/components/VisuItem/VisuItem";
import { FormEvent, useContext } from "react";
import { IEEInfo, IFormItem } from "@/utils/interfaces";
import {
  ContentWrapper,
  Form,
  ItemWrapper,
  QuestionMarkImg,
  SubSectionWrapper,
  FieldDetails,
  Summary,
  IconWrapper,
  InfoContainer,
  Title,
} from "./MapsMenu.styles";
import { MapTiffContext } from "@/contexts/MapContext";

const formatData = (newValue: string, tiffs: { fields: IEEInfo }[]) => {
  const typesMap: { [key: string]: IFormItem[] } = {};

  Object.values(tiffs).forEach(({ fields: item }) => {
    if (!typesMap[item.type]) {
      typesMap[item.type] = [];
    }

    typesMap[item.type].push({ ...item, checked: item.id === newValue });
  });

  return typesMap;
};

const MapsMenu = ({
  isLoading,
  updateDescription,
}: {
  isLoading: boolean;
  updateDescription: (newItem: string, retract?: boolean) => void;
}) => {
  const {
    currentVisu,
    setCurrentVisu,
    tiffs,
    menuRetracted,
    setMenuRetracted,
  } = useContext(MapTiffContext);
  const defaultCategory = Object.values(tiffs).find(
    (mapData) => mapData.fields.id === currentVisu.id,
  )?.fields?.type;
  const categorisedVisus = formatData(currentVisu.id, tiffs);

  const onFormChange = (e: FormEvent<HTMLFormElement>) => {
    const id = (e.target as HTMLInputElement).value;
    const selectedTiff = Object.values(tiffs).find(
      (mapData) => mapData.fields.id === id,
    )?.fields;

    const newVisu = { id, year: "" };
    Object.entries(selectedTiff?.imageData || []).map(
      ([currentYear, { default: isDefault }]) => {
        if (isDefault && currentYear !== "general") {
          newVisu.year = currentYear;
        }
      },
    );

    setCurrentVisu(newVisu);
  };

  return (
    <MenuModal
      hasIcon={true}
      hasBackground={false}
      position="left"
      retracted={menuRetracted}
      setRetracted={setMenuRetracted}
    >
      <ContentWrapper>
        <Form onChange={onFormChange}>
          {Object.keys(categorisedVisus)
            .sort((a, b) => b.localeCompare(a))
            .map((type) => (
              <FieldDetails key={type} open={defaultCategory === type}>
                <Summary>
                  <Title>{type}</Title>
                  <IconWrapper id="close" size={16} stroke-width={2} />
                </Summary>
                <SubSectionWrapper>
                  {categorisedVisus[type]
                    .sort((element1, element2) =>
                      element1.name.localeCompare(element2.name),
                    )
                    .map((item: IFormItem) => {
                      return (
                        <ItemWrapper key={item.id}>
                          <VisuItem info={item} isLoading={isLoading} />
                          <InfoContainer
                            onClick={() => updateDescription(item.id)}
                            title={`Sobre ${item.name}`}
                          >
                            <QuestionMarkImg
                              id="question"
                              height={20}
                              width={20}
                            />
                          </InfoContainer>
                        </ItemWrapper>
                      );
                    })}
                </SubSectionWrapper>
              </FieldDetails>
            ))}
        </Form>
        {/* <DateInput
          mapId={currentVisu.id}
          initialYear={currentVisu?.year}
          dates={currentImagedata}
          isLoading={isLoading}
          onChange={() => {}}
        /> */}
      </ContentWrapper>
    </MenuModal>
  );
};

export default MapsMenu;
