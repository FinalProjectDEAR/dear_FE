import React from "react";
import { div, Input, Text, Button } from "../elements";
import { useSelector, useDispatch } from "react-redux";

import { history } from "../redux/configureStore";

import { actionCreators as voteActions } from "../redux/modules/vote";
import { useParams } from "react-router-dom";

// import assets
import VoteResult from "./VoteResult";
import styled from "styled-components";

function LetterVote() {
  const dispatch = useDispatch();

  const params = useParams();
  const postId = params.postId;
  console.log(postId);

  React.useEffect(() => {
    dispatch(voteActions.detailVoteDB(postId));
    showSelection();
  }, []);

  const [vote, setVote] = React.useState("");
  const [leftSelected, setLeftSelected] = React.useState(false);
  const [rightSelected, setRightSelected] = React.useState(false);
  const [showResult, setShowResult] = React.useState(false);

  const voteInfo = useSelector((state) => state.vote.voteInfo);
  console.log(voteInfo.vote[0].selected);

  const showSelection = () => {
    if (voteInfo.vote[0].selected === true) {
      setLeftSelected(true);
    } else {
      setRightSelected(true);
    }
  };

  const selectLeft = () => {
    setVote(1);
    setLeftSelected(true);
    setRightSelected(false);
  };

  const selectRight = () => {
    setVote(2);
    setLeftSelected(false);
    setRightSelected(true);
  };

  const submitVote = () => {
    dispatch(voteActions.putVoteDB(postId, vote));
    setShowResult(true);
  };

  const delVote = () => {
    dispatch(voteActions.delVoteDB(postId));
  };

  return (
    <React.Fragment>
      <VoteWrapper>
        <CheckBox>
          <Button
            bg={leftSelected ? "#EEE7F5" : "transparent"}
            border={leftSelected ? "1px solid #7A37BE" : "1px solid #61586A;"}
            margin="10px 0px"
            cursor="pointer"
            shadow="0px 0px 20px rgba(172, 151, 197, 0.25)"
            _onClick={selectLeft}
          >
            <Text
              margin="0px"
              color={leftSelected ? "#7A37BE" : "#61586A"}
              weight="500"
              size="16px"
              cursor="pointer"
            >
              {voteInfo.vote[0].imageTitle}
            </Text>
          </Button>
          <Text weight="500" size="18px" margin="17px 24px">
            VS
          </Text>
          <Button
            bg={rightSelected ? "#EEE7F5" : "transparent"}
            border={rightSelected ? "1px solid #7A37BE" : "1px solid #61586A;"}
            margin="10px 0px"
            cursor="pointer"
            shadow="0px 0px 20px rgba(172, 151, 197, 0.25)"
            _onClick={selectRight}
          >
            <Text
              margin="0px"
              color={rightSelected ? "#7A37BE" : "#61586A"}
              weight="500"
              size="16px"
              cursor="pointer"
            >
              {voteInfo.vote[1].imageTitle}
            </Text>
          </Button>
        </CheckBox>
        <BottomBox>
          <Button
            width="160px"
            bg="#7A37BE"
            cursor="pointer"
            _onClick={submitVote}
          >
            <Text margin="0px" weight="500" size="16px" color="#fff">
              투표하기
            </Text>
          </Button>
        </BottomBox>
      </VoteWrapper>
      {showResult ? <VoteResult voteInfo={voteInfo} /> : null}
    </React.Fragment>
  );
}

export default LetterVote;

const VoteWrapper = styled.div`
  width: 952px;
  height: 240px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  padding: 60px 0px;

  background: #ffffff;
  box-shadow: 0px 0px 20px rgba(172, 151, 197, 0.25);
  border-radius: 10px;
`;

const CheckBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 30px;
  width: 792px;
  height: 54px;
`;

const BottomBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 792px;
  height: 66px;
`;
