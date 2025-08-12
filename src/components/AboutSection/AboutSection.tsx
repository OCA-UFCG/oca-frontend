"use client";

import { TextContainer } from "./AboutSection.styles";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Options } from "@contentful/rich-text-react-renderer";
import { BLOCKS } from "@contentful/rich-text-types";
import { ArticleImage } from "@/app/globalStyles";
import { Document } from "@contentful/rich-text-types";
import { Asset } from "@/utils/interfaces";

export const AboutSection = ({
  content,
}: {
  content: {
    json: Document;
    links: {
      assets: { block: Asset[] };
    };
  };
}) => {
  const renderOptions: Options = {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: (node) => {
        const assetId = node.data.target.sys.id;
        const asset = content.links.assets.block.find(
          (a) => a.sys.id === assetId,
        );

        if (!asset) return null;

        return (
          <ArticleImage
            alt=""
            width={asset.width}
            height={asset.height}
            src={asset.url}
          />
        );
      },
    },
  };

  return (
    <TextContainer>
      {documentToReactComponents(content.json, renderOptions)}
    </TextContainer>
  );
};

export default AboutSection;
