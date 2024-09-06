import { SectionTitle } from "../globalStyles";
import { ContentWrapper, CoverImage } from "./styles";
import Template from "@/templates/hubTemplate";
import { getContent } from "@/utils/functions";
import AboutSection from "@/components/AboutSection/AboutSection";

export const revalidate = 60;

const About = async () => {
  const { nossaHistoria: content } = await getContent(["nossaHistoria"]);

  return (
    <Template>
      <ContentWrapper>
        <SectionTitle>{content[0].fields?.ttulo}</SectionTitle>
        <CoverImage
          alt="Pessoas do oca"
          height={600}
          width={1200}
          src={`https:${content[0].fields?.cover.fields.file.url}`}
        />
        <AboutSection content={content[0].fields?.conteudo} />
      </ContentWrapper>
    </Template>
  );
};

export default About;
