import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import React, { useEffect, useState } from "react";

import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";

import RowArticle from "./Row";
import useMediaQuery from "hooks/useMediaQuery";

export default function Swipe({ articles }) {
  const { width } = useMediaQuery();

  const slidesPerView = () => {
    if (width < 640) return 1;
    if (width < 1024) return 2;
    if (width > 1000) return 5;
  };

  return (
    <div className="w-[90%] lg:max-w-[1480px] self-center relative">
      <Swiper
        modules={[Navigation]}
        navigation={{ nextEl: ".prev-button", prevEl: ".next-button" }}
        spaceBetween={0}
        slidesPerView={slidesPerView()}
      >
        {articles.slice(0, 10).map((article) => (
          <SwiperSlide
            className="lg:max-w-[330px] max-w-[400px]"
            key={article._id}
          >
            <RowArticle article={article} />
          </SwiperSlide>
        ))}
      </Swiper>

      <ChevronLeftIcon className="absolute lg:top-[180px] sm:top-44 top-40 -left-4 cursor-pointer ring ring-yellowwallow bg-white rounded-full z-[9] next-button w-8 h-8" />
      <ChevronRightIcon className="absolute lg:top-[180px] sm:top-44 top-40 -right-4 cursor-pointer ring ring-yellowwallow bg-white rounded-full z-[9] prev-button w-8 h-8" />
    </div>
  );
}
