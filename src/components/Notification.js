import React from "react";
import styled from "styled-components";
import { TextB, Text, ColorBadge, AlarmModal } from "../elements";
//리덕스 관련
import { history } from "../redux/configureStore";
import { useSelector } from "react-redux";

const Notification = () => {
  const alarmList = useSelector((state) => state.noti.noti);
  console.log(alarmList);
  //모달
  const [modalOpen, setModalOpen] = React.useState(true);
  const closeModal = () => {
    setModalOpen(false);
    history.goBack();
  };
  return (
    <>
      {modalOpen && (
        <AlarmModal closeModal={closeModal}>
          <React.Fragment>
            <NotiWrapper>
              <NotiTitle>
                <TextB textAlign="left">알림</TextB>
              </NotiTitle>
              <NotiContainer>
                {alarmList &&
                  alarmList.map((item, idx) => {
                    return item.notiType == "COMMENT" && !item.read ? (
                      <>
                        <NotiBox
                          key={idx}
                          onClick={() => {
                            history.push(`/postDetail/${item.notiPostId}`);
                          }}
                        >
                          <div className="title">
                            <Text headline color="#2E2A32" textAlign="left">
                              게시글에 댓글이 달렸어요.
                            </Text>
                            <Text body4 color="#948A9E">
                              방금
                            </Text>
                          </div>
                          <div className="subtitle">
                            <Text body4 color="#948A9E">
                              {item.notiContent}
                            </Text>
                          </div>
                        </NotiBox>
                      </>
                    ) : null;
                  })}

                {alarmList &&
                  alarmList.map((item, idx) => {
                    return item.notiType && !item.read == "FOLLOW" ? (
                      <>
                        <NotiBox key={idx}>
                          <div className="title">
                            <Text headline color="#2E2A32" textAlign="left">
                              나를 팔로우 했어요.
                            </Text>
                            <Text body4 color="#948A9E">
                              방금
                            </Text>
                          </div>
                          <div className="subtitle">
                            <ColorBadge
                              border="2px solid #F8F8F8"
                              size="14"
                              bg="#ddd"
                              cursor="pointer"
                            />
                            <Text body4 color="#948A9E" textAlign="left">
                              갱얼쥐갱얼쥐갱얼쥐갱
                            </Text>
                          </div>
                        </NotiBox>
                      </>
                    ) : null;
                  })}

                {alarmList &&
                  alarmList.map((item, idx) => {
                    return item.notiType && !item.read == "CHOICE" ? (
                      <>
                        <NotiBox
                          key={idx}
                          onClick={() => {
                            history.push(`/postDetail/${item.notiPostId}`);
                          }}
                        >
                          <div className="title">
                            <Text headline color="#2E2A32" textAlign="left">
                              댓글이 채택되었어요.
                            </Text>
                            <Text body4 color="#948A9E">
                              방금
                            </Text>
                          </div>
                          <div className="subtitle">
                            <Text body4 color="#948A9E" textAlign="left">
                              {item.notiContent}
                            </Text>
                          </div>
                        </NotiBox>
                      </>
                    ) : null;
                  })}

                {alarmList &&
                  alarmList.map((item, idx) => {
                    return item.notiType == "MESSAGE" && !item.read ? (
                      <>
                        <NotiBox key={idx}>
                          <div className="title">
                            <Text headline color="#2E2A32" textAlign="left">
                              쪽지가 도착했어요.
                            </Text>
                            <Text body4 color="#948A9E">
                              방금
                            </Text>
                          </div>
                          <div className="subtitle">
                            <ColorBadge
                              border="2px solid #F8F8F8"
                              size="14"
                              bg="#ddd"
                              cursor="pointer"
                            />
                            <Text body4 color="#948A9E" textAlign="left">
                              갱얼쥐갱얼쥐갱얼쥐갱
                            </Text>
                          </div>
                        </NotiBox>
                      </>
                    ) : null;
                  })}

                {/* <ArrowBox>
                  <div className="arrow" />
                </ArrowBox> */}
              </NotiContainer>
            </NotiWrapper>
          </React.Fragment>
        </AlarmModal>
      )}
    </>
  );
};

const NotiWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 30px;
  gap: 12px;
  width: 400px;
  max-height: 1024px;
  background: #ffffff;
  box-shadow: 0px 0px 20px rgba(172, 151, 197, 0.25);
  border-radius: 20px;
`;
const NotiTitle = styled.div`
  width: 340px;
  margin: auto;
  height: 40px;
`;
const NotiContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  width: 340px;
  height: 440px;
`;
const NotiBox = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  flex-direction: column;
  width: 340px;
  height: 88px;
  flex: none;
  order: 0;
  flex-grow: 0;
  border-bottom: 1px solid #e6e6e6;
  box-sizing: border-box;
  cursor: pointer;
  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
    padding-bottom: 6px;
    box-sizing: border-box;
  }
  .subtitle {
    display: flex;
    justify-content: left;
    text-align: left;
    flex-direction: row;
  }
`;
const ArrowBox = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  flex-direction: column;
  width: 100px;
  border: 1px solid red;
  .arrow {
    width: 0;
    height: 0;
    z-index: 40;
    border-top: 20px solid transparent;
    border-bottom: 20px solid transparent;
    border-left: 20px solid red; /* 화살표 */
  }
`;
export default Notification;
