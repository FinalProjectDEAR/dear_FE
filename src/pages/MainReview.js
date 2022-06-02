import React from "react";
//리덕스
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as mainActions } from "../redux/modules/main";
//스타일
import styled from "styled-components";
import { Text } from "../elements";
//Carousel library
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
//컴포넌트
import ReviewCard from "../components/ReviewCard";
import MobileReview from "../components/MobileReview";
import Footer from "../components/Footer";

function MainReview() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(mainActions.getReviewDB());
  }, []);

  const reviewList = useSelector((state) => state.main.reviewList);

  const settings = {
    infinite: true,
    speed: 3000,
    autoplay: true,
    autoplaySpeed: 5000,
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
        <MobileReview reviewList={reviewList} />
        <Footer />
      </Background>
    </React.Fragment>
  );
}

export default MainReview;

const Background = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
`;

const ReviewWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-sizing: border-box;
  width: 1440px;
  height: 750px;
  margin: 0px auto;
  overflow: hidden;
  @media ${({ theme }) => theme.device.mobile} {
    display: none;
  }
`;

const LineBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex start;
  margin-left: 204px;
  @media ${({ theme }) => theme.device.mobile} {
    width: 360px;
    margin-left: 25px;
    background: orange;
  }
`;
