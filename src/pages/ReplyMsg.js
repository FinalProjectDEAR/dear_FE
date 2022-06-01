import React from "react";

import { history } from "../redux/configureStore";

import { useDispatch, useSelector } from "react-redux";
import { MsgActionCreators } from "../redux/modules/message";

import styled from "styled-components";
import Swal from "sweetalert2";
import { CgClose } from "react-icons/cg";
import "../styles/libraryStyle/style.css";
import { useMediaQuery } from "react-responsive";
import { Text, Input, Button, TextB, Modal } from "../elements";

function ReplyMsg() {
  const Mobile = useMediaQuery({
    query: "(max-width:425px)",
  });

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
      Swal.fire("500자 이상 작성할 수 없습니다.");
      return;
    }
    setTextLength(wordLength);
  };
  const msgList = useSelector((state) => state.message.messages);
  console.log(msgList);
  // const follower = useSelector((state) => state.mypage.follower);

  const send = () => {
    if (msg === "") {
      Swal.fire("쪽지를 작성해주세요!");
      return;
    }
    dispatch(MsgActionCreators.addMessageDB(msg, msgList.reqUserId));
  };
  return (
    <>
      {modalOpen && (
        <Modal closeModal={closeModal}>
          <React.Fragment>
            {Mobile ? (
              <CgClose
                className="close"
                size={20}
                onClick={closeModal}
                style={{
                  color: "#948A9E",
                  position: "absolute",
                  right: "180px",
                  top: "60px",
                  cursor: "pointer",
                }}
              />
            ) : (
              <CgClose
                className="close"
                size={20}
                onClick={closeModal}
                style={{
                  color: "#948A9E",
                  position: "absolute",
                  right: "70px",
                  top: "40px",
                  cursor: "pointer",
                }}
              />
            )}
            <MsgWrapper>
              <TitleWrapper>
                <TextB sub>
                  <NickNameSpan>{msgList.reqUserNickName}</NickNameSpan> 님에게
                  쪽지 보내기
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
  width: 550px;
  height: 625px;
  margin: auto;
  background: #ffffff;
  border-radius: 20px;
  @media ${({ theme }) => theme.device.mobile} {
    width: 320px;
    height: 520px;
  }
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;
  width: 550px;
  height: 22px;
  padding-top: 30px;
  margin: 60px auto 0px;
  gap: 4px;
  @media ${({ theme }) => theme.device.mobile} {
    width: 320px;
    height: 18px;
    margin: 30px auto 0px;
  }
`;

const NickNameSpan = styled.span`
  font-weight: 700px;
  size: 16px;
  line-height: 22px;
  color: #2e2a32;
`;

const MsgBox = styled.div`
  width: 470px;
  height: 350px;
  margin: auto;
  padding-bottom: 69px;
  @media ${({ theme }) => theme.device.mobile} {
    width: 280px;
    height: 344px;
    padding-bottom: 39px;
  }
`;

export default ReplyMsg;
