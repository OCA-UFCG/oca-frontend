import MenuModal from "@/components/MenuModal/MenuModal";
import { VisuItem } from "@/components/VisuItem/VisuItem";
import { FormEvent, useContext, useMemo } from "react";
import { IEEInfo } from "@/utils/interfaces";
import {
  ContentWrapper,
  Form,
  ItemWrapper,
  SubSectionWrapper,
  FieldDetails,
  Summary,
  IconWrapper,
  Title,
} from "./MapsMenu.styles";
import { MapTiffContext } from "@/contexts/MapContext";
import DateInput from "../DateInput/DateInput";

const formatData = (newValue: string, tiffs: { fields: IEEInfo }[]) => {
  const typesMap: { [key: string]: IEEInfo[] } = {};

  Object.values(tiffs).forEach(({ fields: item }) => {
    if (!typesMap[item.type]) {
      typesMap[item.type] = [];
    }

    typesMap[item.type].push({ ...item, checked: item.id === newValue });
  });

  return typesMap;
};

const MapsMenu = () => {
  const {
    currentVisu,
    setCurrentVisu,
    tiffs,
    menuRetracted,
    setMenuRetracted,
  } = useContext(MapTiffContext);
  const defaultCategory = useMemo(
    () =>
      Object.values(tiffs).find(
        (mapData) => mapData.fields.id === currentVisu.id,
      )?.fields?.type,

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const categorizedVisus = useMemo(
    () => formatData(currentVisu.id, tiffs),

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentVisu.id],
  );

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
          {Object.keys(categorizedVisus)
            .sort((a, b) => b.localeCompare(a))
            .map((type) => (
              <FieldDetails key={type} open={defaultCategory === type}>
                <Summary>
                  <Title>{type}</Title>
                  <IconWrapper id="close" size={16} strokeWidth={2} />
                </Summary>
                <SubSectionWrapper>
                  {categorizedVisus[type]
                    .sort((element1, element2) =>
                      element1.name.localeCompare(element2.name),
                    )
                    .map((item: IEEInfo) => {
                      return (
                        <ItemWrapper key={item.id}>
                          <VisuItem info={item} />
                        </ItemWrapper>
                      );
                    })}
                </SubSectionWrapper>
              </FieldDetails>
            ))}
        </Form>
        <DateInput />
      </ContentWrapper>
    </MenuModal>
  );
};

export default MapsMenu;
