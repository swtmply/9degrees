import React from "react";
import { Pagination, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

import Image from "next/image";

export default function HeroSwipe() {
  return (
    <div className="absolute right-0 w-[55%] h-[400px]">
      <Swiper
        modules={[Pagination, Autoplay]}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        spaceBetween={0}
        slidesPerView={1}
      >
        <SwiperSlide>
          <div className="w-full h-[400px]">
            <Image
              className="rounded-bl-[4.5rem]"
              src="/samples/ad-placeholder.png"
              layout="fill"
              objectFit="cover"
            />
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="w-full h-[400px]">
            <Image
              className="rounded-bl-[4.5rem]"
              src="/samples/placeholder-image.png"
              layout="fill"
              objectFit="cover"
            />
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="w-full h-[400px]">
            <Image
              className="rounded-bl-[4.5rem]"
              src="/samples/PUBMAT SAMPLE.jpg"
              layout="fill"
              objectFit="cover"
            />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
