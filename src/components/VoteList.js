import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as voteActions } from "../redux/modules/vote";
import { history } from "../redux/configureStore";

import { Text } from "../elements";
import styled from "styled-components";
import "../styles/libraryStyle/style.css";

import VoteCard from "./VoteCard";

//Carousel library
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const VoteList = (props) => {
  const dispatch = useDispatch();

  // React.useEffect(() => {
  //   const type = "VOTE";
  //   dispatch(voteActions.getVoteRankingDB());
  // }, []);

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    rows: 2,
    slidesPerRow: 1,
    autoplaySpeed: 3000,
    pauseOnHover: true,
  };

  const voteList = useSelector((state) => state.vote.voteList);
  return (
    <RankingWrapper>
      <Text textAlign="left" weight="700" size="18px" color="#2E2A32">
        지금 뜨거운 투표
      </Text>
      <RankingContainer>
        <Slider {...settings} dotsClass="dotStyle">
          {/* {voteList.map((v, idx) => {
          return <VoteCard {...v} key={idx} />;
        })} */}
          <VoteCard />
          <VoteCard />
          <VoteCard />
          <VoteCard />
          <VoteCard />
          <VoteCard />
          <VoteCard />
          <VoteCard />
          <VoteCard />
          <VoteCard />
        </Slider>
        <Text
          margin="20px"
          textAlign="left"
          weight="500"
          size="16px"
          color="#948A9E"
          deco="underLine"
          cursor="pointer"
          _onClick={() => {
            history.push("");
          }}
        >
          진행중인 투표 더보기 {">"}
        </Text>
      </RankingContainer>
    </RankingWrapper>
  );
};

export default VoteList;

const RankingWrapper = styled.div`
  width: 1032px;
  margin: auto;
`;

const RankingContainer = styled.div`
  margin: 15px 0px;
`;
