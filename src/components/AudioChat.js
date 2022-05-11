import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { history } from "../redux/configureStore";
import { actionCreators as chatActions } from "../redux/modules/chat";
import { OpenVidu } from "openvidu-browser";

import styled from "styled-components";
import { Text, Button, ColorBadge } from "../elements";
import UserVideoComponent from "../components/UserVideoComponent";
import OpenViduAudioComponent from "../components/OvVideo";

function AudioChat(props) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.chat.roomAuthInfo.token);
  const sessionId = useSelector((state) => state.chat.roomAuthInfo.sessionId);
  const role = useSelector((state) => state.chat.roomAuthInfo.role);
  console.log("역할", role);
  const nickname = localStorage.getItem("nickname");

  const chatInfo = useSelector((state) => state.chat.chatInfo);
  const fileList = useSelector((state) => state.chat.chatInfo.fileList);

  const [mySessionId, setMySessionId] = React.useState("");
  const [session, setSession] = React.useState(undefined);
  const [mainStreamManager, setMainStreamManager] = React.useState(undefined);
  const [publisher, setPublisher] = React.useState(undefined);
  const [subscribers, setSubscribers] = React.useState([]);
  const [isSub, setIsSub] = React.useState(false);

  // //추가 willunmount
  // const onbeforeunload = (event) => {
  //   //크롬에서는 표준에 따른 기본동작을 방지하기 위해 아래 두게 설정
  //   event.preventDefault();
  //   event.returnValue = "";
  //   leaveSession();
  // };

  // React.useEffect(() => {
  //   window.addEventListener("beforeunload", onbeforeunload);
  //   const connectSession = () => {
  //     const OV = new OpenVidu();
  //     console.log("커넥트 시도");

  //     var mySession = OV.initSession();

  //     mySession.on("streamCreated", (event) => {
  //       var subscriber = mySession.subscribe(event.stream, undefined);
  //       var subscriberList = subscribers;
  //       subscriberList.push(subscriber);
  //       console.log("구독자 리스트", subscriberList);
  //       setSubscribers(subscriberList);

  //       if (subscribers.length > 0) {
  //         console.log(subscribers);
  //         let now = new Date();
  //         console.log("매칭됐어!");
  //         console.log("구독자 생길때 시간 ", now);
  //       } else {
  //         console.log("매칭중이야");
  //         setIsSub(false);
  //         console.log(isSub);
  //       }
  //     });

  //     mySession
  //       .connect(token, { clientData: nickname })
  //       .then(async () => {
  //         var devices = await OV.getDevices();
  //         console.log(devices);
  //         var videoDevices = devices.filter(
  //           (device) => device.kind === "videoinput"
  //         );

  //         let publisher = OV.initPublisher(undefined, {
  //           audioSource: undefined,
  //           videoSource: videoDevices[0].deviceId,
  //           publishAudio: true,
  //           publishVideo: true,
  //           resolution: "640x480",
  //           frameRate: 30,
  //           insertMode: "APPEND",
  //           mirror: false,
  //         });

  //         mySession.publish(publisher);
  //         setMainStreamManager(publisher);
  //         setPublisher(publisher);
  //       })
  //       .catch((err) => {
  //         console.log("커넥팅 실패", err.code, err.message);
  //       });
  //   };

  //   connectSession();

  //   return () => {
  //     window.removeEventListener("beforeunload", onbeforeunload);
  //   };
  // }, []);

  const leaveSession = () => {
    const mySession = session;
    if (mySession) {
      mySession.disconnect();
    }
    const OV = null;
    setSession(undefined);
    setSubscribers([]);
    setMySessionId("");
    setPublisher(undefined);
    history.replace("/startreq");
  };

  return (
    <React.Fragment>
      {/* {role === "request" || subscribers.length > 0 ? ( */}
      <ChatWrapper>
        <ChatContainer>
          {/* {role === "request" && publisher !== undefined ? ( */}
          <TapeBox>
            <ColorBadge
              border="4px solid #948A9E"
              bg="#fff"
              size="77"
              position="relative"
              margin="0px 20px"
              streamManager={mainStreamManager}
            >
              <ColorBadge bg="#D62020" size="68" position="absolute" />
            </ColorBadge>
            <Timer>
              <Text weight="700" size="20px" margin="5px">
                9:40
              </Text>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <ColorBadge size="6" bg="#948A9E" margin="0px 2px" />
                <ColorBadge size="6" bg="#948A9E" margin="0px 2px" />
                <ColorBadge size="6" bg="#948A9E" margin="0px 2px" />
                <ColorBadge size="6" bg="#948A9E" margin="0px 2px" />
                <ColorBadge size="6" bg="#948A9E" margin="0px 2px" />
              </div>
            </Timer>
            <ColorBadge
              border="4px solid #fff"
              bg="#fff"
              size="77"
              position="relative"
              margin="0px 20px"
              streamManager={subscribers[0]}
            >
              <ColorBadge bg="#FFD05B" size="68" position="absolute" />
            </ColorBadge>
          </TapeBox>
          {/* ) : null} */}

          {/* {role === "response" && publisher !== undefined ? (
            <TapeBox>
              <ColorBadge
                border="4px solid #948A9E"
                bg="#fff"
                size="77"
                position="relative"
                margin="0px 20px"
                streamManager={subscribers[0]}
              >
                <ColorBadge bg="#D62020" size="68" position="absolute" />
              </ColorBadge>
              <Timer>
                <Text weight="700" size="20px" margin="5px">
                  9:40
                </Text>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <ColorBadge size="6" bg="#948A9E" margin="0px 2px" />
                  <ColorBadge size="6" bg="#948A9E" margin="0px 2px" />
                  <ColorBadge size="6" bg="#948A9E" margin="0px 2px" />
                  <ColorBadge size="6" bg="#948A9E" margin="0px 2px" />
                  <ColorBadge size="6" bg="#948A9E" margin="0px 2px" />
                </div>
              </Timer>
              <ColorBadge
                border="4px solid #fff"
                bg="#fff"
                size="77"
                position="relative"
                margin="0px 20px"
                streamManager={mainStreamManager}
              >
                <ColorBadge bg="#FFD05B" size="68" position="absolute" />
              </ColorBadge>
            </TapeBox>
          ) : null} */}

          <div style={{ display: "flex", justifyContent: "center" }}>
            <UserBox>
              {/* <Text>{requestName}</Text> */}
              <Text weight="500" size="16px">
                비둘기구구절절구구
              </Text>
              <TagBox>
                {/* {tagList.map((tag,idx)=>{
                return(
                  <Tag key={idx}>
                  <Text margin="0px" weight="300" size="12px">
                    {tag}
                  </Text>
                </Tag>
                )
              })} */}
                <Tag>
                  <Text margin="0px" weight="300" size="12px">
                    20대 중반
                  </Text>
                </Tag>
                <Tag>
                  <Text margin="0px" weight="300" size="12px">
                    커플
                  </Text>
                </Tag>
                <Tag>
                  <Text margin="0px" weight="300" size="12px">
                    본인이 연상
                  </Text>
                </Tag>
                <Tag>
                  <Text margin="0px" weight="300" size="12px">
                    6개월 미만
                  </Text>
                </Tag>
              </TagBox>
            </UserBox>
            <UserBox>
              {/* <Text>{requestName}</Text> */}
              <Text weight="500" size="16px">
                내맘이야
              </Text>
              <TagBox>
                {/* {tagList.map((tag,idx)=>{
                return(
                  <Tag key={idx}>
                  <Text margin="0px" weight="300" size="12px">
                    {tag}
                  </Text>
                </Tag>
                )
              })} */}
                <Tag>
                  <Text margin="0px" weight="300" size="12px">
                    20대 후반
                  </Text>
                </Tag>
                <Tag>
                  <Text margin="0px" weight="300" size="12px">
                    솔로
                  </Text>
                </Tag>
              </TagBox>
            </UserBox>
          </div>
        </ChatContainer>
        <BottomBox>
          <VoiceBtnBox></VoiceBtnBox>
          <Button bg="#7A37BE" margin="0px 10px">
            ON AIR
          </Button>
          <Button bg="#EEE7F5" color="#7A37BE" margin="0px 10px">
            상담 연장하기
          </Button>
          <Button
            bg="#F6EAED"
            color="#BE3757"
            _onClick={leaveSession}
            margin="0px 10px"
          >
            상담 종료하기
          </Button>
        </BottomBox>
      </ChatWrapper>
      {/* ) : (
        <ChatWrapper>
          <ChatContainer>
            <TitleBox>
              <Text>로딩중!!!</Text>
            </TitleBox>
          </ChatContainer>
        </ChatWrapper>
      )} */}
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

const Timer = styled.div`
  width: 110px;
  height: 44px;
  background: #f8f8f8;
  border-radius: 4px;
`;

const UserBox = styled.div`
  width: 151px;
  height: 94px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px;
  margin: 10px 30px;
`;

const TagBox = styled.div`
  width: 151px;
  display: grid;
  margin: 5px 0px;
  grid-template-columns: repeat(2, minmax(25%, auto));
  grid-row: 2;
`;

const Tag = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 3px;
  background: #e6e6e6;
  border-radius: 4px;
`;

const BottomBox = styled.div`
  height: 40px;
  margin: 30px auto;
  padding: 0px 113px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const VoiceBtnBox = styled.div`
  width: 100px;
  height: 44px;
`;
