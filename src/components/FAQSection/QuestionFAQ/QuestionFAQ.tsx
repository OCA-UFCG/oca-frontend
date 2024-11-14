import { IPublication } from "@/utils/interfaces";
import {
  FieldDetails,
  IconWrapper,
  SubSectionFAQ,
  Summary,
  Title,
} from "./QuestionFAQ.styles";

const QuestionFAQ = ({ data }: { data: IPublication }) => {
  const { title, type } = data;

  return (
    <FieldDetails>
      <Summary>
        <Title>{type}</Title>
        <IconWrapper id="close" size={16} stroke-width={2} />
      </Summary>
      <SubSectionFAQ>{title}</SubSectionFAQ>
    </FieldDetails>
  );
};

export default QuestionFAQ;
