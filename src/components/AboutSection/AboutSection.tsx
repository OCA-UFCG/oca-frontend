"use client";

import { TextContainer } from "./AboutSection.styles";
import { renderOptions } from "@/contexts/ContentProvider";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

const AboutSection = ({ content }: { content: any }) => {
  return (
    <TextContainer>
      {documentToReactComponents(content, renderOptions)}
    </TextContainer>
  );
};

export default AboutSection;
