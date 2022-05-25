import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { actionCreators as mainActions } from "../redux/modules/main";

import { Text } from "../elements";
import styled from "styled-components";

//페이지
import ReviewCard from "../components/ReviewCard";

//Carousel library
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function MobileReview() {
  const reviewList = useSelector((state) => state.main.reviewList);

  const settings = {
    infinite: true,
    speed: 3000,
    autoplay: true,
    autoplaySpeed: 5000,
    centerPadding: "10px",
    centerMode: true,
    slidesToShow: 2,
    rows: 2,
    slidesPerRow: 1,
  };

  return (
    <React.Fragment>
      <Background>
        <ReviewWrapper>
          <LineBox>
            <Text title color="#2E2A32">
              상담후기
            </Text>
          </LineBox>
          <Slider {...settings}>
            {reviewList.map((review, idx) => {
              return <ReviewCard key={idx} reviewInfo={review} />;
            })}
            {/* <ReviewCard />
            <ReviewCard />
            <ReviewCard />
            <ReviewCard />
            <ReviewCard />
            <ReviewCard />
            <ReviewCard />
            <ReviewCard /> */}
          </Slider>
        </ReviewWrapper>
      </Background>
    </React.Fragment>
  );
}

export default MobileReview;

const Background = styled.div`
  padding-top: 60px;
  width: 360px;
  height: 100vh;
  overflow: hidden;
`;

const ReviewWrapper = styled.div`
  display: none;
  flex-direction: column;
  justify-content: center;
  box-sizing: border-box;
  width: 780px;
  margin: auto;
  overflow: hidden;
  @media ${({ theme }) => theme.device.mobile} {
    display: flex;
  }
`;

const LineBox = styled.div`
  display: none;
  margin-left: 25px;
  width: 360px;
  align-items: center;
  justify-content: flex start;
  margin-left: 10px;
  @media ${({ theme }) => theme.device.mobile} {
    display: flex;
  }
`;
