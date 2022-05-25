import React from "react";
import { div, Input, Text, Button } from "../elements";
import { useSelector, useDispatch } from "react-redux";

import { history } from "../redux/configureStore";

import { actionCreators as voteActions } from "../redux/modules/vote";
import { useParams } from "react-router-dom";

// import assets
import uploadImg from "../assets/upload.png";
import styled from "styled-components";
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";

function VoteResult(props) {
  console.log("투표결과 프롭스", props);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(voteActions.getResultDB(props.postId));
  }, []);

  const voteInfo = useSelector((state) => state.vote.voteResult);
  console.log("결과페이지 정보", voteInfo);

  const leftScore = voteInfo.vote[0].selectionList.length;
  const rightScore = voteInfo.vote[1].selectionList.length;

  const totalCount = leftScore + rightScore;
  console.log(totalCount);

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
              {voteInfo.vote[0].imageTitle}
            </Font>
          </Vote>
          <PercentageBox>
            {voteInfo.vote[0].imageUrl ? (
              <VoteImg src={voteInfo.vote[0].imageUrl} alt="선택지 2" />
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
              {voteInfo.vote[1].imageTitle}
            </Font>
          </Vote>
          <PercentageBox>
            {voteInfo.vote[0].imageUrl ? (
              <VoteImg src={voteInfo.vote[1].imageUrl} alt="선택지 2" />
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  padding: 60px 44px;
  margin: auto;
  width: 952px;
  height: 311px;
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
  margin: 10px auto;
  width: 100%;
  height: 36px;
  @media ${({ theme }) => theme.device.mobile} {
    justify-content: flex-start;
    align-items: left;
    width: 240px;
    height: 26px;
  }
`;

const LineBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5px auto;
  width: 792px;
  height: 54px;
  @media ${({ theme }) => theme.device.mobile} {
    justify-content: flex-start;
    flex-direction: column;
    width: 240px;
    height: 374px;
  }
`;

const Vote = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 15px 0px;
  width: 236px;
  height: 54px;
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
  color: ${(props) => props.color};
  margin: 0px;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  word-break: keep-all;
`;

const Percent = styled.p`
  color: ${(props) => props.color};
  text-align: center;
  margin: 0px auto;
  width: 44px;
  font-weight: 700;
  font-size: 16px;
  line-height: 16px;
`;

const PercentageBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0px;
  width: 550px;
  height: 38px;
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
  background-color: #fff;
  width: 488px;
  height: 38px;
  @media ${({ theme }) => theme.device.mobile} {
    height: 24px;
  }
`;

const Highlight = styled.div`
  background-color: ${(props) => props.color};
  transition: 1s;
  width: ${(props) => props.width};
  height: 38px;
  margin-right: 10px;
  @media ${({ theme }) => theme.device.mobile} {
    height: 24px;
  }
`;

const CountBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  width: 40px;
  height: 26px;
  margin-right: 40px;
  @media ${({ theme }) => theme.device.mobile} {
    display: flex;
  }
`;
