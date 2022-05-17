import React from "react";
import { history } from "../redux/configureStore";
import { Text, Input, Button, TextB, Modal } from "../elements";
import styled from "styled-components";
//리덕스관련
import { useDispatch } from "react-redux";
import { actionCreators } from "../redux/modules/message";

function SendMsg() {
  const dispatch = useDispatch();
  //모달
  const [modalOpen, setModalOpen] = React.useState(true);
  const closeModal = () => {
    setModalOpen(false);
    history.push("/myPage");
  };
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
  const resUser = "마포대교";
  const send = () => {
    if (msg === "") {
      window.alert("쪽지를 작성해주세요!");
      return;
    }
    dispatch(actionCreators.addMessageDB(msg, resUser));
  };
  return (
    <>
      {modalOpen && (
        <Modal closeModal={closeModal}>
          <React.Fragment>
            <MsgWrapper>
              <TitleWrapper>
                <TextB sub>
                  <NickNameSpan>{resUser}</NickNameSpan> 님에게 쪽지 보내기
                </TextB>
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
                  sub4
                  textAlign="right"
                  margin="-35px 10px"
                  color="#999999"
                  size="12px"
                  weight="300"
                >
                  {textLength}/ 500자
                </Text>
              </MsgBox>

              <Button regular text="쪽지보내기" _onClick={send} />
            </MsgWrapper>
          </React.Fragment>
        </Modal>
      )}
    </>
  );
}

const MsgWrapper = styled.div`
  margin: auto;
  width: 550px;
  height: 625px;
  background: #ffffff;
  border-radius: 20px;
`;
const TitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;
  padding-top: 30px;
  gap: 4px;
  margin: 60px auto 0px;
  width: 550px;
  height: 22px;
  /* border: 1px solid red; */
`;
const NickNameSpan = styled.span`
  font-weight: 700px;
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
