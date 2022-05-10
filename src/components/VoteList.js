import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as voteActions } from "../redux/modules/vote";

import { Text } from "../elements";
import styled from "styled-components";
import "../css/style.css";

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
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
  };

  const voteList = useSelector((state) => state.vote.voteList);
  return (
    <RankingWrapper>
      <Text textAlign="left" weight="500">
        디어상담소 TOP 10 투표
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
      </RankingContainer>
    </RankingWrapper>
  );
};

export default VoteList;

const RankingWrapper = styled.div`
  width: 70vw;
  margin: auto;
`;

const RankingContainer = styled.div`
  margin: 15px 0px;
`;
