import React from "react";
//리덕스
import { useDispatch } from "react-redux";
import { actionCreators as voteActions } from "../../redux/modules/vote";
//스타일
import styled from "styled-components";
import { Text, TextB, Button } from "../../elements";

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
  width: 400px;
  height: 200px;
  padding: 35px 0px;
  box-sizing: border-box;
  background: #ffffff;
  border-radius: 20px;
`;

const LineBox = styled.div`
  ${({ theme }) => theme.common.flexCenter};
`;

const BottomBox = styled.div`
  height: 36px;
  margin: 15px auto;
  padding: 0px 50px;
  ${({ theme }) => theme.common.flexCenter};
`;
