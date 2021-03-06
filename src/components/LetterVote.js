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
//페이지
import VoteResult from "./VoteResult";

function LetterVote({ voteInfo }) {
  const dispatch = useDispatch();

  const params = useParams();
  const postId = params.postId;

  React.useEffect(() => {
    dispatch(voteActions.detailVoteDB(postId));
    showSelection();
  }, [voteInfo.vote[0].selected]);

  const [vote, setVote] = React.useState("");
  const [leftSelected, setLeftSelected] = React.useState(false);
  const [rightSelected, setRightSelected] = React.useState(false);
  const [showResult, setShowResult] = React.useState(false);

  const isUser = useSelector((state) => state.user.isLogin);
  // const voteInfo = useSelector((state) => state.vote.voteInfo);

  const showSelection = () => {
    if (
      voteInfo.vote[0].selected === false &&
      voteInfo.vote[1].selected === false
    ) {
      setLeftSelected(false);
      setRightSelected(false);
      return;
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
    } else if (!isUser) {
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
              border={leftSelected ? "2px solid #7A37BE" : "1px solid #E6E6E6;"}
              onClick={selectLeft}
            >
              <Font
                body3
                color={leftSelected ? "#7A37BE" : "#61586A"}
                weight={leftSelected ? 700 : 500}
                cursor="pointer"
              >
                {voteInfo.vote[0].imageTitle}
              </Font>
            </Vote>
            <Text title margin="17px 24px" color="#7a37be">
              VS
            </Text>
            <Vote
              bg={rightSelected ? "#EEE7F5" : "transparent"}
              border={
                rightSelected ? "2px solid #7A37BE" : "1px solid #E6E6E6;"
              }
              margin="10px 0px"
              cursor="pointer"
              shadow="0px 0px 20px rgba(172, 151, 197, 0.25)"
              onClick={selectRight}
            >
              <Font
                margin="0px"
                color={rightSelected ? "#7A37BE" : "#61586A"}
                weight={rightSelected ? 700 : 500}
                cursor="pointer"
              >
                {voteInfo.vote[1].imageTitle}
              </Font>
            </Vote>
          </CheckBox>
          <BottomBox>
            <Button primaryDefault size="regular" _onClick={submitVote}>
              <Text body4 color="#fff" margin="0px" cursor="pointer">
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
        />
      )}
    </React.Fragment>
  );
}

export default LetterVote;

const VoteWrapper = styled.div`
  ${({ theme }) => theme.common.flexCenterColumn};
  width: 952px;
  height: 240px;
  margin: auto;
  padding: 60px 0px;
  box-sizing: border-box;
  background: #ffffff;
  box-shadow: 0px 0px 20px rgba(172, 151, 197, 0.25);
  border-radius: 10px;
  @media ${({ theme }) => theme.device.mobile} {
    width: 328px;
    height: 374px;
    padding: 0px 44px;
  }
`;

const CheckBox = styled.div`
  ${({ theme }) => theme.common.flexCenter};
  width: 792px;
  height: 54px;
  margin: 30px;
  box-sizing: border-box;
  @media ${({ theme }) => theme.device.mobile} {
    flex-direction: column;
    width: 328px;
    height: 160px;
  }
`;

const Vote = styled.div`
  ${({ theme }) => theme.common.flexCenter};
  width: 360px;
  height: 54px;
  box-sizing: border-box;
  padding: 15px 0px;
  margin: 10px 0px;
  background-color: ${(props) => props.bg};
  border: ${(props) => props.border};
  border-radius: 30px;
  cursor: pointer;
  @media ${({ theme }) => theme.device.mobile} {
    width: 249px;
    height: 54px;
    margin: 0px;
  }
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
  ${({ theme }) => theme.common.flexCenterColumn};
  width: 792px;
  height: 66px;
  @media ${({ theme }) => theme.device.mobile} {
    width: 330px;
  }
`;
