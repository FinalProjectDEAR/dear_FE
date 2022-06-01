import React from "react";

import { useDispatch } from "react-redux";
import { history } from "../redux/configureStore";
import { MsgActionCreators } from "../redux/modules/message";

import styled from "styled-components";
import { Text, TextB } from "../elements";
//시간알려주는패키지
import TimeCounting from "time-counting";

const MessageList = (props) => {
  const dispatch = useDispatch();
  const messageId = props?.item.messageId;
  const createdAt = props?.item.createdAt;

  React.useEffect(() => {
    dispatch(MsgActionCreators.msgPage(props.item.totalPages));
  }, []);

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
      <MessageContainer>
        <TextB sub color="#2E2A32" textAlign="left" hiddenText margin="0px">
          {props?.item.message}
        </TextB>
      </MessageContainer>
      <MessageBox>
        <Text sub4 color="#666">
          {props?.item.reqMemberNickname} / {createdTime}
        </Text>
        <Btn
          onClick={() => {
            history.push(`/receivedMsg/${messageId}`);
          }}
        >
          쪽지보기
        </Btn>
      </MessageBox>
    </MessageWrapper>
  );
};

const MessageWrapper = styled.div`
  width: 328px;
  height: 324px;
  margin: auto;
  background-color: #fafafa;
  box-shadow: 0px 0px 20px rgba(172, 151, 197, 0.25);
  @media ${({ theme }) => theme.device.mobile} {
    display: flex;
    flex-direction: column;
    width: 320px;
    height: 96px;
    margin: auto;
  }
`;

const MessageContainer = styled.div`
  width: 260px;
  height: 230px;
  box-sizing: border-box;
  margin: 20px 34px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  @media ${({ theme }) => theme.device.mobile} {
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin: 0px;
    padding: 20px;
  }
`;

const MessageBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px 34px;
`;

const Btn = styled.button`
  border: none;
  text-decoration: underline;
  color: #948a9e;
  background-color: transparent;
  cursor: pointer;
`;
export default MessageList;
