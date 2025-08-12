"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, Zoom } from "swiper/modules";
import "swiper/css";
import "swiper/css"; // Ensure Swiper styles are imported globally.
import "swiper/css/pagination"; // Ensure Swiper styles are imported globally.
import "swiper/css/navigation"; // Ensure Swiper styles are imported globally.
import "swiper/css/zoom";
import "./swiper-styles.css";
import { IAbout, IImage } from "@/utils/interfaces";

const SwiperWrapper = ({ content }: { content: IAbout }) => {
  return (
    <Swiper
      className="swiper"
      slidesPerView={1}
      spaceBetween={50}
      pagination={{ clickable: true }}
      navigation={true}
      loop={true}
      modules={[Autoplay, Pagination, Navigation, Zoom]}
      autoplay={{ delay: 7000 }}
      zoom={true}
    >
      {content.picturesCollection.items.map((item: IImage, key: number) => (
        <SwiperSlide key={key}>
          <div key={key} className="carousel-image swiper-zoom-container">
            <img
              key={key}
              alt={item.title || ""}
              height={item.height || 300}
              width={item.width || 400}
              src={item.url}
            />
          </div>
        </SwiperSlide>
      ))}
      ;
    </Swiper>
  );
};

export default SwiperWrapper;
