"use client";

import NewsCarousel from "./NewsCarousel/NewsCarousel";
import { CMSContext } from "@/contexts/ContentProvider";
import {
  CarouselWrapper,
  CarouselWrapperSection,
} from "./CarouselSection.styles";
import { SectionTitle } from "@/app/globalStyles";
import { useContext, useEffect, useState } from "react";
import { INews } from "@/utils/interfaces";
import { defaultNews } from "@/utils/constants";

const CarouselSection = () => {
  const { loadData } = useContext(CMSContext);
  const [newsItems, setNewsItems] = useState<INews[]>(defaultNews);
  const [loading, setLoading] = useState(true);

  const loadNews = async () => {
    const fetchedNewsItems = await loadData("news");
    if (fetchedNewsItems.length > 0) {
      setNewsItems(fetchedNewsItems as unknown as INews[]);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadNews();
  }, []);

  return (
    <CarouselWrapperSection>
      <SectionTitle>Últimas atualizações</SectionTitle>
      <CarouselWrapper>
        <NewsCarousel newsItems={newsItems} loading={loading} />
      </CarouselWrapper>
    </CarouselWrapperSection>
  );
};

export default CarouselSection;
