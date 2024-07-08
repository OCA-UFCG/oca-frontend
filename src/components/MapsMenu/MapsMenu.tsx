import { usePathname, useRouter, useSearchParams } from "next/navigation";
import MenuModal from "@/components/MenuModal/MenuModal";
import { VisuItem } from "@/components/VisuItem/VisuItem";
import { useCallback, useContext, useEffect, useState } from "react";
import QuestionMarkIcon from "@/../public/questionMark.svg";
import { IFormItem, IImageData, IMapInfo } from "@/utils/interfaces";
import DateInput from "@/components/DateInput/DateInput";
import {
  ContentWrapper,
  Form,
  ItemWrapper,
  QuestionMarkImg,
  Title,
} from "./MapsMenu.styles";
import { CMSContext } from "@/contexts/ContentProvider";

const MapsMenu = ({
  initialValues,
  retracted,
  isLoading,
  setRetracted,
  updateVisu,
  onQuestionSelect,
}: {
  initialValues: IMapInfo;
  retracted: boolean;
  isLoading: boolean;
  setRetracted: (retracted: boolean) => void;
  updateVisu: (newValues: IMapInfo) => void;
  onQuestionSelect: (newItem: string, retract?: boolean) => void;
}) => {
  const [formValues, setFormValues] = useState<IFormItem[]>([]);
  const [currentImagedata, setcurrentImageData] = useState<IImageData>({});
  const [currentName, setCurrentName] = useState<string>("");
  const { mapsData } = useContext(CMSContext);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleVisuChange = useCallback(
    (newImageData: IMapInfo) => {
      const { name, year } = newImageData;
      const params = new URLSearchParams(searchParams.toString());

      params.set("name", name);
      params.set("year", year || "general");

      router.push(`${pathname}?${params.toString()}`);

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
        }

        return {
          id: item.id,
          name: item.name,
          checked: item.id === newValue,
          imageData: item.imageData,
        };
      }),
    );
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
        <Title>Visualizações Disponíveis</Title>
        {formValues.length > 0 ? (
          <Form>
            {formValues
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
                    <QuestionMarkImg
                      onClick={() => onQuestionSelect(item.id)}
                      title={`Sobre ${item.name}`}
                      src={QuestionMarkIcon}
                      alt={QuestionMarkIcon}
                      height={16}
                      width={16}
                    />
                  </ItemWrapper>
                );
              })}
          </Form>
        ) : (
          <p>No data available</p>
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
