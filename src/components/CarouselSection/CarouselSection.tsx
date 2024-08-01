"use client";

import NewsCarousel from "./NewsCarousel/NewsCarousel";
import {
  CarouselWrapper,
  CarouselWrapperSection,
} from "./CarouselSection.styles";
import { SectionTitle } from "@/app/globalStyles";

const CarouselSection = () => {
  return (
    <CarouselWrapperSection>
      <SectionTitle>Últimas atualizações</SectionTitle>
      <CarouselWrapper>
        <NewsCarousel />
      </CarouselWrapper>
    </CarouselWrapperSection>
  );
};

export default CarouselSection;
