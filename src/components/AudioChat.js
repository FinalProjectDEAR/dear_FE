import React, { useRef, useIn } from "react";
import { useSelector, useDispatch } from "react-redux";
import { history } from "../redux/configureStore";
import { actionCreators as chatActions } from "../redux/modules/chat";
import { OpenVidu } from "openvidu-browser";

import styled from "styled-components";
import { Text, Button, ColorBadge, Modal } from "../elements";

//page
import UserAudioComponent from "../components/UserAudioComponent";
import Timer from "../components/Timer";
import LoadingMatch from "../pages/LoadingMatch";
import ChatClose from "./alert/ChatClose";
import OtherClose from "./alert/OtherClose";
import AddTime from "./alert/AddTime";
import TimeOver from "./alert/TimeOver";
import NoMatch from "./alert/NoMatch";

function AudioChat() {
  const dispatch = useDispatch();

  const nickname = localStorage.getItem("nickname");
  //세션 입장정보
  const token = useSelector((state) => state.chat.roomAuthInfo.token);
  const sessionId = useSelector((state) => state.chat.roomAuthInfo.sessionId);
  const role = useSelector((state) => state.chat.roomAuthInfo.role);
  //채팅방 정보
  const chatInfo = useSelector((state) => state.chat.chatInfo);

  //채팅
  const [mySessionId, setMySessionId] = React.useState("");
  const [session, setSession] = React.useState(undefined);
  const [mainStreamManager, setMainStreamManager] = React.useState(undefined);
  const [publisher, setPublisher] = React.useState(undefined);
  const [subscribers, setSubscribers] = React.useState([]);
  const [otherClose, setOtherClose] = React.useState(false);
  const [targetTime, setTargetTime] = React.useState("");
  const [isConnect, setIsConnect] = React.useState(false);
  const [connectObj, setConnectObj] = React.useState("");
  const [wantMore, setWantMore] = React.useState({ agree: [] });
  const [isContinue, setIsContinue] = React.useState(false);
  const [isTimeOver, setIsTimeOver] = React.useState(false);

  //voice
  const [mVoice, setMvoice] = React.useState(true);
  const [wVoice, setWvoice] = React.useState(true);

  //모달
  const [modalOpen, setModalOpen] = React.useState(false);
  const [noListener, setNoListener] = React.useState(false);
  const [showReqInfo, setShowReqInfo] = React.useState(false);
  const [showResInfo, setShowResInfo] = React.useState(false);
  const [showFiveSec, setShowFiveSec] = React.useState(false);

  const closeModal = () => {
    setModalOpen(false);
  };

  const addTimeClose = () => {
    setIsContinue(false);
  };

  //브라우저 새로고침, 종료시
  const onbeforeunload = (event) => {
    event.preventDefault();
    event.returnValue = "";
    informClose();
  };

  // 채팅중 실시간 시그널

  const sendCloseSignal = () => {
    console.log("종료 시그널 보내", connectObj);
    session
      .signal({
        data: "true", // Any string (optional)
        to: [connectObj], // Array of Connection objects (optional. Broadcast to everyone if empty)
        type: "close", // The type of message (optional)
      })
      .then(() => {
        console.log("채팅종료한대");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const sendContinueSignal = () => {
    const wantMoreList = wantMore.agree;
    wantMoreList.push("true");
    setWantMore({ ...wantMore, agree: wantMoreList });

    if (wantMore.agree.length % 2 === 0) {
      let date = new Date();
      let extend = date.setMinutes(date.getMinutes() + 1); //연장 테스트 1분
      setTargetTime(extend);
    }

    session
      .signal({
        data: "true", // Any string (optional)
        to: [connectObj], // Array of Connection objects (optional. Broadcast to everyone if empty)
        type: "continue", // The type of message (optional)
      })
      .then(() => {
        console.log("연장하구싶대", wantMore);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const sendConnectSignal = () => {
    console.log("커넥트 시그널 보내:", connectObj);
    session
      .signal({
        data: "true", // Any string (optional)
        to: [connectObj], // Array of Connection objects (optional. Broadcast to everyone if empty)
        type: "connect", // The type of message (optional)
      })
      .then(() => {
        console.log("채팅연결했대");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  //세션 연결 및 커넥트
  React.useEffect(() => {
    window.addEventListener("beforeunload", onbeforeunload);

    const connectSession = () => {
      console.log("커넥트 세션시작");
      const OV = new OpenVidu();

      var mySession = OV.initSession();
      setSession(mySession);

      mySession.on("streamCreated", (event) => {
        console.log("스트림생성");
        var subscriber = mySession.subscribe(event.stream, undefined);
        var subscriberList = subscribers;
        subscriberList.push(subscriber);
        setSubscribers([...subscribers, ...subscriberList]);

        // let date = new Date();
        // let target = date.setMinutes(date.getMinutes() + 10);
        // setTargetTime(target);
        setIsConnect(true);
        // sendConnectSignal();
        dispatch(chatActions.getChatInfoDB(sessionId));

        // setShowFiveSec(true);
        // setShowFiveSec(false);
      });

      mySession.on("signal:connect", (event) => {
        console.log("커넥션 메세지 수신");
        // const fiveSecWait = () => {};
        // setTimeout(fiveSecWait(), 5000);
        // dispatch(chatActions.getChatInfoDB(sessionId));
      });

      mySession.on("signal:close", (event) => {
        setOtherClose(true);
        console.log("종료 수신", event.data);
      });

      mySession.on("signal:continue", (event) => {
        console.log("연장 수신", wantMore);
        const wantMoreList = wantMore.agree;
        wantMoreList.push("true");
        setWantMore({ ...wantMore, agree: wantMoreList });
        if (wantMore.agree.length % 2 === 0) {
          let date = new Date();
          let extend = date.setMinutes(date.getMinutes() + 10);
          setTargetTime(extend);
        }
      });

      //메세지 송신을 위한 connect Obj 생성
      mySession.on("connectionCreated", (event) => {
        setConnectObj(event.connection);
        console.log("커넥션 생성", event.connection);
      });

      mySession
        .connect(token, { clientData: nickname })
        .then(async () => {
          console.log("토큰으로 커넥트");
          var devices = await OV.getDevices();
          var videoDevices = devices.filter(
            (device) => device.kind === "videoinput"
          );

          let publisher = OV.initPublisher(undefined, {
            audioSource: undefined,
            videoSource: videoDevices[0].deviceId,
            publishAudio: true,
            publishVideo: false,
            resolution: "640x480",
            frameRate: 30,
            insertMode: "APPEND",
            mirror: false,
          });

          mySession.publish(publisher);
          setMainStreamManager(publisher);
          setPublisher(publisher);
        })
        .catch((err) => {
          console.log("커넥팅 실패", err.code, err.message);
        });
    };

    connectSession();

    return () => {
      window.removeEventListener("beforeunload", onbeforeunload);
    };
  }, []);

  //세션,커넥션 종료
  const leaveSession = () => {
    console.log("오픈비두 세션종료");

    session.disconnect();

    setSession(undefined);
    setSubscribers([]);
    setMySessionId("");
    setPublisher(undefined);
  };

  //매칭 안될 때
  React.useEffect(() => {
    if (!isConnect) {
      console.log("30초 카운트");
      setTimeout(waitTimeOut, 30000);
    }
  }, []);

  const noMatch = () => {
    leaveSession();
    setTimeout(informClose(), 500);
  };

  const waitTimeOut = () => {
    setNoListener(true);
  };

  // 채팅 종료
  const chatClose = () => {
    sendCloseSignal();
    setTimeout(leaveSession, 2000); //2000
  };

  //서버에 종료 알리기
  const informClose = () => {
    console.log("채팅방종료 서버통신");
    const closeTime = new Date();
    if (isConnect) {
      console.log("채팅시 종료");
      dispatch(chatActions.closeChatDB(sessionId, dateFormat(closeTime)));
    } else {
      console.log("혼자 종료");
      dispatch(chatActions.disConnectDB(sessionId));
    }
  };

  // 뒤로가기
  React.useEffect(() => {
    window.onpopstate = () => {
      noMatch();
    };
  });

  // 채팅종료시간
  function dateFormat(date) {
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();

    month = month >= 10 ? month : "0" + month;
    day = day >= 10 ? day : "0" + day;
    hour = hour >= 10 ? hour : "0" + hour;
    minute = minute >= 10 ? minute : "0" + minute;
    second = second >= 10 ? second : "0" + second;

    return (
      date.getFullYear() +
      "." +
      month +
      "." +
      day +
      " " +
      hour +
      ":" +
      minute +
      ":" +
      second
    );
  }

  //연장의사묻기
  const askContinue = () => {
    setIsContinue(true);
  };

  //타임오버
  const timeOverSet = () => {
    setIsTimeOver(true);
  };

  return (
    <React.Fragment>
      {role === "request" || subscribers.length > 0 ? (
        <ChatWrapper>
          <ChatContainer>
            {role === "request" && publisher !== undefined ? (
              <TapeBox>
                <UserAudioComponent
                  streamManager={mainStreamManager}
                  color={chatInfo.reqColor}
                />
                <Timer
                  targetTime={targetTime}
                  timeOverSet={timeOverSet}
                  askContinue={askContinue}
                  wantMore={wantMore}
                />
                <div style={{ width: "85px" }}>
                  <UserAudioComponent
                    streamManager={subscribers[0]}
                    color={chatInfo.resColor}
                  />
                </div>
              </TapeBox>
            ) : null}
            {role === "response" && publisher !== undefined ? (
              <TapeBox>
                <UserAudioComponent
                  streamManager={subscribers[0]}
                  color={chatInfo.reqColor}
                />
                <Timer
                  targetTime={targetTime}
                  timeOverSet={timeOverSet}
                  askContinue={askContinue}
                  wantMore={wantMore}
                />
                <UserAudioComponent
                  streamManager={mainStreamManager}
                  color={chatInfo.resColor}
                />
              </TapeBox>
            ) : null}
            <div style={{ display: "flex", justifyContent: "center" }}>
              <UserBox>
                <Text body3>{chatInfo.reqNickname}</Text>
                <TagBox>
                  <TagLine>
                    {chatInfo.reqAge ? (
                      <Tag>
                        <Text sub7 margin="6px 8px">
                          {chatInfo.reqAge}
                        </Text>
                      </Tag>
                    ) : null}
                    {chatInfo.reqUserDating ? (
                      <Tag>
                        <Text sub7 margin="6px 8px">
                          {chatInfo.reqUserDating}
                        </Text>
                      </Tag>
                    ) : null}
                  </TagLine>
                  <TagLine>
                    {chatInfo.reqLoveType ? (
                      <Tag>
                        <Text sub7 margin="6px 8px">
                          {chatInfo.reqLoveType}
                        </Text>
                      </Tag>
                    ) : null}
                    {chatInfo.reqLovePeriod ? (
                      <Tag>
                        <Text sub7 margin="6px 8px">
                          {chatInfo.reqLovePeriod}
                        </Text>
                      </Tag>
                    ) : null}
                  </TagLine>
                </TagBox>
              </UserBox>
              <MobileUserBox>
                <Ellipsis>
                  <Text body3>{chatInfo.reqNickname}</Text>
                  {/* <Text body3>비둘기구구절절구구</Text> */}
                </Ellipsis>
                <InfoBtn
                  onClick={() => {
                    setShowReqInfo(true);
                  }}
                >
                  <Text sub color="#333">
                    정보보기
                  </Text>
                </InfoBtn>
                {showReqInfo ? (
                  <TagInfo
                    onClick={() => {
                      setShowReqInfo(false);
                    }}
                  >
                    <TagLine>
                      {chatInfo.reqAge ? (
                        <Tag>
                          <Text sub7 margin="6px 8px">
                            {chatInfo.reqAge}
                          </Text>
                        </Tag>
                      ) : null}
                      {chatInfo.reqUserDating ? (
                        <Tag>
                          <Text sub7 margin="6px 8px">
                            {chatInfo.reqUserDating}
                          </Text>
                        </Tag>
                      ) : null}
                    </TagLine>
                    <TagLine>
                      {chatInfo.reqLoveType ? (
                        <Tag>
                          <Text sub7 margin="6px 8px">
                            {chatInfo.reqLoveType}
                          </Text>
                        </Tag>
                      ) : null}
                      {chatInfo.reqLovePeriod ? (
                        <Tag>
                          <Text sub7 margin="6px 8px">
                            {chatInfo.reqLovePeriod}
                          </Text>
                        </Tag>
                      ) : null}
                    </TagLine>
                  </TagInfo>
                ) : null}
              </MobileUserBox>
              <UserBox>
                <Text body3>{chatInfo.resNickname}</Text>
                {chatInfo.resNickname ? (
                  <TagBox>
                    <TagLine>
                      {chatInfo.reqAge ? (
                        <Tag>
                          <Text sub7 margin="6px 8px">
                            {chatInfo.resAge}
                          </Text>
                        </Tag>
                      ) : null}
                      {chatInfo.resUserDating ? (
                        <Tag>
                          <Text sub7 margin="6px 8px">
                            {chatInfo.resUserDating}
                          </Text>
                        </Tag>
                      ) : null}
                    </TagLine>
                    <TagLine>
                      {chatInfo.reqLoveType ? (
                        <Tag>
                          <Text sub7 margin="6px 8px">
                            {chatInfo.resLoveType}
                          </Text>
                        </Tag>
                      ) : null}
                      {chatInfo.reqLovePeriod ? (
                        <Tag>
                          <Text sub7 margin="6px 8px">
                            {chatInfo.resLovePeriod}
                          </Text>
                        </Tag>
                      ) : null}
                    </TagLine>
                  </TagBox>
                ) : null}
              </UserBox>
              <MobileUserBox>
                {isConnect ? (
                  <>
                    <Ellipsis>
                      <Text body3>{chatInfo.resNickname}</Text>
                    </Ellipsis>
                    <InfoBtn
                      onClick={() => {
                        setShowResInfo(true);
                      }}
                    >
                      <Text sub color="#333">
                        정보보기
                      </Text>
                    </InfoBtn>
                    {showResInfo ? (
                      <TagInfo
                        onClick={() => {
                          setShowResInfo(false);
                        }}
                      >
                        <TagLine>
                          {chatInfo.resAge ? (
                            <Tag>
                              <Text sub7 margin="6px 8px">
                                {chatInfo.resAge}
                              </Text>
                            </Tag>
                          ) : null}
                          {chatInfo.resUserDating ? (
                            <Tag>
                              <Text sub7 margin="6px 8px">
                                {chatInfo.resUserDating}
                              </Text>
                            </Tag>
                          ) : null}
                        </TagLine>
                        <TagLine>
                          {chatInfo.resLoveType ? (
                            <Tag>
                              <Text sub7 margin="6px 8px">
                                {chatInfo.resLoveType}
                              </Text>
                            </Tag>
                          ) : null}
                          {chatInfo.resLovePeriod ? (
                            <Tag>
                              <Text sub7 margin="6px 8px">
                                {chatInfo.resLovePeriod}
                              </Text>
                            </Tag>
                          ) : null}
                        </TagLine>
                      </TagInfo>
                    ) : null}
                  </>
                ) : null}
              </MobileUserBox>
            </div>
          </ChatContainer>
          <BottomBox>
            {/* <VoiceBtnBox>
              <VoiceBtn
                onClick={() => {
                  MVoiceChange();
                }}
              >
                <img src={lowPitch} alt="voice1" style={{ width: "20px" }} />
              </VoiceBtn>
              <VoiceBtn
                onClick={() => {
                  WVoiceChange();
                }}
              >
                <img src={highPitch} alt="voice2" style={{ width: "20px" }} />
              </VoiceBtn>
            </VoiceBtnBox> */}
            {/* <Button
              primaryDefault
              bg={isConnect ? "#7A37BE" : "#999999"}
              margin="0px 10px"
            >
              ON AIR
            </Button> */}
            <Button
              primaryDefault
              size="regular"
              _onClick={() => {
                setModalOpen(true);
              }}
              margin="0px 10px"
            >
              상담 종료하기
            </Button>
          </BottomBox>
        </ChatWrapper>
      ) : null}
      {role === "response" && isConnect === false ? (
        <LoadingMatch informClose={informClose} leaveSession={leaveSession} />
      ) : null}
      {modalOpen && (
        <Modal>
          <ChatClose
            closeModal={closeModal}
            leaveSession={leaveSession}
            chatClose={chatClose}
            informClose={informClose}
            isConnect={isConnect}
          />
        </Modal>
      )}

      {otherClose ? (
        <Modal>
          <OtherClose informClose={informClose} leaveSession={leaveSession} />
        </Modal>
      ) : null}

      {noListener && isConnect === false && role === "request" ? (
        <Modal closeModal={closeModal}>
          <NoMatch noMatch={noMatch} />
        </Modal>
      ) : null}
      {isContinue === true ? (
        <Modal closeModal={closeModal}>
          <AddTime
            sendContinueSignal={sendContinueSignal}
            addTimeClose={addTimeClose}
            leaveSession={leaveSession}
            informClose={informClose}
            wantMore={wantMore}
          />
        </Modal>
      ) : null}
      {isTimeOver === true ? (
        <Modal>
          <TimeOver
            leaveSession={leaveSession}
            informClose={informClose}
            chatClose={chatClose}
          />
        </Modal>
      ) : null}
    </React.Fragment>
  );
}

export default AudioChat;

const ChatWrapper = styled.div`
  width: 640px;
  height: 396px;
  padding: 44px 0px;
  box-sizing: border-box;
  background: #ffffff;
  box-shadow: 0px 0px 20px rgba(172, 151, 197, 0.25);
  border-radius: 20px;
  @media ${({ theme }) => theme.device.mobile} {
    width: 330px;
    height: 203px;
    padding-top: 23px;
  }
`;

const ChatContainer = styled.div`
  width: 598px;
  height: 260px;
  margin: 0px auto;
  padding: 16px;
  box-sizing: border-box;
  background: #f8f8f8;
  border-radius: 10px;
  @media ${({ theme }) => theme.device.mobile} {
    padding: 11px;
    width: 306px;
    height: 134px;
  }
`;

const TapeBox = styled.div`
  width: 374px;
  height: 106px;
  padding: 14px;
  margin: 0px auto;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px 0px 20px rgba(172, 151, 197, 0.25);
  border-radius: 200px;
  background: #ffffff;
  @media ${({ theme }) => theme.device.mobile} {
    padding: 7px;
    width: 194px;
    height: 58px;
  }
`;

const UserBox = styled.div`
  width: 175px;
  height: 94px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px;
  margin: 14px 48px;
  @media ${({ theme }) => theme.device.mobile} {
    display: none;
  }
`;

const MobileUserBox = styled.div`
  width: 72px;
  height: 60px;
  margin: 7px 30px;
  display: none;
  flex-direction: column;
  align-items: center;

  @media ${({ theme }) => theme.device.mobile} {
    display: flex;
  }
`;

const InfoBtn = styled.div`
  width: 62px;
  height: 22px;
  margin: 5px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  background: #e6e6e6;
  border-radius: 4px;
`;

const TagInfo = styled.div`
  width: 160px;
  padding: 15px;
  margin-top: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: absolute;
  top: 320px;
  background-color: #fff;
  border-radius: 10px;
`;

const Ellipsis = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
`;

const TagBox = styled.div`
  width: 175px;
  margin-top: 14px;
  display: flex;
  flex-direction: column;
`;

const TagLine = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 175px;
  height: 26px;
  margin-bottom: 2px;
`;

const Tag = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 26px;
  background: #e6e6e6;
  border-radius: 4px;
  margin: 0px 2px;
`;

const BottomBox = styled.div`
  height: 40px;
  margin: 17px auto;
  padding: 0px 113px;
  display: flex;
  justify-content: center;
  align-items: center;
  @media ${({ theme }) => theme.device.mobile} {
    padding: 0px;
    margin: 5px;
  }
`;

const VoiceBtnBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 44px;
  margin-right: 10px;
  padding: 10px;
  @media ${({ theme }) => theme.device.mobile} {
    heigh: 36px;
  }
`;

const VoiceBtn = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 20px 10px;
  margin: 0px 10px;
  box-sizing: border-box;
  width: 40px;
  height: 40px;
  cursor: pointer;
  background: #fafafa;
  border-radius: 40px;
  box-shadow: 0px 0px 20px rgba(172, 151, 197, 0.25);
  @media ${({ theme }) => theme.device.mobile} {
    width: 32px;
    height: 32px;
    padding: 5px 10px;
  }
`;
