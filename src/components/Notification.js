import React from "react";
import styled from "styled-components";
import { TextB, Text, ColorBadge, AlarmModal } from "../elements";
import { ReactComponent as EmptyMsg } from "../assets/Empty/emptyMsg.svg";
//리덕스 관련
import { history } from "../redux/configureStore";
import { useSelector } from "react-redux";
//시간알려주는패키지
import TimeCounting from "time-counting";

const Notification = () => {
  const alarmList = useSelector((state) => state.noti.noti);
  const lastIdx = alarmList[alarmList.length - 1];
  //모달
  const [modalOpen, setModalOpen] = React.useState(true);
  const closeModal = () => {
    setModalOpen(false);
    history.goBack();
  };
  //시간을 알아보자!
  const option = {
    lang: "ko",
    calculate: {
      justNow: 60,
    },
  };
  return (
    <>
      {modalOpen && (
        <AlarmModal closeModal={closeModal}>
          <React.Fragment>
            <NotiWrapper>
              <NotiTitle>
                <Text title textAlign="left">
                  알림
                </Text>
              </NotiTitle>
              <NotiContainer>
                {lastIdx?.read ? (
                  <EmptyBox>
                    <EmptyMsg style={{ paddingBottom: "10px" }} />
                  </EmptyBox>
                ) : null}

                {alarmList &&
                  alarmList.map((item, idx) => {
                    return item.notiType === "COMMENT" && !item.read ? (
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
                              {TimeCounting(item.createAt, option)}
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
                    return item.notiType && !item.read === "FOLLOW" ? (
                      <>
                        <NotiBox key={idx}>
                          <div className="title">
                            <Text headline color="#2E2A32" textAlign="left">
                              나를 팔로우 했어요.
                            </Text>
                            <Text body4 color="#948A9E">
                              {TimeCounting(item.createAt, option)}
                            </Text>
                          </div>
                          <div className="subtitle">
                            <ColorBadge
                              border="2px solid #F8F8F8"
                              size="14"
                              bg={item.oppositeMemberColor}
                              cursor="pointer"
                            />
                            <Text body4 color="#948A9E" textAlign="left">
                              {item.notiPostId}
                            </Text>
                          </div>
                        </NotiBox>
                      </>
                    ) : null;
                  })}

                {alarmList &&
                  alarmList.map((item, idx) => {
                    return item.notiType && !item.read === "CHOICE" ? (
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
                              {TimeCounting(item.createAt, option)}
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
                    return item.notiType === "MESSAGE" && !item.read ? (
                      <>
                        <NotiBox
                          key={idx}
                          onClick={() => {
                            history.push("/myPage");
                          }}
                        >
                          <div className="title">
                            <Text headline color="#2E2A32" textAlign="left">
                              쪽지가 도착했어요.
                            </Text>
                            <Text body4 color="#948A9E">
                              {TimeCounting(item.createAt, option)}
                            </Text>
                          </div>
                          <div className="subtitle">
                            <ColorBadge
                              border="2px solid #F8F8F8"
                              size="14"
                              bg={item.oppositeMemberColor}
                              cursor="pointer"
                            />
                            <Text body4 color="#948A9E" textAlign="left">
                              {item.notiContent}
                            </Text>
                          </div>
                        </NotiBox>
                      </>
                    ) : null;
                  })}
              </NotiContainer>
            </NotiWrapper>
          </React.Fragment>
        </AlarmModal>
      )}
    </>
  );
};

const NotiWrapper = styled.div`
  overflow: scroll;
  ::-webkit-scrollbar {
    width: 0.3px;
  }
  ::-webkit-scrollbar-thumb {
    height: 10%;
    background-color: rgba(255, 255, 255, 1);
    /* 스크롤바 둥글게 설정    */
    border-radius: 100%;
  }

  ::-webkit-scrollbar-track {
    background-color: transparent;
  }

  /* position: absolute; */
  width: 400px;
  max-height: 708px;
  /* right: 160px;
  bottom: 5px; */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  /* padding: 30px; */
  gap: 12px;
  background: #ffffff;
  box-shadow: 0px 0px 20px rgba(172, 151, 197, 0.25);
  border-radius: 20px;
  @media ${({ theme }) => theme.device.isMobile} {
    width: 320px;
    height: 452px;
    display: flex;
    justify-content: center;
    margin: auto;
    align-items: center;
    right: 0px;
  }
`;
const NotiTitle = styled.div`
  width: 340px;
  margin: auto;
  height: 40px;
  border: 10px solid white;
  @media ${({ theme }) => theme.device.isMobile} {
    width: 260px;
    height: 20px;
    border: 10px solid white;
  }
`;
const NotiContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  width: 340px;
  height: 440px;
  /* border: 1px solid red; */
  @media ${({ theme }) => theme.device.isMobile} {
    width: 260px;
    height: 352px;
    /* border: 1px solid red; */
  }
`;
const EmptyBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  width: 340px;
  height: 440px;
  /* border: 1px solid red; */
  @media ${({ theme }) => theme.device.isMobile} {
    width: 260px;
    height: 352px;
    /* border: 1px solid red; */
  }
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
    width: 340px;
    display: flex;
    justify-content: left;
    text-align: left;
    flex-direction: row;
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    /* border: 1px solid red; */
  }
  @media ${({ theme }) => theme.device.isMobile} {
    width: 260px;
    height: 88px;
    /* border: 1px solid red; */
  }
`;
const ArrowBox = styled.div`
  display: flex;
  position: absolute;

  max-height: 708px;
  right: 1px;
  bottom: 5px;
  /* justify-content: center;
  text-align: center; */
  /* flex-direction: column; */
  /* width: 100px; */
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
