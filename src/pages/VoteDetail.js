import React from "react";
import { div, Input, Text, Button } from "../elements";
import { useSelector, useDispatch } from "react-redux";

import { history } from "../redux/configureStore";

import { actionCreators as voteActions } from "../redux/modules/vote";
import { useParams } from "react-router-dom";

// import assets
import uploadImg from "../assets/upload.png";
import styled from "styled-components";

function VoteDetail() {
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
  };

  const delVote = () => {
    dispatch(voteActions.delVoteDB(postId));
  };

  return (
    <React.Fragment>
      <div id="wrapper" width="70%" margin="10% auto">
        <div
          id="container"
          width="60%"
          margin="0px auto"
          borderLine="3px solid orange"
        >
          <div id="title" display="flex" justifyContent="flex-start">
            <div width="20%" padding="0px 10px">
              <Text textAlign="left" bold>
                제목
              </Text>
            </div>
            <div width="80%">
              <Text>{voteInfo.title}</Text>
            </div>
          </div>
          <div id="content" display="flex" justifyContent="flex-start">
            <div width="20%" padding="0px 10px">
              <Text textAlign="left" bold>
                투표내용
              </Text>
            </div>
            <div width="80%">
              <Text>{voteInfo.contents}</Text>
            </div>
          </div>
          <div id="typeSelect" display="flex" justifyContent="flex-start">
            <div width="40%" padding="0px 10px">
              <Text textAlign="left" bold>
                당신의 선택은?
              </Text>
            </div>
          </div>
          <div width="80%" margin="20px auto">
            <div
              id="select1"
              cursor="pointer"
              _onClick={selectLeft}
              borderLine={leftSelected ? "3px solid pink" : ""}
            >
              <img
                shape="rectangle"
                src={voteInfo.vote[0].imageUrl}
                alt="선택지 1"
              />
              <Text margin="20px 0px">{voteInfo.vote[0].imageTitle}</Text>
              <Text margin="20px 0px">
                {voteInfo.vote[0].selectionList.length}명 선택!
              </Text>
            </div>
            <div items="center" margin="auto">
              <Text bold size="30px">
                VS
              </Text>
            </div>
            <div
              id="select2"
              cursor="pointer"
              _onClick={selectRight}
              borderLine={rightSelected ? "3px solid pink" : ""}
            >
              <img
                shape="rectangle"
                src={voteInfo.vote[1].imageUrl}
                alt="선택지2"
              />
              <Text margin="20px 0px">{voteInfo.vote[1].imageTitle}</Text>
              <Text margin="20px 0px">
                {voteInfo.vote[1].selectionList.length}명 선택!
              </Text>
            </div>
          </div>
          <div margin="auto" width="10%">
            <Button _onClick={submitVote}>투표완료</Button>
            <Button _onClick={delVote}>투표삭제</Button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default VoteDetail;
