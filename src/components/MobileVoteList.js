import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as mainActions } from "../redux/modules/main";
import { actionCreators } from "../redux/modules/post";
import { history } from "../redux/configureStore";

import { Text } from "../elements";
import styled from "styled-components";
import "../styles/libraryStyle/style.css";

import VoteCard from "./VoteCard";

//Carousel library
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

//스크롤
import { Link } from "react-scroll";

function MobileVoteList() {
  const hotVoteList = useSelector((state) => state.main.hotVoteList);
  const mobileVoteList = hotVoteList.slice(0, 4);

  const settings = {
    dots: true,
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
      <MobileRanking>
        <Text title textAlign="left" color="#2E2A32" margin="0px 15px">
          지금 뜨거운 투표
        </Text>
        <RankingContainer>
          <Slider {...settings} dotsClass="dotStyle">
            {mobileVoteList.map((v, idx) => {
              return <VoteCard voteInfo={v} key={idx} />;
            })}
            {/* <VoteCard />
            <VoteCard />
            <VoteCard />
            <VoteCard />
            <VoteCard /> */}
          </Slider>
        </RankingContainer>
      </MobileRanking>
    </React.Fragment>
  );
}

export default MobileVoteList;

const MobileRanking = styled.div`
  width: 350px;
  height: 250px;
  display: none;
  overflow: hidden;
  ::-webkit-scrollbar {
    display: none !important; /* Chrome, Safari, and Opera */
  }
  @media ${({ theme }) => theme.device.mobile} {
    display: block;
  }
`;

const RankingContainer = styled.div`
  width: 950px;
  margin: 0px 5px;
  display: none;
  @media ${({ theme }) => theme.device.mobile} {
    display: block;
  }
`;
