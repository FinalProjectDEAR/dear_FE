import React from "react";
import { Text, Button } from "../elements";
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
          <Vote
            bg={leftSelected ? "#EEE7F5" : "transparent"}
            border={leftSelected ? "1px solid #7A37BE" : "1px solid #61586A;"}
            _onClick={selectLeft}
          >
            <Text
              margin="0px"
              body3
              color={leftSelected ? "#7A37BE" : "#61586A"}
              cursor="pointer"
            >
              {voteInfo.vote[0].imageTitle}
            </Text>
          </Vote>
          <Text body2 margin="17px 24px">
            VS
          </Text>
          <Vote
            bg={rightSelected ? "#EEE7F5" : "transparent"}
            border={rightSelected ? "1px solid #7A37BE" : "1px solid #61586A;"}
            margin="10px 0px"
            cursor="pointer"
            shadow="0px 0px 20px rgba(172, 151, 197, 0.25)"
            _onClick={selectRight}
          >
            <Text
              margin="0px"
              body3
              color={rightSelected ? "#7A37BE" : "#61586A"}
              cursor="pointer"
            >
              {voteInfo.vote[1].imageTitle}
            </Text>
          </Vote>
        </CheckBox>
        <BottomBox>
          <Button
            primaryDefault
            size="regular"
            cursor="pointer"
            _onClick={submitVote}
          >
            <Text body4 color="#fff" margin="0px">
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

const Vote = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 15px 0px;
  margin: 10px 0px;
  width: 360px;
  height: 54px;
  box-sizing: border-box;
  background-color: ${(props) => props.bg};
  border: ${(props) => props.border};
  border-radius: 30px;
  cursor: pointer;
`;

const BottomBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 792px;
  height: 66px;
`;
