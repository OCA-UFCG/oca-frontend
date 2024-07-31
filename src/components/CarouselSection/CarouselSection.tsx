"use client";

import NewsCarousel from "./NewsCarousel/NewsCarousel";
import { CarouselWrapper } from "./CarouselSection.styles";
import { SectionTitle } from "@/app/globalStyles";

const CarouselSection = () => {
  return (
    <>
      <SectionTitle>Últimas atualizações</SectionTitle>
      <CarouselWrapper>
        <NewsCarousel />
      </CarouselWrapper>
    </>
  );
};

export default CarouselSection;
