import { SectionTitle } from "../globalStyles";
import { ContentWrapper } from "./styles";

import Template from "@/templates/hubTemplate";
import AboutSection from "@/components/AboutSection/AboutSection";
import SwiperWrapper from "@/components/Swiper/SwiperWrapper";
import { ABOUT_PAGE_QUERY } from "@/utils/queries";
import { getContent } from "@/utils/contentful";
import { IAbout } from "@/utils/interfaces";

interface IAboutContent {
  nossaHistoriaCollection: { items: IAbout[] };
}

export default async function About() {
  const { nossaHistoriaCollection: about }: IAboutContent =
    await getContent(ABOUT_PAGE_QUERY);

  return (
    <Template>
      <ContentWrapper>
        <SectionTitle>{about.items[0].ttulo}</SectionTitle>
        <SwiperWrapper content={about.items[0]} />
        <AboutSection content={about.items[0].conteudo} />
      </ContentWrapper>
    </Template>
  );
}
