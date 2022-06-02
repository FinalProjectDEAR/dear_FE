import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "../styles/libraryStyle/style.css";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper";

import Review from "./Review";

function Slide() {
  return (
    <>
      <Swiper
        slidesPerView={3}
        spaceBetween={30} //슬라이드 사이 여백
        centeredSlides={true}
        autoplay={{
          //자동슬라이드
          delay: 3000, //시간설정
          disableOnInteraction: false, //false-스와이프 후 자동 재생
        }}
        loop={true} //무힌루프로 돌릴 것인지
        // loopFillGroupWithBlank={true}
        pagination={{
          clickable: true, //버튼클릭여부
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <Review />
        </SwiperSlide>
        <SwiperSlide>
          <Review />
        </SwiperSlide>
        <SwiperSlide>
          <Review />
        </SwiperSlide>
        <SwiperSlide>
          <Review />
        </SwiperSlide>
        <SwiperSlide>
          <Review />
        </SwiperSlide>
        <SwiperSlide>
          <Review />
        </SwiperSlide>
        <SwiperSlide>
          <Review />
        </SwiperSlide>
        <SwiperSlide>
          <Review />
        </SwiperSlide>
        <SwiperSlide>
          <Review />
        </SwiperSlide>
        <SwiperSlide>
          <Review />
        </SwiperSlide>
        <SwiperSlide>
          <Review />
        </SwiperSlide>
        <SwiperSlide>
          <Review />
        </SwiperSlide>
        <SwiperSlide>
          <Review />
        </SwiperSlide>
        <SwiperSlide>
          <Review />
        </SwiperSlide>
        <SwiperSlide>
          <Review />
        </SwiperSlide>
        <SwiperSlide>
          <Review />
        </SwiperSlide>
        <SwiperSlide>
          <Review />
        </SwiperSlide>
        <SwiperSlide>
          <Review />
        </SwiperSlide>
        <SwiperSlide>
          <Review />
        </SwiperSlide>
        <SwiperSlide>
          <Review />
        </SwiperSlide>
      </Swiper>
    </>
  );
}
export default Slide;
