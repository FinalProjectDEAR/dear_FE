import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { actionCreators as mainActions } from "../redux/modules/vote";

import { Text, TextB } from "../elements";
import styled from "styled-components";

//페이지
import UserRanking from "../components/UserRanking";

//assets
import serviceInfo from "../assets/main/service_info_img.png";

function MainRanking() {
  const dispatch = useDispatch();
  //   React.useEffect(() => {
  //     dispatch(mainActions.getRankingDB());
  //   });

  //   const rankingList = useSelector((state) => state.main.rankingList);

  return (
    <React.Fragment>
      <Background>
        <RankingWrapper>
          <ServiceInfoContainer>
            <TitleBox>
              <Text title color="#2E2A32">
                Hi, dear
              </Text>
            </TitleBox>
            <InfoBox>
              <LetterBox>
                <TextB body margin="0px">
                  지인에게 차마 털어놓지 못했던 연애 고민이 있나요?
                </TextB>
                <TextB body margin="0px">
                  디어는 여러분의 이야기를 친구처럼 진지하게 들어 줄 리스너와
                  함께
                </TextB>
                <TextB body margin="0px">
                  더 행복하고 바람직한 연애를 할 수 있도록 만들어졌어요!
                </TextB>
              </LetterBox>
              <ImageBox>
                <img src={serviceInfo} alt="example" />
              </ImageBox>
            </InfoBox>
            <LineBox>
              <Text sub2 deco="underLine" color="#948A9E" cursor="pointer">
                서비스 소개 더보기 {">"}
              </Text>
            </LineBox>
          </ServiceInfoContainer>
          <RankingContainer>
            <TitleBox>
              <Text title color="#2E2A32">
                이달의 명예 리스너 TOP 5
              </Text>
            </TitleBox>
            <LineBox>
              <Text body4 color="#948A9E" margin="0px">
                이번달, 친구들의 이야기를 적극적으로 경청해 준 명예 리스너를
                소개합니다.
              </Text>
            </LineBox>
            <LineBox>
              {/* {rankingList.map((ranker, idx) => {
                return <UserRanking key={idx} rankerInfo={ranker} />;
              })} */}
              <UserRanking />
              <UserRanking />
              <UserRanking />
              <UserRanking />
              <UserRanking />
            </LineBox>
          </RankingContainer>
        </RankingWrapper>
      </Background>
    </React.Fragment>
  );
}

export default MainRanking;

const Background = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  scroll-snap-align: start;
`;

const RankingWrapper = styled.div`
  box-sizing: border-box;
  width: 1020px;
  height: 600px;
  margin: 0px auto;
`;

const ServiceInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 50%;
`;

const RankingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 50%;
`;

const TitleBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
`;

const LineBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
`;

const InfoBox = styled.div`
  width: 100%;
  height: 122px;
  display: flex;
  align-items: center;
`;

const LetterBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 50%;
  height: 90px;
`;

const ImageBox = styled.div`
  display: flex;
  justify-content: center;
  width: 50%;
  height: 122px;
  img {
    width: 529px;
    height: 122px;
  }
`;
