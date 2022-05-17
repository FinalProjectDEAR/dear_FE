import React from "react";
import { div, Input, Text, Button } from "../elements";
import { useSelector, useDispatch } from "react-redux";

import { history } from "../redux/configureStore";

import { actionCreators as voteActions } from "../redux/modules/vote";
import { useParams } from "react-router-dom";

// import assets
import uploadImg from "../assets/upload.png";
import styled from "styled-components";

function VoteResult(props) {
  const leftScore = props.voteInfo.vote[0].selectionList.length;
  const rightScore = props.voteInfo.vote[1].selectionList.length;

  return (
    <React.Fragment>
      <ResultWrapper>
        <Text margin="15px 80px">투표결과</Text>
        <LineBox>
          <Vote
            bg={props.leftSelected ? "#EEE7F5" : "transparent"}
            border={
              props.leftSelected ? "1px solid #7A37BE" : "1px solid #61586A;"
            }
          >
            <Font color={props.leftSelected ? "#7A37BE" : "#61586A"}>
              {props.voteInfo.vote[0].imageTitle}
            </Font>
          </Vote>
          {props.voteInfo.vote[0].imageUrl ? (
            <img
              style={{ width: "38px", height: "38px", margin: "0px 10px" }}
              src={props.voteInfo.vote[0].imageUrl}
              alt="선택지 2"
            />
          ) : null}

          <ProgressBar>
            <Highlight
              width={
                // (props.voteInfo.vote[0].selectionList.length / totalCount) * 100 + "%"
                (105 / 165) * 100 + "%"
              }
              color={leftScore >= rightScore ? "#7A37BE" : "#BB9ED8"}
            />
          </ProgressBar>
          <Percent color={leftScore >= rightScore ? "#7A37BE" : "#BB9ED8"}>
            {parseInt((105 / 165) * 100) + "%"}
          </Percent>
        </LineBox>
        <LineBox>
          <Vote
            bg={props.rightSelected ? "#EEE7F5" : "transparent"}
            border={
              props.rightSelected ? "1px solid #7A37BE" : "1px solid #61586A;"
            }
          >
            <Font color={props.rightSelected ? "#7A37BE" : "#61586A"}>
              {props.voteInfo.vote[1].imageTitle}
            </Font>
          </Vote>
          {props.voteInfo.vote[0].imageUrl ? (
            <img
              style={{ width: "38px", height: "38px", margin: "0px 10px" }}
              src={props.voteInfo.vote[1].imageUrl}
              alt="선택지 2"
            />
          ) : null}

          <ProgressBar>
            <Highlight
              width={
                // (props.voteInfo.vote[1].selectionList.length / totalCount) * 100 + "%"
                (60 / 165) * 100 + "%"
              }
              color={rightScore >= leftScore ? "#7A37BE" : "#BB9ED8"}
            />
          </ProgressBar>
          <Percent color={rightScore >= leftScore ? "#7A37BE" : "#BB9ED8"}>
            {parseInt((60 / 165) * 100) + "%"}
          </Percent>
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
  align-items: flex-start;
  box-sizing: border-box;
  padding: 60px 0px 80px;
  width: 952px;
  height: 311px;
  background: #ffffff;
  box-shadow: 0px 0px 20px rgba(172, 151, 197, 0.25);
  border-radius: 10px;
`;

const LineBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5px auto;
  width: 792px;
  height: 54px;
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
`;

const Font = styled.p`
  color: ${(props) => props.color};
  margin: 0px;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
`;

const Percent = styled.p`
  color: ${(props) => props.color};
  margin: 0px;
  font-weight: 700;
  font-size: 16px;
  line-height: 16px;
`;

const ProgressBar = styled.div`
  display: flex;
  align-items: center;
  background-color: #fff;
  width: 438px;
  height: 38px;
`;

const Highlight = styled.div`
  background-color: ${(props) => props.color};
  transition: 1s;
  width: ${(props) => props.width};
  height: 38px;
`;
