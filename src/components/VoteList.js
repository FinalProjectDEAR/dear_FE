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

const VoteList = (props) => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(mainActions.getHotVoteDB());
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    rows: 2,
    slidesPerRow: 1,
    autoplaySpeed: 3000,
    pauseOnHover: true,
  };

  const hotVoteList = useSelector((state) => state.main.hotVoteList);

  const gotoVote = () => {
    dispatch(actionCreators.getCateDetailDB(1, "투표"));
  };

  return (
    <RankingWrapper>
      <RankingContainer>
        <Text title textAlign="left" color="#2E2A32" margin="0px 15px">
          디어상담소 인기게시물
        </Text>
        <Slider {...settings} dotsClass="dotStyle">
          {hotVoteList.map((vote, idx) => {
            return <VoteCard key={idx} voteInfo={vote} />;
          })}
          {/* <VoteCard />
          <VoteCard />
          <VoteCard />
          <VoteCard />
          <VoteCard />
          <VoteCard />
          <VoteCard />
          <VoteCard />
          <VoteCard />
          <VoteCard /> */}
        </Slider>
        <Link to="2" smooth={true}>
          <Text
            sub2
            margin="10px"
            textAlign="left"
            weight="500"
            size="16px"
            color="#948A9E"
            deco="underLine"
            cursor="pointer"
            _onClick={() => {
              gotoVote();
            }}
          >
            진행중인 투표 더보기 {">"}
          </Text>
        </Link>
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
  @media ${({ theme }) => theme.device.mobile} {
    display: none;
  }
`;
