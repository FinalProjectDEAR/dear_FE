import React from "react";
import { Text, Input, Button } from "../elements";
import { ReactComponent as Cancel } from "../assets/Vector (2).svg";
import styled from "styled-components";
//리덕스관련
import { useDispatch } from "react-redux";
import { actionCreators } from "../redux/modules/message";

function SendMsg() {
  const [textLength, setTextLength] = React.useState(0);
  const [msg, setMsg] = React.useState();
  //글자 수 제한
  const checkMaxLength = (e) => {
    let wordLength = e.target.value.length;
    if (wordLength >= 500) {
      window.alert("500자 이상 작성할 수 없습니다.");
      return;
    }
    setTextLength(wordLength);
  };
  const send = () => {
    if (msg === "") {
      window.alert("쪽지를 작성해주세요!");
      return;
    }
    actionCreators.addMessageDB({ msg });
  };
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
            <NickNameSpan>닉네임은최대10자</NickNameSpan> 님에게 쪽지 보내기
          </Text>
        </TitleWrapper>
        <MsgBox>
          <Input
            placeholder="내용을 작성해주세요(최대 500자)"
            _onChange={(e) => {
              setMsg(e.target.value);
            }}
            _onKeyUp={checkMaxLength}
            value={msg}
            multiLine
            maxlength="500"
            rows={20}
            margin="0px"
          />

          <Text
            textAlign="right"
            margin="-35px 10px"
            color="#999999"
            size="12px"
            weight="300"
          >
            {textLength}/ 500자
          </Text>
        </MsgBox>
        <Button
          bg="#7a37be"
          width="160px"
          height="36px"
          color="white"
          text="쪽지보내기"
          _onClick={send}
        />
      </MsgWrapper>
    </React.Fragment>
  );
}

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
const MsgBox = styled.div`
  margin: auto;
  width: 470px;
  height: 350px;
  padding-bottom: 69px;
`;

export default SendMsg;
