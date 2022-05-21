import React from "react";

import styled from "styled-components";
import { Text, Button, TextB } from "../../elements";

import { actionCreators } from "../../redux/modules/comment";
import { history } from "../../redux/configureStore";
import { useDispatch } from "react-redux";

function ChatClose(props) {
  const dispatch = useDispatch();
  const { closeModal, postId, comment_id } = props;
  const deletePost = () => {
    dispatch(actionCreators.delCommentDB({ comment_id, postId }));
  };
  const onRemove = () => {
    deletePost();
    history.goBack();
  };
  return (
    <React.Fragment>
      <CloseContainer>
        <LineBox>
          <TextB weight="500" size="16px" color="#2E2A32">
            댓글을 삭제할까요?
          </TextB>
        </LineBox>
        <BottomBox>
          <Button
            secondaryDefault
            cursor="pointer"
            size="narrow"
            _onClick={closeModal}
          >
            <Text body4 color="#7A37BE" cursor="pointer">
              돌아가기
            </Text>
          </Button>
          <Button
            primaryDefault
            shadow="0px 0px 20px rgba(172, 151, 197, 0.25)"
            cursor="pointer"
            size="narrow"
            _onClick={onRemove}
          >
            <Text body4 color="#fff" cursor="pointer">
              삭제하기
            </Text>
          </Button>
        </BottomBox>
      </CloseContainer>
    </React.Fragment>
  );
}

export default ChatClose;

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
  width: 296px;
  height: 40px;
  margin: 20px auto;
  padding: 0px 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
