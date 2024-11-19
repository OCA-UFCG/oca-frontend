import { IPublication } from "@/utils/interfaces";
import {
  QuestionContainer,
  IconWrapper,
  SubSectionFAQ,
  Summary,
  Title,
} from "./QuestionFAQ.styles";

const QuestionFAQ = ({ data }: { data: IPublication }) => {
  const { title, type } = data;

  return (
    <QuestionContainer>
      <Summary>
        <Title>{type}</Title>
        <IconWrapper id="close" size={16} stroke-width={2} />
      </Summary>
      <SubSectionFAQ>{title}</SubSectionFAQ>
    </QuestionContainer>
  );
};

export default QuestionFAQ;
