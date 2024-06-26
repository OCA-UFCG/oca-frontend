import { LinkButton, SectionTitle } from "@/app/globalStyles";
import { CactusImage, TextContainer, Wrapper } from "./AboutSection.styles";
import Cactus from "@/../public/cactus.svg";
import { CMSContext, renderOptions } from "@/contexts/ContentProvider";
import { ReactNode, useContext, useEffect, useState } from "react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Document } from "@contentful/rich-text-types";

const AboutSection = () => {
  const [content, setContent] = useState<ReactNode | null>(null);
  const { loadData } = useContext(CMSContext);

  useEffect(() => {
    const loadContent = async () => {
      const [contentItems] = await loadData("about");

      if (contentItems.fields?.about) {
        setContent(
          documentToReactComponents(
            contentItems?.fields?.about as Document,
            renderOptions,
          ),
        );
      }
    };

    loadContent();
  }, [loadData]);

  return (
    <Wrapper>
      <TextContainer>
        <SectionTitle>Quem somos nós?</SectionTitle>
        {content && content}
        <LinkButton href="/about">Saiba mais</LinkButton>
      </TextContainer>
      <CactusImage src={Cactus} alt="" />
    </Wrapper>
  );
};

export default AboutSection;
