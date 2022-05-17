import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { history } from "../../redux/configureStore";

import styled from "styled-components";
import { Text, TextB, Button } from "../../elements";

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
          <TextB subTitle>투표를 삭제할까요?</TextB>
        </LineBox>
        <BottomBox>
          <Button
            secondaryDefault
            size="narrow"
            margin="0px 8px"
            _onClick={props.closeModal}
          >
            <Text body4 margin="0px" color="#7A37BE" cursor="pointer">
              돌아가기
            </Text>
          </Button>
          <Button
            primaryDefault
            size="narrow"
            margin="0px 8px"
            _onClick={() => {
              delVote();
            }}
          >
            <Text margin="0px" color="#fff" body4 cursor="pointer">
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
  justify-content: center;
  align-items: center;
`;
