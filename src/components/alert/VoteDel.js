import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { history } from "../../redux/configureStore";

import styled from "styled-components";
import { Text, Button } from "../../elements";

import { actionCreators as voteActions } from "../../redux/modules/vote";

function VoteDel(props) {
  const dispatch = useDispatch();
  const delVote = () => {
    dispatch(voteActions.delVoteDB(props.postId));
  };

  return (
    <React.Fragment>
      <CloseContainer>
        <LineBox>
          <Text subTitle>상담을 종료할까요?</Text>
        </LineBox>
        <BottomBox>
          <Button primary _onClick={props.closeModal}>
            <Text body4 color="#7A37BE" cursor="pointer">
              돌아가기
            </Text>
          </Button>
          <Button
            primary
            _onClick={() => {
              delVote();
            }}
          >
            <Text
              margin="0px"
              color="#fff"
              weight="500"
              size="14px"
              cursor="pointer"
            >
              삭제하기
            </Text>
          </Button>
        </BottomBox>
      </CloseContainer>
    </React.Fragment>
  );
}

export default VoteDel;

const CloseContainer = styled.div`
  width: 550px;
  height: 260px;
  padding: 60px 0px;
  box-sizing: border-box;
  background: #ffffff;
  border-radius: 20px;
`;

const LineBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BottomBox = styled.div`
  height: 40px;
  margin: 20px auto;
  padding: 0px 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
