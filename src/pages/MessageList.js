import React from "react";
import styled from "styled-components";
import { Text, TextB } from "../elements";
//시간알려주는패키지
import TimeCounting from "time-counting";
//리덕스관련
import { useDispatch } from "react-redux";
import { history } from "../redux/configureStore";
import { MsgActionCreators } from "../redux/modules/message";

const MessageList = (props) => {
  const dispatch = useDispatch();
  const messageId = props?.item.messageId;
  const createdAt = props?.item.createdAt;
  const reqMemberNickname = props?.item.reqMemberNickname;
  const message = props?.item.message;
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
        <TextB sub color="#2E2A32" textAlign="left">
          {message}
        </TextB>
      </MessageContainer>
      <MessageBox>
        <Text sub4 color="#666">
          {reqMemberNickname} / {createdTime}
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
  @media ${({ theme }) => theme.device.isMobile} {
    width: 320px;
    height: 96px;
    margin: auto;
    display: flex;
    flex-direction: column;
    /* border: 1px solid red; */
  }
`;
const MessageContainer = styled.div`
  height: 250px;
  box-sizing: border-box;
  margin: 10px 34px;
  display: inline-block;
  width: 260px;
  /* white-space: normal;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis; */
  @media ${({ theme }) => theme.device.isMobile} {
    width: 250px;
    height: 24px;
    /* margin: auto; */
    display: flex;
    flex-direction: column;
    /* border: 1px solid red; */
    /* display: inline-block; */
    /* white-space: nowrap; */
    /* overflow: hidden; */
    /* text-overflow: ellipsis; */
  }
`;
const MessageBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px 34px;
  /* border: 1px solid red; */
`;
const Btn = styled.button`
  background-color: transparent;
  border: none;
  text-decoration: underline;
  color: #948a9e;
  cursor: pointer;
`;
export default MessageList;
