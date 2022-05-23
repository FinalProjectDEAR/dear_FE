import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { actionCreators as mainActions } from "../redux/modules/main";

import { Text, TextB } from "../elements";
import styled from "styled-components";

//페이지
import UserRanking from "../components/RankingCard";

//assets
import serviceInfo from "../assets/main/service_info_img.png";
import MobileRanking from "../components/MobileRanking";

function MainRanking() {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(mainActions.getRankingDB());
  }, []);

  const rankingList = useSelector((state) => state.main.rankingList);
  const topFive = rankingList.slice(0, 4);
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
                <TextB body margin="0px" textAlign="left">
                  지인에게 차마 털어놓지 못했던 연애 고민이 있나요?
                  <br />
                  디어는 여러분의 이야기를 친구처럼 진지하게 들어 줄 리스너와
                  함께
                  <br />더 행복하고 바람직한 연애를 할 수 있도록 만들어졌어요!
                </TextB>
              </LetterBox>
              <MobileLetterBox>
                <TextB body margin="0px" textAlign="left">
                  지인에게 차마 털어놓지 못했던 연애 고민이 있나요?
                  <br />
                  디어는 여러분의 이야기를 친구처럼 진지하게 들어 줄
                  <br />
                  리스너와 더 행복하고 바람직한 연애를 할 수 있도록
                  만들어졌어요!
                </TextB>
              </MobileLetterBox>
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
              <Text body4 color="#948A9E" margin="0px" textAlign="left">
                이번달, 친구들의 이야기를 적극적으로 경청해 준 명예 리스너를
                소개합니다.
              </Text>
            </LineBox>
            <LineBox>
              {/* {topFive.map((ranker, idx) => {
                return <RankingCard key={idx} rankerInfo={ranker} />;
              })} */}
              <UserRanking />
              <UserRanking />
              <UserRanking />
              <UserRanking />
              <UserRanking />
            </LineBox>
          </RankingContainer>
          <MobileRanking />
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
`;

const RankingWrapper = styled.div`
  box-sizing: border-box;
  width: 1020px;
  height: 600px;
  margin: 0px auto;
  @media ${({ theme }) => theme.device.mobile} {
    padding: 0px 20px;
  }
`;

const ServiceInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 50%;
  @media ${({ theme }) => theme.device.mobile} {
    height: 300px;
  }
`;

const RankingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 50%;
  @media ${({ theme }) => theme.device.mobile} {
    display: none;
  }
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
  @media ${({ theme }) => theme.device.mobile} {
    word-break: keep-all;
    width: 360px;
  }
`;

const InfoBox = styled.div`
  width: 100%;
  height: 122px;
  display: flex;
  align-items: center;
  @media ${({ theme }) => theme.device.mobile} {
    width: 360px;
  }
`;

const LetterBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 50%;
  height: 90px;
  @media ${({ theme }) => theme.device.mobile} {
    display: none;
  }
`;

const MobileLetterBox = styled.div`
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  height: 90px;
  width: 100%;
  @media ${({ theme }) => theme.device.mobile} {
    word-break: keep-all;
    display: flex;
  }
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
  @media ${({ theme }) => theme.device.mobile} {
    display: none;
  }
`;
