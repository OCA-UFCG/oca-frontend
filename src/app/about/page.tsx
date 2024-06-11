"use client";

import { ReactNode, useEffect, useState } from "react";
import { ArticleImage, SectionTitle } from "../globalStyles";
import { Article, ContentWrapper, OcaImage } from "./styles";
import OcaLogo from "@/../public/logo-oca-full.svg";
import Template from "@/templates/hubTemplate";
import { client } from "../contentful";
import {
  Options,
  documentToReactComponents,
} from "@contentful/rich-text-react-renderer";
import { Document, BLOCKS } from "@contentful/rich-text-types";

const About = () => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<ReactNode | null>(null);

  useEffect(() => {
    const options: Options = {
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

    const loadData = async () => {
      const res = await client.getEntries({ content_type: "nossaHistoria" });

      if (res?.items[0]?.fields?.conteudo) {
        setContent(
          documentToReactComponents(
            res?.items[0]?.fields?.conteudo as Document,
            options,
          ),
        );
      }
      if (res?.items[0]?.fields?.ttulo) {
        setTitle(res?.items[0]?.fields?.ttulo as string);
      }
    };
    loadData();
  }, []);

  return (
    <Template>
      <ContentWrapper>
        <OcaImage src={OcaLogo} alt="oi" />
        <SectionTitle>{title}</SectionTitle>
        <Article>{content && content}</Article>
      </ContentWrapper>
    </Template>
  );
};

export default About;
