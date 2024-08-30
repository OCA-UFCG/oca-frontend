import { SectionTitle } from "../globalStyles";
import { ContentWrapper } from "./styles";
import Template from "@/templates/hubTemplate";
import { getContent } from "@/utils/functions";
import AboutSection from "@/components/AboutSection/AboutSection";

const About = async () => {
  const { nossaHistoria: content } = await getContent(["nossaHistoria"]);

  return (
    <Template>
      <ContentWrapper>
        <SectionTitle>{content[0].fields?.ttulo}</SectionTitle>
        <AboutSection content={content[0].fields?.conteudo} />
      </ContentWrapper>
    </Template>
  );
};

export default About;
