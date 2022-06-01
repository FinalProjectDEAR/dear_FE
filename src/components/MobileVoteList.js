import React from "react";

//리덕스
import { useSelector } from "react-redux";
//스타일
import { Text } from "../elements";
import styled from "styled-components";
import "../styles/libraryStyle/style.css";
//페이지
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
  display: none;
  width: 360px;
  height: 250px;
  overflow: hidden;
  ::-webkit-scrollbar {
    display: none !important; /* Chrome, Safari, and Opera */
  }
  @media ${({ theme }) => theme.device.mobile} {
    display: block;
  }
`;

const RankingContainer = styled.div`
  display: none;
  width: 960px;
  margin: 0px 5px;
  @media ${({ theme }) => theme.device.mobile} {
    display: block;
  }
`;
