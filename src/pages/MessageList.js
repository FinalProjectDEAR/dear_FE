import React from "react";
import styled from "styled-components";
import { Text } from "../elements";
//시간알려주는패키지
import TimeCounting from "time-counting";

import { history } from "../redux/configureStore";

const MessageList = (props) => {
  // console.log(props.item);
  const messageId = props?.item.messageId;
  const createdAt = props?.item.createdAt;
  const reqMemberNickname = props?.item.reqMemberNickname;
  const message = props?.item.message;
  //시간을 알아보자!
  const option = {
    lang: "ko",
    calculate: {
      justNow: 60,
    },
  };
  const createdTime = TimeCounting(createdAt, option);
  return (
    <MessageWrapper>
      <MessageContainer>{message}</MessageContainer>
      <MessageBox>
        <Text>
          {reqMemberNickname}, {createdTime}
        </Text>
        <button
          onClick={() => {
            history.push(`/receivedMsg/${messageId}`);
          }}
        >
          쪽지보기
        </button>
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
export default MessageList;
