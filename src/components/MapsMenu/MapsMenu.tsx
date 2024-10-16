import { usePathname, useRouter, useSearchParams } from "next/navigation";
import MenuModal from "@/components/MenuModal/MenuModal";
import { VisuItem } from "@/components/VisuItem/VisuItem";
import { useCallback, useEffect, useState } from "react";
import { IEEInfo, IFormItem, IImageData, IMapInfo } from "@/utils/interfaces";
import DateInput from "@/components/DateInput/DateInput";
import {
  ContentWrapper,
  Form,
  ItemWrapper,
  NoDataContainer,
  NoDataElement,
  QuestionMarkImg,
  SubSectionWrapper,
  FieldDetails,
  Summary,
  IconWrapper,
  InfoContainer,
  Title,
} from "./MapsMenu.styles";

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
  const [formValues, setFormValues] = useState<IFormItem[]>([]);
  const [mapTypes, setMapTypes] = useState<{ [key: string]: IFormItem[] }>({});
  const [currentImagedata, setcurrentImageData] = useState<IImageData>({});
  const [currentName, setCurrentName] = useState<string>("");
  const [currentCategory, setCurrentCategory] = useState<string>("");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

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
    setFormValues(() =>
      Object.values(mapsData).map((mapData) => {
        const { fields: item } = mapData;
        if (item.id === newValue) {
          setCurrentName(item.id);
          setcurrentImageData(item.imageData);
          currentCategory === "" && setCurrentCategory(item.type);
        }

        return {
          id: item.id,
          name: item.name,
          checked: item.id === newValue,
          imageData: item.imageData,
          type: item.type,
        };
      }),
    );

    const typesMap: { [key: string]: IFormItem[] } = {};

    formValues.forEach((item) => {
      if (!typesMap[item.type]) {
        typesMap[item.type] = [];
      }

      typesMap[item.type].push(item);
    });

    setMapTypes(typesMap);
  };

  useEffect(() => {
    onItemChange(initialValues.name);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialValues]);

  return (
    <MenuModal
      hasIcon={true}
      hasBackground={false}
      position="left"
      retracted={retracted}
      setRetracted={setRetracted}
    >
      <ContentWrapper>
        {formValues.length > 0 ? (
          <Form>
            {Object.keys(mapTypes)
              .sort((a, b) => b.localeCompare(a))
              .map((type) => (
                <FieldDetails key={type} open={currentCategory === type}>
                  <Summary>
                    <Title>{type}</Title>
                    <IconWrapper id="close" size={16} stroke-width={2} />
                  </Summary>
                  <SubSectionWrapper>
                    {mapTypes[type]
                      .sort((element1, element2) =>
                        element1.name.localeCompare(element2.name),
                      )
                      .map((item: IFormItem) => {
                        return (
                          <ItemWrapper key={item.id}>
                            <VisuItem
                              info={item}
                              isLoading={isLoading}
                              onClick={onQuestionSelect}
                              onChange={onItemChange}
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
        ) : (
          <NoDataContainer>
            {new Array(6).fill(0).map((_, index) => (
              <NoDataElement key={index} delay={index}></NoDataElement>
            ))}
          </NoDataContainer>
        )}
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
