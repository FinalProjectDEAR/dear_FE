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
import ResReview from "../pages/ResReview";
import ReqReview from "../pages/ReqReview";

function AudioChat() {
  const dispatch = useDispatch();

  const nickname = localStorage.getItem("nickname");
  const token = useSelector((state) => state.chat.roomAuthInfo.token);
  const sessionId = useSelector((state) => state.chat.roomAuthInfo.sessionId);
  const role = useSelector((state) => state.chat.roomAuthInfo.role);
  console.log("역할", role);

  const chatInfo = useSelector((state) => state.chat.chatInfo);

  const [mySessionId, setMySessionId] = React.useState("");
  const [session, setSession] = React.useState(undefined);
  const [mainStreamManager, setMainStreamManager] = React.useState(undefined);
  const [publisher, setPublisher] = React.useState(undefined);
  const [subscribers, setSubscribers] = React.useState([]);
  const [isSub, setIsSub] = React.useState(false);
  const [targetTime, setTargetTime] = React.useState("");
  const [isConnect, setIsConnect] = React.useState(false);

  //모달
  const [modalOpen, setModalOpen] = React.useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  // 오디오채팅 (오픈비듀)
  const onbeforeunload = (event) => {
    //크롬에서는 표준에 따른 기본동작을 방지하기 위해 아래 두게 설정
    event.preventDefault();
    event.returnValue = "";
  };

  const sendSignal = () => {
    session
      .signal({
        data: "true", // Any string (optional)
        to: [], // Array of Connection objects (optional. Broadcast to everyone if empty)
        type: "chat", // The type of message (optional)
      })
      .then(() => {
        console.log("메시지 전송 성공");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  React.useEffect(() => {
    window.addEventListener("beforeunload", onbeforeunload);
    const connectSession = () => {
      const OV = new OpenVidu();
      console.log("커넥트 시도");

      var mySession = OV.initSession();
      setSession(mySession);

      mySession.on("streamCreated", (event) => {
        var subscriber = mySession.subscribe(event.stream, undefined);
        var subscriberList = subscribers;
        subscriberList.push(subscriber);
        console.log("구독자 리스트", subscriberList);
        setSubscribers([...subscribers, ...subscriberList]);

        let date = new Date();
        let target = date.setMinutes(date.getMinutes() + 10);
        setTargetTime(target);
        setIsConnect(true);
        console.log("매칭됐어! 타겟시간: ", targetTime);
        dispatch(chatActions.getChatInfoDB(sessionId));
      });

      mySession.on("signal:chat", (event) => {
        console.log("메시지 수신", event.data); // Message
        console.log(event.from); // Connection object of the sender
        console.log(event.type); // The type of message ("my-chat")
      });

      mySession
        .connect(token, { clientData: nickname })
        .then(async () => {
          var devices = await OV.getDevices();
          console.log(devices);
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

  const leaveSession = () => {
    console.log("종료 시도한다?");
    // const mySession = session;

    // if (mySession) {
    //   mySession.disconnect();
    // }
    session.disconnect();

    setSession(undefined);
    setSubscribers([]);
    setMySessionId("");
    setPublisher(undefined);

    const closeTime = new Date();

    if (subscribers.length !== 0) {
      dispatch(chatActions.closeChatDB(sessionId, dateFormat(closeTime)));
    } else {
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
                <Timer targetTime={targetTime} leaveSession={leaveSession} />
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
                <Timer targetTime={targetTime} />
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
                    {chatInfo.reqAge && (
                      <Tag>
                        <Text sub7 margin="6px 8px">
                          {chatInfo.reqAge}
                        </Text>
                      </Tag>
                    )}
                    {chatInfo.isLove && (
                      <Tag>
                        <Text sub7 margin="6px 8px">
                          {chatInfo.reqLoveType}
                        </Text>
                      </Tag>
                    )}
                  </TagLine>
                  <TagLine>
                    {chatInfo.reqLoveType && (
                      <Tag>
                        <Text sub7 margin="6px 8px">
                          {chatInfo.reqLoveType}
                        </Text>
                      </Tag>
                    )}
                    {chatInfo.reqLovePeriod && (
                      <Tag>
                        <Text sub7 margin="6px 8px">
                          {chatInfo.reqLovePeriod}
                        </Text>
                      </Tag>
                    )}
                  </TagLine>
                </TagBox>
              </UserBox>
              <UserBox>
                <Text weight="500" size="16px">
                  {chatInfo.resNickname}
                </Text>
                {/* <Text weight="500" size="16px">
                  내맘이야
                </Text> */}
                <TagBox>
                  <TagLine>
                    {chatInfo.reqAge && (
                      <Tag>
                        <Text sub7 margin="6px 8px">
                          {chatInfo.reqAge}
                        </Text>
                      </Tag>
                    )}
                    {chatInfo.isLove && (
                      <Tag>
                        <Text sub7 margin="6px 8px">
                          {chatInfo.reqLoveType}
                        </Text>
                      </Tag>
                    )}
                  </TagLine>
                  <TagLine>
                    {chatInfo.reqLoveType && (
                      <Tag>
                        <Text sub7 margin="6px 8px">
                          {chatInfo.reqLoveType}
                        </Text>
                      </Tag>
                    )}
                    {chatInfo.reqLovePeriod && (
                      <Tag>
                        <Text sub7 margin="6px 8px">
                          {chatInfo.reqLovePeriod}
                        </Text>
                      </Tag>
                    )}
                  </TagLine>
                </TagBox>
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
      {role === "response" && subscribers.length === 0 ? <Loading /> : null}
      {modalOpen && (
        <Modal>
          <ChatClose
            closeModal={closeModal}
            leaveSession={leaveSession}
            sendSignal={sendSignal}
          />
        </Modal>
      )}
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
  width: 151px;
  height: 94px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px;
  margin: 14px 63px;
`;

const TagBox = styled.div`
  width: 151px;
  margin-top: 14px;
  display: flex;
  flex-direction: column;
`;

const TagLine = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 151px;
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
