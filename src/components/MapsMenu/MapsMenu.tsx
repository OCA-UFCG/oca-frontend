import MenuModal from "@/components/MenuModal/MenuModal";
import { VisuItem } from "@/components/VisuItem/VisuItem";
import { useEffect, useState } from "react";
import QuestionMarkIcon from "@/../public/questionMark.svg";
import { IEEInfo, IFormItem, IImageData } from "@/utils/interfaces";
import DateInput from "@/components/DateInput/DateInput";
import {
  ContentWrapper,
  Form,
  ItemWrapper,
  QuestionMarkImg,
  Title,
} from "./MapsMenu.styles";

const MapsMenu = ({
  initialValue,
  options,
  onSelectChange,
  onQuestionSelect,
}: {
  initialValue: string;
  options: IEEInfo[];
  onSelectChange: (name: string, year: string) => void;
  onQuestionSelect: (newItem: string) => void;
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
    onItemChange(initialValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MenuModal hasBackground={false}>
      <ContentWrapper>
        <Title>Visualizações Disponíveis</Title>
        <Form>
          {formValues.map((item: IFormItem) => {
            return (
              <ItemWrapper key={item.id}>
                <VisuItem info={item} onChange={onItemChange} />
                <QuestionMarkImg
                  onClick={() => onQuestionSelect(item.id)}
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
          dates={currentImagedata}
          onChange={onSelectChange}
        />
      </ContentWrapper>
    </MenuModal>
  );
};

export default MapsMenu;
