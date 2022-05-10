import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import "../css/swiperCss.css";

// import required modules
import { FreeMode, Pagination } from "swiper";

import UserRanking from "./UserRanking";

function SwiperPro() {
  return (
    <>
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        loop={true}
        modules={[FreeMode, Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
          <UserRanking />
        </SwiperSlide>
        <SwiperSlide>
          <UserRanking />
        </SwiperSlide>
        <SwiperSlide>
          <UserRanking />
        </SwiperSlide>
        <SwiperSlide>
          <UserRanking />
        </SwiperSlide>
        <SwiperSlide>
          <UserRanking />
        </SwiperSlide>
      </Swiper>
    </>
  );
}

export default SwiperPro;
