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
    setNewsItems(fetchedNewsItems as unknown as INews[]);
    setLoading(false);
  };

  useEffect(() => {
    loadNews();
  }, []);

  return (
    <CarouselWrapperSection>
      <SectionTitle>Últimas atualizações</SectionTitle>
      <CarouselWrapper>
        {newsItems.length == 0 && loading == false ? (
          <NewsCarousel
            newsItems={[
              {
                fields: {
                  thumb: {
                    fields: {
                      file: {
                        url: "drive.google.com/thumbnail?id=1iAfp02KeJGkAUQm73jlsRok0NGj-Ohg1",
                      },
                    },
                  },
                  url: "https://www.instagram.com/observatorio.caatinga?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
                  title: "Observatório da Caatinga",
                },
              },
            ]}
          />
        ) : (
          <NewsCarousel newsItems={newsItems} />
        )}
      </CarouselWrapper>
    </CarouselWrapperSection>
  );
};

export default CarouselSection;
