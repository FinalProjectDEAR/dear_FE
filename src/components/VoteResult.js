import React from "react";
//리덕스
import { useSelector } from "react-redux";
//스타일
import styled from "styled-components";
import { Text } from "../elements";
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";

function VoteResult(props) {
  const voteResult = useSelector((state) => state.vote.voteResult);

  const leftScore = voteResult.vote[0].selectionList.length;
  const rightScore = voteResult.vote[1].selectionList.length;

  const totalCount = leftScore + rightScore;

  const leftPercentage = parseInt((leftScore / totalCount) * 100);
  const rightPercentage = parseInt((rightScore / totalCount) * 100);

  return (
    <React.Fragment>
      <ResultWrapper>
        <TitleBox>
          <Text title color="#7a37be">
            투표결과
          </Text>
          <CountBox>
            <PeopleRoundedIcon style={{ width: "20px", color: "#999999" }} />
            <Text sub margin="0px 5px">
              {totalCount}
            </Text>
          </CountBox>
        </TitleBox>
        <LineBox>
          <Vote
            bg={props.leftSelected ? "#EEE7F5" : "transparent"}
            border={
              props.leftSelected ? "1px solid #7A37BE" : "1px solid #61586A;"
            }
          >
            <Font color={props.leftSelected ? "#7A37BE" : "#61586A"}>
              {voteResult.vote[0].imageTitle}
            </Font>
          </Vote>
          <PercentageBox>
            {voteResult.vote[0].imageUrl ? (
              <VoteImg src={voteResult.vote[0].imageUrl} alt="선택지 2" />
            ) : null}
            <ProgressBar>
              <Highlight
                width={leftPercentage + "%"}
                color={leftScore >= rightScore ? "#7A37BE" : "#BB9ED8"}
              />
            </ProgressBar>
            <Percent color={leftScore >= rightScore ? "#7A37BE" : "#BB9ED8"}>
              {leftPercentage + "%"}
            </Percent>
          </PercentageBox>
        </LineBox>
        <LineBox>
          <Vote
            bg={props.rightSelected ? "#EEE7F5" : "transparent"}
            border={
              props.rightSelected ? "1px solid #7A37BE" : "1px solid #61586A;"
            }
          >
            <Font color={props.rightSelected ? "#7A37BE" : "#61586A"}>
              {voteResult.vote[1].imageTitle}
            </Font>
          </Vote>
          <PercentageBox>
            {voteResult.vote[0].imageUrl ? (
              <VoteImg src={voteResult.vote[1].imageUrl} alt="선택지 2" />
            ) : null}
            <ProgressBar>
              <Highlight
                width={rightPercentage + "%"}
                color={rightScore >= leftScore ? "#7A37BE" : "#BB9ED8"}
              />
            </ProgressBar>
            <Percent color={rightScore >= leftScore ? "#7A37BE" : "#BB9ED8"}>
              {rightPercentage + "%"}
            </Percent>
          </PercentageBox>
        </LineBox>
      </ResultWrapper>
    </React.Fragment>
  );
}

export default VoteResult;

const ResultWrapper = styled.div`
  ${({ theme }) => theme.common.flexCenterColumn};
  width: 952px;
  height: 311px;
  box-sizing: border-box;
  padding: 60px 44px;
  margin: auto;
  background: #fff;
  box-shadow: 0px 0px 20px rgba(172, 151, 197, 0.25);
  border-radius: 10px;
  @media ${({ theme }) => theme.device.mobile} {
    width: 328px;
    height: 374px;
    padding: 30px 44px;
  }
`;

const TitleBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 36px;
  margin: 10px auto;
  @media ${({ theme }) => theme.device.mobile} {
    justify-content: flex-start;
    align-items: left;
    width: 240px;
    height: 26px;
  }
`;

const LineBox = styled.div`
  ${({ theme }) => theme.common.flexCenter};
  width: 792px;
  height: 54px;
  margin: 5px auto;
  @media ${({ theme }) => theme.device.mobile} {
    justify-content: flex-start;
    flex-direction: column;
    width: 240px;
    height: 374px;
  }
`;

const Vote = styled.div`
  ${({ theme }) => theme.common.flexCenter};
  width: 236px;
  height: 54px;
  padding: 15px 0px;
  background-color: ${(props) => props.bg};
  border: ${(props) => props.border};
  border-radius: 10px;
  box-sizing: border-box;
  @media ${({ theme }) => theme.device.mobile} {
    width: 240px;
    height: 38px;
  }
`;

const VoteImg = styled.img`
  width: 38px;
  height: 38px;
  margin: 0px 10px;
`;

const Font = styled.p`
  margin: 0px;
  color: ${(props) => props.color};
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  word-break: keep-all;
`;

const Percent = styled.p`
  width: 44px;
  margin: 0px auto;
  color: ${(props) => props.color};
  text-align: center;
  font-weight: 700;
  font-size: 16px;
  line-height: 16px;
`;

const PercentageBox = styled.div`
  ${({ theme }) => theme.common.flexCenter};
  width: 550px;
  height: 38px;
  margin: 10px 0px;
  @media ${({ theme }) => theme.device.mobile} {
    img {
      width: 38px;
    }
    width: 240px;
    height: 38px;
  }
`;

const ProgressBar = styled.div`
  display: flex;
  align-items: center;
  width: 488px;
  height: 38px;
  background-color: #fff;
  @media ${({ theme }) => theme.device.mobile} {
    height: 24px;
  }
`;

const Highlight = styled.div`
  width: ${(props) => props.width};
  height: 38px;
  margin-right: 10px;
  background-color: ${(props) => props.color};
  transition: 1s;
  @media ${({ theme }) => theme.device.mobile} {
    height: 24px;
  }
`;

const CountBox = styled.div`
  ${({ theme }) => theme.common.flexCenter};
  width: 40px;
  height: 26px;
  box-sizing: border-box;
  margin-right: 40px;
  @media ${({ theme }) => theme.device.mobile} {
    display: flex;
  }
`;
