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
  return (
    <React.Fragment>
      <ResultWrapper>
        <Text margin="15px 80px">투표결과</Text>
        <LineBox>
          <Button
            width="236px"
            bg="#F8F8F8"
            padding="padding: 15px 0px"
            borderRadius="10px"
          >
            <Text
              margin="15px"
              color="#333333"
              weight="500"
              size="16px"
              cursor="pointer"
            >
              {props.voteInfo.vote[0].imageTitle}
            </Text>
          </Button>
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
                // (props.vote[0].selectionList.length / totalCount) * 100 + "%"
                (105 / 165) * 100 + "%"
              }
              color={"#7A37BE"}
            />
          </ProgressBar>
          <Text weight="500" size="16px" color="#7A37BE">
            {parseInt((105 / 165) * 100) + "%"}
          </Text>
        </LineBox>
        <LineBox>
          <Button
            width="236px"
            bg="#F8F8F8"
            padding="padding: 15px 0px"
            borderRadius="10px"
          >
            <Text
              margin="15px"
              color="#333333"
              weight="500"
              size="16px"
              cursor="pointer"
            >
              {props.voteInfo.vote[1].imageTitle}
            </Text>
          </Button>
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
                // (props.vote[0].selectionList.length / totalCount) * 100 + "%"
                (60 / 165) * 100 + "%"
              }
              color={"#EEE7F5"}
            />
          </ProgressBar>
          <Text weight="500" size="16px" color=" #EEE7F5">
            {parseInt((60 / 165) * 100) + "%"}
          </Text>
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
