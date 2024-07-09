"use client";

import { ReactNode, useContext, useEffect, useState } from "react";
import { SectionTitle } from "../globalStyles";
import { Article, ContentWrapper, OcaImage } from "./styles";
import Template from "@/templates/hubTemplate";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Document } from "@contentful/rich-text-types";
import { CMSContext, renderOptions } from "@/contexts/ContentProvider";

const About = () => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<ReactNode | null>(null);
  const { loadData } = useContext(CMSContext);

  useEffect(() => {
    const loadContent = async () => {
      const [contentItems] = await loadData("nossaHistoria");

      if (contentItems.fields?.conteudo) {
        setContent(
          documentToReactComponents(
            contentItems?.fields?.conteudo as Document,
            renderOptions,
          ),
        );
      }
      if (contentItems?.fields?.ttulo) {
        setTitle(contentItems?.fields?.ttulo as string);
      }
    };

    loadContent();
  }, [loadData]);

  return (
    <Template>
      <ContentWrapper>
        <OcaImage id="logo-oca" />
        <SectionTitle>{title}</SectionTitle>
        <Article>{content && content}</Article>
      </ContentWrapper>
    </Template>
  );
};

export default About;
