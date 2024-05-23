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
import { IEEInfo, IFormItem, IImageData } from "@/utils/interfaces";
import DateInput from "../DateInput/DateInput";

const MapsMenu = ({
  initialValue,
  options,
  onSelectChange,
  onQuestionSelect,
}: {
  initialValue: string;
  options: IEEInfo[];
  onSelectChange: (newItem: string) => void;
  onQuestionSelect: (newItem: string) => void;
}) => {
  const [formValues, setFormValues] = useState<IFormItem[]>([]);
  const [currentImagedata, setcurrentImageData] = useState<IImageData>({});

  const onItemChange = (newValue: string) => {
    onSelectChange(newValue);
    setFormValues(() =>
      Object.values(options).map((item) => {
        if (item.id === newValue) {
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
    <MenuModal>
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
          dates={currentImagedata}
          onChange={() => console.log("dateee")}
        />
      </ContentWrapper>
    </MenuModal>
  );
};

export default MapsMenu;
