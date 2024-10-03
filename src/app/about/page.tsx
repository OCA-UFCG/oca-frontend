import { SectionTitle } from "../globalStyles";
import { ContentWrapper, Carousel, CarouselImage } from "./styles";

// remember to put coberImage again

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
        <Carousel>
          <CarouselImage
            alt="Pessoas do oca"
            height={400}
            width={800}
            src={`https:${content[0].fields?.cover.fields.file.url}`}
          />
          {JSON.stringify(content[0].fields.cover)};
        </Carousel>
        <AboutSection content={content[0].fields?.conteudo} />
      </ContentWrapper>
    </Template>
  );
};

export default About;
