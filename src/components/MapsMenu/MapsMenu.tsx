import MenuModal from "@/components/MenuModal/MenuModal";
import { VisuItem } from "@/components/VisuItem/VisuItem";
import { useEffect, useState } from "react";
import QuestionMarkIcon from "@/../public/questionMark.svg";
import { IEEInfo, IFormItem, IImageData, IMapInfo } from "@/utils/interfaces";
import DateInput from "@/components/DateInput/DateInput";
import {
  ContentWrapper,
  Form,
  ItemWrapper,
  QuestionMarkImg,
  Title,
} from "./MapsMenu.styles";

const MapsMenu = ({
  initialValues,
  options,
  retracted,
  setRetracted,
  onSelectChange,
  onQuestionSelect,
}: {
  initialValues: IMapInfo;
  options: IEEInfo[];
  retracted: boolean;
  setRetracted: (retracted: boolean) => void;
  onSelectChange: (newValues: IMapInfo) => void;
  onQuestionSelect: (newItem: string, retract?: boolean) => void;
}) => {
  const [formValues, setFormValues] = useState<IFormItem[]>([]);
  const [currentImagedata, setcurrentImageData] = useState<IImageData>({});
  const [currentName, setCurrentName] = useState<string>("");

  const onItemChange = (newValue: string) => {
    setFormValues(() =>
      Object.values(options).map((item) => {
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
        <Form>
          {formValues.map((item: IFormItem) => {
            return (
              <ItemWrapper key={item.id}>
                <VisuItem
                  info={item}
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
        <DateInput
          mapId={currentName}
          initialYear={initialValues?.year}
          dates={currentImagedata}
          onChange={onSelectChange}
        />
      </ContentWrapper>
    </MenuModal>
  );
};

export default MapsMenu;
