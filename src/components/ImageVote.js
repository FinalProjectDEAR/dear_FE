import React from "react";
//라우트
import { useParams } from "react-router-dom";
//리덕스
import { useSelector, useDispatch } from "react-redux";
import { history } from "../redux/configureStore";
import { actionCreators as voteActions } from "../redux/modules/vote";
//스타일
import styled from "styled-components";
import { Text, Button } from "../elements";
import Swal from "sweetalert2";
import "../styles/libraryStyle/style.css";
import uploadImg from "../assets/upload.png";
// 페이지
import VoteResult from "./VoteResult";

import { cookies } from "../shared/cookie";
import isLogin from "../shared/auth/isLogin";

function ImageVote({ voteInfo }) {
  const isUser = useSelector((state) => state.user.isLogin);

  const dispatch = useDispatch();

  const params = useParams();
  const postId = params.postId;

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

  const showSelection = () => {
    if (
      voteInfo.vote[0].selected === false &&
      voteInfo.vote[1].selected === false
    ) {
      setLeftSelected(false);
      setRightSelected(false);
    } else if (voteInfo.vote[0].selected === true) {
      setLeftSelected(true);
      setRightSelected(false);
      setVote(1);
    } else if (voteInfo.vote[1].selected === true) {
      setRightSelected(true);
      setLeftSelected(false);
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

  const delSelection = () => {
    setLeftSelected(false);
    setRightSelected(false);
  };

  const submitVote = () => {
    if (vote === "") {
      Swal.fire("투표항목을 선택해주세요.");
    }
    if (!isUser) {
      Swal.fire("로그인 후 이용해주세요.");
      history.replace("/login");
    } else {
      dispatch(voteActions.putVoteDB(postId, vote));
      setShowResult(true);
      setTimeout(delSelection(), 500);
    }
  };

  return (
    <React.Fragment>
      {!showResult ? (
        <VoteWrapper>
          <CheckBox>
            <Vote
              bg={leftSelected ? "#EEE7F5" : "transparent"}
              border={leftSelected ? "2px solid #7A37BE" : "1px solid #E6E6E6"}
              onClick={selectLeft}
            >
              <Font
                color={leftSelected ? "#7A37BE" : "#61586A"}
                weight={leftSelected ? 700 : 500}
              >
                {voteInfo.vote[0].imageTitle}
              </Font>
              <VoteImg src={voteInfo.vote[0].imageUrl} alt="선택지 1" />
            </Vote>
            <Text title margin="17px 24px" color="#7a37be">
              VS
            </Text>
            <Vote
              bg={rightSelected ? "#EEE7F5" : "transparent"}
              border={
                rightSelected ? "2px solid #7A37BE" : "1px solid #E6E6E6;"
              }
              onClick={selectRight}
            >
              <Font
                color={rightSelected ? "#7A37BE" : "#61586A"}
                weight={rightSelected ? 700 : 500}
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
          postId={postId}
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
  ${({ theme }) => theme.common.flexCenterColumn};
  width: 952px;
  height: 586px;
  box-sizing: border-box;
  margin: auto;
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
  ${({ theme }) => theme.common.flexCenter};
  width: 792px;
  height: 400px;
  margin: 30px;
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
  width: 360px;
  height: 399px;
  padding: 30px;
  margin: 10px 0px;
  gap: 15px;
  background-color: ${(props) => props.bg};
  box-shadow: 0px 0px 20px rgba(172, 151, 197, 0.25);
  border: ${(props) => props.border};
  border-radius: 20px;
  box-sizing: border-box;
  cursor: pointer;

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
  margin: 0px;
  color: ${(props) => props.color};
  font-weight: ${(props) => props.weight};
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
