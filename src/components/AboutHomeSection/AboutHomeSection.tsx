"use client";

import {
  ContentModal,
  TextContainer,
  ViewMore,
  Wrapper,
  ContentWrapper,
} from "./AboutHomeSection.styles";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Options } from "@contentful/rich-text-react-renderer";
import { BLOCKS } from "@contentful/rich-text-types";
import { ArticleImage, SectionTitle } from "@/app/globalStyles";

export const renderOptions: Options = {
  renderNode: {
    [BLOCKS.EMBEDDED_ASSET]: (node) => {
      return (
        <ArticleImage
          alt=""
          width={node.data.target.fields.file.details.image.width}
          height={node.data.target.fields.file.details.image.height}
          src={`https:${node.data.target.fields.file.url}`}
        />
      );
    },
  },
};

const AboutHomeSection = ({ content }: { content: any }) => {
  return (
    <Wrapper>
      <ContentWrapper>
        <ContentModal>
          <SectionTitle>Quem Somos</SectionTitle>
          <TextContainer>
            {documentToReactComponents(content, renderOptions)}
          </TextContainer>
          <ViewMore href="/about">Ler mais</ViewMore>
        </ContentModal>
      </ContentWrapper>
    </Wrapper>
  );
};

export default AboutHomeSection;