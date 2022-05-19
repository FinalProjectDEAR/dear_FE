import React from "react";
import { Text, Button } from "../elements";
import { useSelector, useDispatch } from "react-redux";

import { history } from "../redux/configureStore";

import { actionCreators as voteActions } from "../redux/modules/vote";
import { useParams } from "react-router-dom";

// import assets
import uploadImg from "../assets/upload.png";
import styled from "styled-components";
import VoteResult from "./VoteResult";

function ImageVote({ voteInfo }) {
  const dispatch = useDispatch();

  const params = useParams();
  const postId = params.postId;
  console.log(postId);

  React.useEffect(() => {
    // dispatch(voteActions.detailVoteDB(postId));
  }, []);

  React.useEffect(() => {
    showSelection();
  }, [voteInfo.vote[0].selected]);

  const [vote, setVote] = React.useState("");
  const [leftSelected, setLeftSelected] = React.useState(false);
  const [rightSelected, setRightSelected] = React.useState(false);
  const [showResult, setShowResult] = React.useState(false);

  // const voteInfo = useSelector((state) => state.vote.voteInfo);
  console.log(voteInfo.vote[0].selected);
  console.log(leftSelected);
  console.log(rightSelected);

  const showSelection = () => {
    if (
      voteInfo.vote[0].selected === false &&
      voteInfo.vote[1].selected === false
    ) {
      console.log("나띵");
      return;
    } else if (voteInfo.vote[0].selected === true) {
      console.log("왼쪽");
      setLeftSelected(true);
      setVote(1);
    } else if (voteInfo.vote[1].selected === true) {
      console.log("오른쪽");
      setRightSelected(true);
      setVote(2);
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

  return (
    <React.Fragment>
      {!showResult ? (
        <VoteWrapper>
          <CheckBox>
            <Vote
              bg={leftSelected ? "#EEE7F5" : "transparent"}
              border={leftSelected ? "1px solid #7A37BE" : "1px solid #E6E6E6"}
              onClick={selectLeft}
            >
              <Font color={leftSelected ? "#7A37BE" : "#61586A"}>
                {voteInfo.vote[0].imageTitle}
              </Font>
              <VoteImg src={voteInfo.vote[0].imageUrl} alt="선택지 1" />
            </Vote>
            <Text body2 margin="17px 24px">
              VS
            </Text>
            <Vote
              bg={rightSelected ? "#EEE7F5" : "transparent"}
              border={
                rightSelected ? "1px solid #7A37BE" : "1px solid #E6E6E6;"
              }
              onClick={selectRight}
            >
              <Font
                color={rightSelected ? "#7A37BE" : "#61586A"}
                cursor="pointer"
              >
                {voteInfo.vote[1].imageTitle}
              </Font>
              <VoteImg src={voteInfo.vote[1].imageUrl} alt="선택지 2" />
            </Vote>
          </CheckBox>
          <BottomBox>
            <Button size="regular" _onClick={submitVote}>
              <Text body4 margin="0px" color="#fff" cursor="pointer">
                투표하기
              </Text>
            </Button>
          </BottomBox>
        </VoteWrapper>
      ) : (
        <VoteResult
          voteInfo={voteInfo}
          leftSelected={leftSelected}
          rightSelected={rightSelected}
          vote={vote}
        />
      )}
    </React.Fragment>
  );
}

//   {/* <div>
//   <img shape="rectangle" src={voteInfo.vote[0].imageUrl} alt="선택지 1" />
//   <Text margin="20px 0px">{voteInfo.vote[0].imageTitle}</Text>
//   <Text margin="20px 0px">
//     {voteInfo.vote[0].selectionList.length}명 선택!
//   </Text>
//   <div items="center" margin="auto">
//     <Text bold size="30px">
//       VS
//     </Text>
//   </div>
//   <div
//     id="select2"
//     cursor="pointer"
//     _onClick={selectRight}
//     borderLine={rightSelected ? "3px solid pink" : ""}
//   >
//     <img
//       shape="rectangle"
//       src={voteInfo.vote[1].imageUrl}
//       alt="선택지2"
//     />
//     <Text margin="20px 0px">{voteInfo.vote[1].imageTitle}</Text>
//     <Text margin="20px 0px">
//       {voteInfo.vote[1].selectionList.length}명 선택!
//     </Text>
//   </div>
//   <div margin="auto" width="10%">
//     <Button _onClick={submitVote}>투표완료</Button>
//     <Button _onClick={delVote}>투표삭제</Button>
//   </div>
// </div> */}

export default ImageVote;

const VoteWrapper = styled.div`
  width: 952px;
  height: 586px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #ffffff;
  box-shadow: 0px 0px 20px rgba(172, 151, 197, 0.25);
  border-radius: 10px;
  @media ${({ theme }) => theme.device.mobile} {
    width: 328px;
    height: 818px;
    padding: 0px 44px;
  }
`;

const CheckBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 30px;
  width: 792px;
  height: 400px;
  @media ${({ theme }) => theme.device.mobile} {
    flex-direction: column;
    width: 248px;
    height: 652px;
  }
`;

const Vote = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  gap: 15px;
  margin: 10px 0px;
  cursor: pointer;
  box-shadow: 0px 0px 20px rgba(172, 151, 197, 0.25);
  background-color: ${(props) => props.bg};
  border: ${(props) => props.border};
  border-radius: 20px;
  box-sizing: border-box;
  width: 360px;
  height: 399px;

  @media ${({ theme }) => theme.device.mobile} {
    img {
      width: 200px;
    }
    width: 249px;
    height: 300px;
  }
`;

const VoteImg = styled.img`
  width: 300px;
  height: 300px;
  margin-top: 15px;
`;

const Font = styled.p`
  color: ${(props) => props.color};
  margin: 0px;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  cursor: pointer;
`;

const BottomBox = styled.div`
  width: 792px;
  height: 66px;
  @media ${({ theme }) => theme.device.mobile} {
    width: 240px;
    height: 40px;
    margin-top: 30px;
  }
`;
