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
    centerMode: true,
    centerPadding: "20px",
    slidesToShow: 2,
    rows: 2,
    slidesPerRow: 1,
  };

  return (
    <React.Fragment>
      <Background>
        <LineBox>
          <Text title color="#2E2A32" margin="0px 15px">
            상담후기
          </Text>
        </LineBox>
        <ReviewWrapper>
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
  display: none;
  padding-top: 60px;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  @media ${({ theme }) => theme.device.mobile} {
    display: flex;
    flex-direction: column;
  }
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
    box-sizing: border-box;
    width: 330px;
  }
`;
