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
  let handler: NodeJS.Timeout;

  const handleNews = (
    updateIndex: () => number,
    event?: { preventDefault: () => void } | undefined,
  ) => {
    event?.preventDefault();
    setIndex(updateIndex);
  };

  const newsDebounce = () => {
    handler = setTimeout(() => {
      handleNews(() => (index + 1) % newsItems.length);
    }, 7000);
  };

  useEffect(() => {
    if (newsItems.length > 1) {
      newsDebounce();
    }

    return () => {
      clearTimeout(handler);
    };
  }, [index, newsItems]);

  return (
    <NewsWrapper href={newsItems[index]?.fields.url} target="_blank">
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
              <RoundButton
                size={36}
                id="previous-slide"
                onClick={(e) =>
                  handleNews(
                    () => (index - 1 + newsItems.length) % newsItems.length,
                    e,
                  )
                }
              />
              <RoundButton
                size={36}
                id="next-slide"
                onClick={(e) =>
                  handleNews(() => (index + 1) % newsItems.length, e)
                }
              />
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
