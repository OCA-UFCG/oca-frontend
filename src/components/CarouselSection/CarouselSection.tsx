"use client";

import NewsCarousel from "./NewsCarousel/NewsCarousel";
import { CarouselWrapper } from "./CarouselSection.styles";

const CarouselSection = () => {
  return (
    <CarouselWrapper>
      <NewsCarousel />
      <NewsCarousel />
      <NewsCarousel />
    </CarouselWrapper>
  );
};

export default CarouselSection;
