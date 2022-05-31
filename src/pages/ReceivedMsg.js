import React from "react";

import { history } from "../redux/configureStore";
//리덕스관련
import { useDispatch, useSelector } from "react-redux";
import { MsgActionCreators } from "../redux/modules/message";
import { useParams } from "react-router-dom";

import { Text, Button, TextB, Modal } from "../elements";
import { CgClose } from "react-icons/cg";
import styled from "styled-components";
import { useMediaQuery } from "react-responsive";
//시간알려주는패키지
import TimeCounting from "time-counting";

const ReceivedMsg = () => {
  const Mobile = useMediaQuery({
    query: "(max-width:767px)",
  });

  const params = useParams();

  const msgId = params.messageId;
  const dispatch = useDispatch();

  //모달
  const [modalOpen, setModalOpen] = React.useState(true);
  const closeModal = () => {
    setModalOpen(false);
    history.push("/myPage");
  };

  //메세지조회
  React.useEffect(() => {
    dispatch(MsgActionCreators.getDetailMsgDB(msgId));
  }, []);

  //메세지 가져오가
  const msgList = useSelector((state) => state.message.messages);

  //시간을 알아보자!
  const option = {
    lang: "ko",
    calculate: {
      justNow: 60,
    },
  };
  const createdAt = TimeCounting(msgList?.createdAt, option);

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
                <TextB
                  batang
                  weight="500"
                  size="14px"
                  lineheight="20px"
                  color="#666666"
                >
                  <NickNameSpan>{msgList?.reqUserNickName}</NickNameSpan> 님이
                  보낸 쪽지
                </TextB>
              </TitleWrapper>
              <MsgContainer>
                <MsgBox>
                  <Text
                    sub7
                    size="14px"
                    color="#2e2a32"
                    weight="300"
                    lineheight="24px"
                    textAlign="left"
                  >
                    {msgList?.message}
                  </Text>
                </MsgBox>
              </MsgContainer>
              <UserContainer>
                <UserBox>
                  <UserText>{msgList?.resUserNickName}</UserText>
                </UserBox>
                <UserTime>{createdAt}</UserTime>
              </UserContainer>
              <Button
                regular
                text="답장하기"
                _onClick={() => {
                  history.push(`/ReplyMsg/${msgId}`);
                }}
              />
            </MsgWrapper>
          </React.Fragment>
        </Modal>
      )}
    </>
  );
};

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
  weight: 700px;
  size: 16px;
  line-height: 22px;
  color: #2e2a32;
`;

const MsgContainer = styled.div`
  width: 470px;
  height: 350px;
  margin: auto;
  @media ${({ theme }) => theme.device.mobile} {
    width: 280px;
    height: 320px;
  }
`;

const MsgBox = styled.div`
  display: flex;
  padding: 15px 15px 45px 15px;
  @media ${({ theme }) => theme.device.mobile} {
    width: 280px;
    height: 258px;
    margin: auto;
    padding: 15px 15px 45px 3px;
  }
`;

const UserContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 470px;
  height: 24px;
  margin: auto;
  padding-bottom: 45px;
  @media ${({ theme }) => theme.device.mobile} {
    width: 270px;
    height: 10px;
  }
`;

const UserBox = styled.div`
  display: flex;
  width: 153px;
  height: 24px;
`;

const UserText = styled.div`
  size: 16px;
  line-height: 24px;
  font-weight: 500;
  color: #2e2a32;
`;

const UserTime = styled.div`
  height: 14px;
  font-weight: 300;
  size: 12px;
  color: #666666;
  line-height: 24px;
`;

export default ReceivedMsg;
