"use client";

import NewsCarousel from "./NewsCarousel/NewsCarousel";
import {
  CarouselWrapper,
  CarouselWrapperSection,
} from "./CarouselSection.styles";
import { INews } from "@/utils/interfaces";

const CarouselSection = ({ newsItems }: { newsItems: INews[] }) => {
  return (
    <CarouselWrapperSection id="news">
      <CarouselWrapper>
        <NewsCarousel newsItems={newsItems} loading={false} />
      </CarouselWrapper>
    </CarouselWrapperSection>
  );
};

export default CarouselSection;
