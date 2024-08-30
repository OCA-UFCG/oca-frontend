"use client";

import { TextContainer } from "./AboutSection.styles";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Options } from "@contentful/rich-text-react-renderer";
import { BLOCKS } from "@contentful/rich-text-types";
import { ArticleImage } from "@/app/globalStyles";

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

const AboutSection = ({ content }: { content: any }) => {
  return (
    <TextContainer>
      {documentToReactComponents(content, renderOptions)}
    </TextContainer>
  );
};

export default AboutSection;
