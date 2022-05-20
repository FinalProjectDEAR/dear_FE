import React, { useRef, useIn } from "react";
import { useSelector, useDispatch } from "react-redux";
import { history } from "../redux/configureStore";
import { actionCreators as chatActions } from "../redux/modules/chat";
import { OpenVidu } from "openvidu-browser";

import styled from "styled-components";
import { Text, Button, ColorBadge, Modal } from "../elements";

import highPitch from "../assets/chat/highPitch.png";
import lowPitch from "../assets/chat/lowPitch.png";

//page
import UserAudioComponent from "../components/UserAudioComponent";
import Timer from "../components/Timer";
import Loading from "../pages/Loading";
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
  const [message, setMessage] = React.useState(false);
  const [connectObj, setConnectObj] = React.useState("");
  const [wantMore, setWantMore] = React.useState(false);
  const [thirtySec, setThirtySec] = React.useState(false);
  const [isTimeOver, setIsTimeOver] = React.useState(false);

  console.log("30초 넘었어?", thirtySec);
  console.log(isTimeOver);

  //모달
  const [modalOpen, setModalOpen] = React.useState(false);
  const [noListener, setNoListener] = React.useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const addTimeClose = () => {
    setThirtySec(false);
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
    session
      .signal({
        data: "true", // Any string (optional)
        to: [connectObj], // Array of Connection objects (optional. Broadcast to everyone if empty)
        type: "continue", // The type of message (optional)
      })
      .then(() => {
        setWantMore(true);
        console.log("연장하구싶대");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  //세션 연결 및 커넥트
  React.useEffect(() => {
    window.addEventListener("beforeunload", onbeforeunload);
    const connectSession = () => {
      const OV = new OpenVidu();

      var mySession = OV.initSession();
      setSession(mySession);

      mySession.on("streamCreated", (event) => {
        var subscriber = mySession.subscribe(event.stream, undefined);
        var subscriberList = subscribers;
        subscriberList.push(subscriber);
        setSubscribers([...subscribers, ...subscriberList]);

        let date = new Date();
        let target = date.setMinutes(date.getMinutes() + 1); // 테스트는 1분으로 시작!
        setTargetTime(target);
        setIsConnect(true);
        dispatch(chatActions.getChatInfoDB(sessionId));
      });

      mySession.on("signal:close", (event) => {
        setOtherClose(true);
        console.log("클로즈 수신", event.data); // Message string
      });

      mySession.on("signal:continue", (event) => {
        if (wantMore === true && event.data === "true") {
          let newTime = targetTime.setMinutes(targetTime.getMinutes() + 10);
          console.log(newTime);
          setTargetTime(newTime);
        }
        console.log("연장 수신", event.data); // Message
      });

      //메세지 송신을 위한 connect Obj 생성
      mySession.on("connectionCreated", (event) => {
        setConnectObj(event.connection);
        console.log("커넥션 created", event.connection);
      });

      mySession
        .connect(token, { clientData: nickname })
        .then(async () => {
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

  //매칭 안될 때
  React.useEffect(() => {
    if (!isConnect) {
      console.log("30초센다?");
      setTimeout(waitTimeOut, 30000);
    }
  }, []);

  const noMatch = () => {
    leaveSession();
    informClose();
  };

  const waitTimeOut = () => {
    setNoListener(true);
  };

  // 채팅 종료
  const chatClose = () => {
    sendCloseSignal();
    setTimeout(leaveSession, 2000);
  };

  //세션,커넥션 종료
  const leaveSession = () => {
    console.log("오픈비두 세션종료");

    session.disconnect();

    setSession(undefined);
    setSubscribers([]);
    setMySessionId("");
    setPublisher(undefined);
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

  // 타이머
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
    setThirtySec(true);
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
                  // color="#D62020"
                />
                <Timer
                  targetTime={targetTime}
                  timeOverSet={timeOverSet}
                  askContinue={askContinue}
                />
                <UserAudioComponent
                  streamManager={subscribers[0]}
                  // color="#FFD05B"
                  color={chatInfo.resColor}
                />
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
                    {chatInfo.isLove ? (
                      <Tag>
                        <Text sub7 margin="6px 8px">
                          {chatInfo.reqLoveType}
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
                      {chatInfo.isLove ? (
                        <Tag>
                          <Text sub7 margin="6px 8px">
                            {chatInfo.resLoveType}
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
            </div>
          </ChatContainer>
          <BottomBox>
            <VoiceBtnBox>
              <VoiceBtn>
                <img src={lowPitch} alt="voice1" style={{ width: "20px" }} />
              </VoiceBtn>
              <VoiceBtn>
                <img src={highPitch} alt="voice2" style={{ width: "20px" }} />
              </VoiceBtn>
            </VoiceBtnBox>
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
        <Loading informClose={informClose} leaveSession={leaveSession} />
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

      {thirtySec === true ? (
        <Modal closeModal={closeModal}>
          <AddTime
            sendContinueSignal={sendContinueSignal}
            addTimeClose={addTimeClose}
            leaveSession={leaveSession}
            informClose={informClose}
          />
        </Modal>
      ) : null}
      {isTimeOver === true ? (
        <Modal>
          <TimeOver
            sendContinueSignal={sendContinueSignal}
            timeOverSet={timeOverSet}
            leaveSession={leaveSession}
            informClose={informClose}
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
`;

const ChatContainer = styled.div`
  width: 598px;
  height: 260px;
  margin: 0px auto;
  padding: 16px;
  box-sizing: border-box;
  background: #f8f8f8;
  border-radius: 10px;
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
`;

const UserBox = styled.div`
  width: 175px;
  height: 94px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px;
  margin: 14px 48px;
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
`;

const VoiceBtnBox = styled.div`
  display: flex;
  width: 100px;
  height: 44px;
  margin-right: 10px;
  padding: 10px;
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

  background: #fafafa;
  border-radius: 40px;
  box-shadow: 0px 0px 20px rgba(172, 151, 197, 0.25);
`;
