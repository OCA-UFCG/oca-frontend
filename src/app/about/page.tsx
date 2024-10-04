"use client";

import { SectionTitle } from "../globalStyles";
import { ContentWrapper, Carousel, CarouselImage } from "./styles";
import { useState, useEffect } from "react";

import Template from "@/templates/hubTemplate";
import { getContent } from "@/utils/functions";
import AboutSection from "@/components/AboutSection/AboutSection";

const About = () => {
  const [content, setContent] = useState<any[]>([]);

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const { nossaHistoria: content } = await getContent(["nossaHistoria"]);
      setContent(content);
    };

    fetchData();
  }, []);

  const nextSlide = () => {
    console.log(index);
    setIndex((index) =>
      index === content[0].fields.pictures.length - 1 ? 0 : index + 1,
    );
  };

  const prevSlide = () => {
    console.log(index);
    setIndex((index) =>
      index === 0 ? content[0].fields.pictures.length - 1 : index - 1,
    );
  };

  if (content.length === 0) return <div>Loading...</div>;

  return (
    <Template>
      <ContentWrapper>
        <SectionTitle>{content[0].fields?.ttulo}</SectionTitle>
        <Carousel>
          <CarouselImage
            alt=""
            width={300}
            height={400}
            src={`https:${content[0].fields.pictures[index].fields.file.url}`}
          />
        </Carousel>
        <button onClick={nextSlide}>{">"}</button>
        <button onClick={prevSlide}>{"<"}</button>
        <AboutSection content={content[0].fields?.conteudo} />
      </ContentWrapper>
    </Template>
  );
};

export default About;
