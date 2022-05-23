import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as mainActions } from "../redux/modules/main";

import styled from "styled-components";

import RankingCard from "./RankingCard";

//Carousel library
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles/libraryStyle/style.css";

function MobileRanking() {
  const dispatch = useDispatch();
  //   React.useEffect(() => {
  //     dispatch(mainActions.getRankingDB());
  //   }, []);

  //   const rankingList = useSelector((state) => state.main.rankingList);
  //   const topFive = rankingList.slice(0, 4);

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: false,
    swipeToSlide: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
  };

  return (
    <React.Fragment>
      <RankingWrapper>
        <RankingContainer>
          <Slider {...settings} dotsClass="dotStyle">
            {/* {topFive.map((v, idx) => {
                return <RankingCard {...v} key={idx} />;
              })} */}
            <RankingCard />
            <RankingCard />
            <RankingCard />
            <RankingCard />
            <RankingCard />
          </Slider>
        </RankingContainer>
      </RankingWrapper>
    </React.Fragment>
  );
}

export default MobileRanking;

const RankingWrapper = styled.div`
  width: 360px;
  height: 250px;
  display: none;
  overflow: hidden;

  @media ${({ theme }) => theme.device.mobile} {
    display: block;
  }
`;

const RankingContainer = styled.div`
  width: 650px;
  margin: 0px -15px;
`;
