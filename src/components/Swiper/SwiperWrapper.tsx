"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Zoom } from "swiper/modules";
import "swiper/css";
import "swiper/css"; // Ensure Swiper styles are imported globally.
import "swiper/css/pagination"; // Ensure Swiper styles are imported globally.
import "swiper/css/navigation"; // Ensure Swiper styles are imported globally.
import "swiper/css/zoom";
import "./swiper-styles.css";

const SwiperWrapper = ({ content }: { content: any }) => {
  return (
    <Swiper
      className="swiper"
      slidesPerView={1}
      spaceBetween={50}
      pagination={{ clickable: true }}
      navigation={true}
      loop={true}
      modules={[Pagination, Navigation, Zoom]}
      autoplay={{ delay: 3000 }}
      zoom={true}
    >
      {content[0].fields.pictures.map((item: any, key: number) => (
        <SwiperSlide key={key}>
          <div key={key} className="carousel-image swiper-zoom-container">
            <img
              key={key}
              alt={item.fields.title || ""}
              height={item.fields.file.details.image.height || 300}
              width={item.fields.file.details.image.width || 400}
              src={`https:${item.fields.file.url}`}
            />
          </div>
        </SwiperSlide>
      ))}
      ;
    </Swiper>
  );
};

export default SwiperWrapper;
