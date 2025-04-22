import { IFAQ } from "@/utils/interfaces";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import {
  QuestionContainer,
  IconWrapper,
  SubSectionFAQ,
  Summary,
  Title,
} from "./QuestionFAQ.styles";

const QuestionFAQ = ({ data }: { data: IFAQ }) => {
  return (
    <QuestionContainer>
      <Summary>
        <Title>{data.title}</Title>
        <IconWrapper id="close" size={16} strokeWidth={2} />
      </Summary>
      <SubSectionFAQ>{documentToReactComponents(data.details)}</SubSectionFAQ>
    </QuestionContainer>
  );
};

export default QuestionFAQ;
