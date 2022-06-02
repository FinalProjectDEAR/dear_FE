import React from "react";

//리덕스
import { useSelector } from "react-redux";
import { history } from "../../redux/configureStore";
//스타일
import styled from "styled-components";
import { Text, TextB, Button } from "../../elements";
//페이지

import ResReview from "../../pages/ResReview";
import ReqReview from "../../pages/ReqReview";

function ChatClose(props) {
  const { closeModal, leaveSession, chatClose, informClose, isConnect } = props;
  const [view, setView] = React.useState(true);
  const [review, setReView] = React.useState(false);

  const role = useSelector((state) => state.chat.roomAuthInfo.role);
  const chatInfo = useSelector((state) => state.chat.chatInfo);

  const finish = () => {
    if (isConnect) {
      setView(false);
      setReView(true);
      chatClose();
    } else {
      setView(false);
      leaveSession();
      informClose();
      history.push("/");
    }
  };

  return (
    <React.Fragment>
      {view ? (
        <CloseContainer>
          <LineBox>
            <TextB subTitle> 상담을 종료할까요?</TextB>
          </LineBox>
          <BottomBox>
            <Button
              secondaryDefault
              size="narrow"
              margin="0px 8px"
              _onClick={closeModal}
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
                finish();
              }}
            >
              <Text margin="0px" color="#fff" body4 cursor="pointer">
                종료하기
              </Text>
            </Button>
          </BottomBox>
        </CloseContainer>
      ) : null}

      {review && role === "request" ? (
        <ReqReview
          resMemberId={chatInfo.resMemberId}
          resNickname={chatInfo.resNickname}
          informClose={informClose}
        />
      ) : null}
      {review && role === "response" ? (
        <ResReview
          reqMemberId={chatInfo.reqMemberId}
          reqNickname={chatInfo.reqNickname}
          informClose={informClose}
        />
      ) : null}
    </React.Fragment>
  );
}

export default ChatClose;

const CloseContainer = styled.div`
  width: 400px;
  height: 200px;
  box-sizing: border-box;
  padding: 35px 0px;
  background: #ffffff;
  border-radius: 20px;
  @media ${({ theme }) => theme.device.mobile} {
    padding-top: 15px;
    width: 320px;
    height: 146px;
    border-radius: 10px;
  }
`;

const LineBox = styled.div`
  display: flex ${({ theme }) => theme.common.flexCenter};
  @media ${({ theme }) => theme.device.mobile} {
    margin: auto;
  }
`;

const BottomBox = styled.div`
  height: 36px;
  margin: 15px auto;
  padding: 0px 50px;
  ${({ theme }) => theme.common.flexCenter};
`;
