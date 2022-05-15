import React from "react";
import { useHistory } from "react-router-dom";
import { Text, Button, ColorBadge } from "../elements";
import { ReactComponent as Cancel } from "../assets/Vector (2).svg";
import styled from "styled-components";
//시간알려주는패키지
import TimeCounting from "time-counting";
//리덕스관련
import { useSelector } from "react-redux";
import { actionCreators } from "../redux/modules/message";

const ReceivedMsg = () => {
  const history = useHistory();
  //메세지 가져오가
  const message = useSelector((state) => state.message);
  //시간을 알아보자!
  const option = {
    lang: "ko",
    calculate: {
      justNow: 60,
    },
  };
  // const createdAt = TimeCounting(createAt, option);
  return (
    <React.Fragment>
      <MsgWrapper>
        <CancelContainer>
          <CancelBtn>
            <Cancel />
          </CancelBtn>
        </CancelContainer>
        <TitleWrapper>
          <Text
            batang
            weight="500"
            size="14px"
            lineheight="20px"
            color="#666666"
          >
            <NickNameSpan>닉네임은최대10자</NickNameSpan> 님이 보낸 쪽지
          </Text>
        </TitleWrapper>
        <MsgContainer>
          <MsgBox>
            <Text
              size="14px"
              color="#2e2a32"
              weight="300"
              lineheight="24px"
              textAlign="left"
            >
              쪽지내용쪽지내용쪽지내용쪽지내용쪽지내용쪽지내용쪽지내용쪽지내용쪽지내용쪽지내용쪽지내용쪽지내용쪽지내용쪽지내용쪽지내용
            </Text>
          </MsgBox>
        </MsgContainer>
        <UserContainer>
          <UserBox>
            <UserText>
              <ColorBadge width="24px" height="24px" bg="#40D39C" />
              꿀꿀대지
            </UserText>
            <UserSpan>(1달 전 상담)</UserSpan>
          </UserBox>
          <UserTime>28분전</UserTime>
        </UserContainer>

        <Button
          bg="#7a37be"
          width="160px"
          height="36px"
          color="white"
          text="답장하기"
          _onClick={() => {
            history.push("/sendMsg");
          }}
        />
      </MsgWrapper>
    </React.Fragment>
  );
};

const MsgWrapper = styled.div`
  margin: auto;
  width: 550px;
  height: 625px;
  background: #ffffff;
  border-radius: 20px;
`;
const CancelBtn = styled.button`
  border: none;
  background-color: transparent;
  width: 24px;
  height: 24px;
`;
const CancelContainer = styled.div`
  margin-left: 330px;
  padding-top: 25px;
  text-align: right;
  width: 200px;
  /* border: solid 1px red; */
`;
const TitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;
  padding-top: 30px;
  gap: 4px;
  margin: auto;
  width: 550px;
  height: 22px;
  /* border: 1px solid red; */
`;
const NickNameSpan = styled.span`
  weight: 700px;
  size: 16px;
  line-height: 22px;
  color: #2e2a32;
`;
const MsgContainer = styled.div`
  margin: auto;
  width: 470px;
  height: 350px;
  /* border: solid 1px red; */
`;
const MsgBox = styled.div`
  display: flex;
  padding: 15px 15px 45px 15px;
`;
const UserContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: auto;
  width: 470px;
  height: 24px;
  padding-bottom: 45px;
  /* border: solid 1px red; */
`;
const UserBox = styled.div`
  display: flex;
  width: 153px;
  height: 24px;
  /* border: solid 1px orange; */
`;
const UserText = styled.div`
  size: 16px;
  line-height: 24px;
  font-weight: 500;
  color: #2e2a32;
`;
const UserSpan = styled.span`
  weight: 300;
  size: 12px;
  line-height: 24px;
  color: #61586a;
`;
const UserTime = styled.div`
  height: 14px;
  font-weight: 300;
  size: 12px;
  color: #666666;
  line-height: 24px;
  /* border: solid 1px orange; */
`;
export default ReceivedMsg;