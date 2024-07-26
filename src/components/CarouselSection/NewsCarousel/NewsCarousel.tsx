"use client";

import { useState, useContext, useEffect } from "react";
import { CMSContext } from "@/contexts/ContentProvider";
import {
  NewsWrapper,
  NewsImage,
  NewsTitle,
  PreviousButton,
  NextButton,
  ButtonWrapper,
} from "./NewsCarousel.styles";
import { INews } from "@/utils/interfaces";

const NewsCarousel = () => {
  const { loadData } = useContext(CMSContext);
  const [newsItems, setNewsItems] = useState<INews[]>([]);
  const [index, setIndex] = useState(0);
  const length = 3;
  const handleNext = () => {
    setIndex((index + 1) % length);
  };
  const handlePrev = () => {
    setIndex((index - 1 + length) % length);
  };

  const loadNews = async () => {
    const fetchedNewsItems = await loadData("news");
    setNewsItems(fetchedNewsItems as unknown as INews[]);
  };

  useEffect(() => {
    loadNews();
  }, []);

  return (
    <NewsWrapper>
      <NewsImage
        src={newsItems[index]?.fields.thumb.fields.file.url}
        alt="News"
      />
      <ButtonWrapper>
        <PreviousButton onClick={handlePrev}>Previous</PreviousButton>
        <NextButton onClick={handleNext}>Next</NextButton>
      </ButtonWrapper>
      <NewsTitle>{newsItems[index]?.fields.title}</NewsTitle>
    </NewsWrapper>
  );
};

export default NewsCarousel;
