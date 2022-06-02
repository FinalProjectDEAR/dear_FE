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
import "../styles/libraryStyle/style.css";
//컴포넌트
import RankingCard from "./RankingCard";

function MobileRanking() {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(mainActions.getRankingDB());
  }, []);

  const rankingList = useSelector((state) => state.main.rankingList);
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
        <TitleBox>
          <Text title color="#2E2A32">
            이달의 명예 리스너 TOP 5
          </Text>
        </TitleBox>
        <LineBox>
          <Text body4 color="#948A9E" margin="0px" textAlign="left">
            이번달, 친구들의 이야기를 적극적으로 경청해 준 명예 리스너를
            소개합니다.
          </Text>
        </LineBox>
        <RankingContainer>
          <Slider {...settings} dotsClass="dotStyle">
            {rankingList.map((rank, idx) => {
              return <RankingCard rankInfo={rank} key={idx} />;
            })}
            {/* <RankingCard />
            <RankingCard />
            <RankingCard />
            <RankingCard />
            <RankingCard /> */}
          </Slider>
        </RankingContainer>
      </RankingWrapper>
    </React.Fragment>
  );
}

export default MobileRanking;

const RankingWrapper = styled.div`
  display: none;
  width: 340px;
  height: 300px;
  box-sizing: border-box;
  overflow: hidden;

  @media ${({ theme }) => theme.device.mobile} {
    display: block;
  }
`;

const RankingContainer = styled.div`
  width: 600px;
  margin: 0px -20px;
  margin-bottom: 50px;
`;

const TitleBox = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 330px;
`;

const LineBox = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 328px;
`;
