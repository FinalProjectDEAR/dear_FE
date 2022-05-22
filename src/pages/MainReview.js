import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { history } from "../redux/configureStore";

import { actionCreators as mainActions } from "../redux/modules/vote";

import { Text, TextB } from "../elements";
import styled from "styled-components";

//페이지
import ReviewCard from "../components/ReviewCard";
import Footer from "../components/Footer";

//assets
import serviceInfo from "../assets/main/service_info_img.png";

//Carousel library
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function MainReview() {
  const dispatch = useDispatch();

  // React.useEffect(() => {
  //   dispatch(mainActions.getReviewDB());
  // });

  // const reviewList = useSelector((state) => state.main.reviewList);

  const settings = {
    infinite: true,
    speed: 3000,
    autoplay: true,
    autoplaySpeed: 3000,
    centerMode: true,
    centerPadding: "180px",
    slidesToShow: 2,
    rows: 2,
    slidesPerRow: 1,
  };
  return (
    <React.Fragment>
      <Background>
        <ReviewWrapper>
          <LineBox>
            <Text title color="">
              상담후기
            </Text>
          </LineBox>
          <Slider {...settings}>
            {/* {reviewList.map((review, idx) => {
              return <ReviewCard key={idx} reviewInfo={review} />;
            })} */}
            <ReviewCard />
            <ReviewCard />
            <ReviewCard />
            <ReviewCard />
            <ReviewCard />
            <ReviewCard />
            <ReviewCard />
            <ReviewCard />
          </Slider>
        </ReviewWrapper>
        <Footer />
      </Background>
    </React.Fragment>
  );
}

export default MainReview;

const Background = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ReviewWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-sizing: border-box;
  width: 1440px;
  height: 600px;
  margin: auto;
  overflow: hidden;
`;

const LineBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex start;
  margin-left: 204px;
`;
