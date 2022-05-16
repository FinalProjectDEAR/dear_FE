import React from "react";
import { useDispatch } from "react-redux";

import styled from "styled-components";
import { Text, Button, TextB } from "../../elements";

import { actionCreators } from "../../redux/modules/post";

function ChatClose(props) {
  const dispatch = useDispatch();
  const { closeModal, postId } = props;
  const deletePost = () => {
    dispatch(actionCreators.deletePostDB(postId));
  };
  const onRemove = () => {
    deletePost();
  };
  return (
    <React.Fragment>
      <CloseContainer>
        <LineBox>
          <TextB weight="500" size="16px" color="#2E2A32">
            게시글을 삭제할까요?
          </TextB>
        </LineBox>
        <BottomBox>
          <Button
            width="160px"
            bg="#EEE7F5"
            margin="8px"
            shadow="0px 0px 20px rgba(172, 151, 197, 0.25)"
            cursor="pointer"
            _onClick={closeModal}
          >
            <Text
              margin="0px"
              color="#7A37BE"
              weight="500"
              size="14px"
              cursor="pointer"
            >
              돌아가기
            </Text>
          </Button>
          <Button
            width="160px"
            bg="#7A37BE"
            margin="8px"
            shadow="0px 0px 20px rgba(172, 151, 197, 0.25)"
            cursor="pointer"
            _onClick={onRemove}
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
  height: 40px;
  margin: 20px auto;
  padding: 0px 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
