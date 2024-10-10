import { SectionTitle } from "../globalStyles";
import { ContentWrapper } from "./styles";

import Template from "@/templates/hubTemplate";
import { getContent } from "@/utils/functions";
import AboutSection from "@/components/AboutSection/AboutSection";
import SwiperWrapper from "@/components/Swiper/SwiperWrapper";

export default async function About() {
  const { nossaHistoria: content } = await getContent(["nossaHistoria"]);

  return (
    <Template>
      <ContentWrapper>
        <SectionTitle>{content[0].fields?.ttulo}</SectionTitle>
        <SwiperWrapper content={content} />
        <AboutSection content={content[0].fields?.conteudo} />
      </ContentWrapper>
    </Template>
  );
}
