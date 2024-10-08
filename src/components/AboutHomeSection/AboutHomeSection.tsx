"use client";

import {
  ContentModal,
  TextContainer,
  ViewMore,
  Wrapper,
  ContentWrapper,
  SectionHeader,
} from "./AboutHomeSection.styles";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Options } from "@contentful/rich-text-react-renderer";
import { BLOCKS } from "@contentful/rich-text-types";
import { ArticleImage } from "@/app/globalStyles";
import { PhotoAlbum } from "../PhotoAlbum/PhotoAlbum";
import { ISectionHeader } from "@/utils/interfaces";

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

const AboutHomeSection = ({
  sectionHead,
  content,
  photos,
}: {
  sectionHead: ISectionHeader[];
  content: any;
  photos: any[];
}) => {
  return (
    <Wrapper id="about">
      <ContentWrapper>
        <ContentModal>
          <SectionHeader
            alignment="start"
            id="about"
            sectionHead={sectionHead}
          />
          <TextContainer>
            {documentToReactComponents(content, renderOptions)}
          </TextContainer>
          <ViewMore href="/about">Ler mais</ViewMore>
        </ContentModal>
        <PhotoAlbum photos={photos} />
      </ContentWrapper>
    </Wrapper>
  );
};

export default AboutHomeSection;
