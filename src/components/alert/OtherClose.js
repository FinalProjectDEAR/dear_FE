import React from "react";
//리덕스
import { useSelector } from "react-redux";
//스타일
import styled from "styled-components";
import { Text, TextB, Button } from "../../elements";
//페이지
import ResReview from "../../pages/ResReview";
import ReqReview from "../../pages/ReqReview";

function OtherClose(props) {
  const { informClose, leaveSession, noMatch } = props;
  const [review, setReview] = React.useState(false);
  const [view, setView] = React.useState(true);

  const role = useSelector((state) => state.chat.roomAuthInfo.role);
  const chatInfo = useSelector((state) => state.chat.chatInfo);

  return (
    <React.Fragment>
      {view ? (
        <CloseContainer>
          <LineBox>
            <TextB subTitle> 상대방이 상담을 종료하였습니다.</TextB>
          </LineBox>
          <BottomBox>
            <Button
              primaryDefault
              size="narrow"
              margin="0px 8px"
              _onClick={() => {
                setView(false);
                setReview(true);
                noMatch();
              }}
            >
              <Text margin="0px" color="#fff" body4 cursor="pointer">
                확인
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

export default OtherClose;

const CloseContainer = styled.div`
  width: 400px;
  height: 200px;
  box-sizing: border-box;
  padding: 35px 0px;
  background: #ffffff;
  border-radius: 20px;
  @media ${({ theme }) => theme.device.mobile} {
    width: 320px;
    height: 146px;
    padding-top: 15px;
    border-radius: 10px;
  }
`;

const LineBox = styled.div`
  ${({ theme }) => theme.common.flexCenter};
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
