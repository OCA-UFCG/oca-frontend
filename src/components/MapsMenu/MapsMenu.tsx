import { usePathname, useRouter, useSearchParams } from "next/navigation";
import MenuModal from "@/components/MenuModal/MenuModal";
import { VisuItem } from "@/components/VisuItem/VisuItem";
import { FormEvent, useCallback, useState } from "react";
import { IEEInfo, IFormItem, IImageData, IMapInfo } from "@/utils/interfaces";
import DateInput from "@/components/DateInput/DateInput";
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

const formatData = (newValue: string, mapsData: { fields: IEEInfo }[]) => {
  const formValues = Object.values(mapsData).map(
    (mapData: { fields: IEEInfo }) => {
      const { id, name, type, imageData } = mapData.fields;

      return {
        id,
        name,
        checked: id === newValue,
        imageData,
        type,
      };
    },
  );

  const typesMap: { [key: string]: IFormItem[] } = {};

  formValues.forEach((item) => {
    if (!typesMap[item.type]) {
      typesMap[item.type] = [];
    }

    typesMap[item.type].push(item);
  });

  return typesMap;
};

const MapsMenu = ({
  initialValues,
  retracted,
  mapsData,
  isLoading,
  setRetracted,
  updateVisu,
  onQuestionSelect,
}: {
  initialValues: IMapInfo;
  retracted: boolean;
  isLoading: boolean;
  mapsData: { fields: IEEInfo }[];
  setRetracted: (retracted: boolean) => void;
  updateVisu: (newValues: IMapInfo) => void;
  onQuestionSelect: (newItem: string, retract?: boolean) => void;
}) => {
  const [currentImagedata, setcurrentImageData] = useState<IImageData>({});
  const [currentName, setCurrentName] = useState<string>("");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const defaultCategory = Object.values(mapsData).find(
    (mapData) => mapData.fields.id === initialValues.name,
  )?.fields?.type;
  const categorisedVisus = formatData(initialValues.name, mapsData);

  const handleVisuChange = useCallback(
    (newImageData: IMapInfo) => {
      const { name, year } = newImageData;
      const params = new URLSearchParams(searchParams.toString());

      params.set("name", name);
      params.set("year", year || "general");

      if (window.location.href.includes("/map")) {
        router.push(`${pathname}?${params.toString()}`);
      }

      updateVisu(newImageData);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pathname, router, searchParams],
  );

  const onItemChange = (newValue: string) => {
    const newData = Object.values(mapsData).find(
      (mapData) => mapData.fields.id === newValue,
    );

    if (newData) {
      const { id, imageData } = newData.fields;
      setCurrentName(id);
      setcurrentImageData(imageData);
    }
  };

  return (
    <MenuModal
      hasIcon={true}
      hasBackground={false}
      position="left"
      retracted={retracted}
      setRetracted={setRetracted}
    >
      <ContentWrapper>
        <Form
          onChange={(e: FormEvent<HTMLFormElement>) =>
            onItemChange((e.target as HTMLInputElement).value)
          }
        >
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
                          <VisuItem
                            info={item}
                            isLoading={isLoading}
                            onIconClick={onQuestionSelect}
                          />
                          <InfoContainer
                            onClick={() => onQuestionSelect(item.id)}
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
        <DateInput
          mapId={currentName}
          initialYear={initialValues?.year}
          dates={currentImagedata}
          isLoading={isLoading}
          onChange={handleVisuChange}
        />
      </ContentWrapper>
    </MenuModal>
  );
};

export default MapsMenu;
