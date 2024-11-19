"use client";
import { IPublication, ISectionHeader } from "@/utils/interfaces";
import { FAQContainer, Wrapper } from "./FAQSection.styles";
import { SectionHeader } from "../SectionHeader/SectionHeader";
import QuestionFAQ from "./QuestionFAQ/QuestionFAQ";

const FAQSection = ({
  sectionHead,
  FAQ,
}: {
  sectionHead: ISectionHeader[];
  FAQ: { fields: IPublication }[];
}) => {
  return (
    <Wrapper full={"false"} id="FAQ">
      <SectionHeader id="FAQ" sectionHead={sectionHead} />
      <FAQContainer>
        {FAQ.map((publications, index) => (
          <QuestionFAQ key={index} data={publications.fields} />
        ))}
      </FAQContainer>
    </Wrapper>
  );
};

export default FAQSection;
