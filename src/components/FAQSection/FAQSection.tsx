import { IFAQ, ISectionHeader } from "@/utils/interfaces";
import { FAQContainer, Wrapper } from "./FAQSection.styles";
import { SectionHeader } from "../SectionHeader/SectionHeader";
import QuestionFAQ from "./QuestionFAQ/QuestionFAQ";

const FAQSection = ({
  sectionHead,
  FAQ,
}: {
  sectionHead: ISectionHeader[];
  FAQ: IFAQ[];
}) => {
  return (
    <Wrapper $full={"false"} id="FAQ">
      <SectionHeader id="FAQ" sectionHead={sectionHead} />
      <FAQContainer>
        {FAQ.map((FAQ, index) => (
          <QuestionFAQ key={index} data={FAQ} />
        ))}
      </FAQContainer>
    </Wrapper>
  );
};

export default FAQSection;
