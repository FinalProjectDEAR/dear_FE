import React from "react";
import styled from "styled-components";
import { Text } from "../elements";

const Message = () => {
  return (
    <MessageWrapper>
      <MessageContainer>메세지내용</MessageContainer>
      <MessageBox>
        <Text>닉네임, 시간</Text>
        <button>쪽지보기</button>
      </MessageBox>
    </MessageWrapper>
  );
};

const MessageWrapper = styled.div`
  width: 328px;
  height: 324px;
  border: 1px solid red;
  margin: auto;
`;
const MessageContainer = styled.div`
  justify-content: left;
  text-align: left;
  align-items: left;
  box-sizing: border-box;
  padding: 40px 34px;
  border: 1px solid red;
`;
const MessageBox = styled.div`
  border: 1px solid red;
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;
export default Message;
