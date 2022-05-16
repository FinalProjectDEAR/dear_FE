import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { history } from "../../redux/configureStore";

import styled from "styled-components";
import { Text, Button } from "../../elements";

import ResReview from "../../pages/ResReview";
import ReqReview from "../../pages/ReqReview";

function ChatClose(props) {
  const { closeModal, leaveSession, sendSignal } = props;
  const [Review, setReview] = React.useState(false);
  const [view, setView] = React.useState(true);

  const role = useSelector((state) => state.chat.roomAuthInfo.role);
  console.log("종료모달의 역할데이터", role);
  const chatInfo = useSelector((state) => state.chat.chatInfo);

  return (
    <React.Fragment>
      {view ? (
        <CloseContainer>
          <LineBox>
            <Text batang weight="500" size="16px" color="#2E2A32">
              상담을 종료할까요?
            </Text>
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
              _onClick={() => {
                setView(false);
                setReview(true);
                sendSignal();
              }}
            >
              <Text
                margin="0px"
                color="#fff"
                weight="500"
                size="14px"
                cursor="pointer"
              >
                종료하기
              </Text>
            </Button>
          </BottomBox>
        </CloseContainer>
      ) : null}

      {Review && role === "request" ? (
        <ResReview
          resNickname={chatInfo.resNickname}
          leaveSession={leaveSession}
        />
      ) : null}
      {Review && role === "response" ? (
        <ReqReview
          reqNickname={chatInfo.reqNickname}
          leaveSession={leaveSession}
        />
      ) : null}
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
