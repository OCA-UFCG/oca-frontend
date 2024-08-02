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

const CarouselSection = () => {
  const { loadData } = useContext(CMSContext);
  const [newsItems, setNewsItems] = useState<INews[]>([]);
  const [loading, setLoading] = useState(true);

  const loadNews = async () => {
    const fetchedNewsItems = await loadData("news");
    if (fetchedNewsItems.length > 0) {
      setNewsItems(fetchedNewsItems as unknown as INews[]);
    } else {
      setNewsItems([
        {
          fields: {
            thumb: {
              fields: {
                file: {
                  url: "images.ctfassets.net/49yodhe2mply/7EZ7TU15FiOxrbIRZCvuPZ/9c8efc4158c700abde67ca84f8268a1c/Frame_214__1_.png",
                },
              },
            },
            url: "https://www.instagram.com/observatorio.caatinga?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
            title: "Observatório da Caatinga",
          },
        },
      ]);
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
