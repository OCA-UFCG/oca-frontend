"use client";

import { useState, useEffect } from "react";
import {
  NewsWrapper,
  NewsImage,
  NewsTitle,
  ButtonWrapper,
  LoadingBar,
  RoundButton,
  Overlay,
  LoadingIcon,
} from "./NewsCarousel.styles";
import { INews } from "@/utils/interfaces";

const NewsCarousel = ({
  newsItems,
  loading,
}: {
  newsItems: INews[];
  loading: boolean;
}) => {
  const [index, setIndex] = useState(0);
  const length = 3;
  let handler: NodeJS.Timeout;

  const handleNext = (event?: { stopPropagation: () => void } | undefined) => {
    event?.stopPropagation();
    setIndex((index + 1) % length);
  };
  const handlePrev = (event?: { stopPropagation: () => void }) => {
    event?.stopPropagation();
    setIndex((index - 1 + length) % length);
  };

  const funcDebounce = () => {
    handler = setTimeout(() => {
      handleNext();
    }, 7000);
  };

  const redirectUrl = () => {
    window.open(newsItems[index]?.fields.url, "_blank");
  };

  useEffect(() => {
    if (newsItems.length > 1) {
      funcDebounce();
    }

    return () => {
      clearTimeout(handler);
    };
  }, [index, newsItems]);

  return (
    <NewsWrapper onClick={redirectUrl}>
      {loading ? (
        <LoadingIcon id="loading" />
      ) : (
        <>
          <NewsImage
            width={1600}
            height={800}
            src={
              newsItems[index]?.fields.thumb.fields.file.url
                ? `https://${newsItems[index]?.fields.thumb.fields.file.url}`
                : ""
            }
            alt="News"
          />
          <Overlay />
          {newsItems.length > 1 && (
            <ButtonWrapper>
              <RoundButton size={36} id="previous-slide" onClick={handlePrev} />
              <RoundButton size={36} id="next-slide" onClick={handleNext} />
            </ButtonWrapper>
          )}
          <NewsTitle>
            {newsItems[index]?.fields.title.length > 60
              ? `${newsItems[index]?.fields.title.substring(0, 60)}...`
              : newsItems[index]?.fields.title}
          </NewsTitle>
          {newsItems.length > 1 && <LoadingBar key={index} />}
        </>
      )}
    </NewsWrapper>
  );
};

export default NewsCarousel;
