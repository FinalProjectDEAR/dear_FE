import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { history } from "../redux/configureStore";
import { actionCreators as chatActions } from "../redux/modules/chat";
import { OpenVidu } from "openvidu-browser";

import styled from "styled-components";
import { Text, Button } from "../elements";
import example from "../assets/imageex.png";
import AudioChat from "../components/AudioChat";

function AudioRoom(props) {
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

  return (
    <React.Fragment>
      <ChatWrapper>
        <ChatContainer>
          <LeftBox>
            <TitleBox>
              {/* <Text>{chatInfo.category}</Text> */}
              {/* <Text>{chatInfo.title}</Text> */}
              <Text batang weight="500" size="16px" color="#BB9ED8">
                연애
              </Text>
              <Text margin="0px 10px" batang weight="500" size="16px">
                여자친구와 연락스타일이 안맞아요.
              </Text>
            </TitleBox>
            <AudioChat />
          </LeftBox>
          <ImageBox>
            {/* {fileList.map((file, idx) => {
              return <Image key={idx} src={file} />;
            })} */}
            <Image src={example} />
            <Image src={example} />
            <Image src={example} />
          </ImageBox>
        </ChatContainer>
      </ChatWrapper>
    </React.Fragment>
  );
}

export default AudioRoom;

const ChatWrapper = styled.div`
  width: 1130px;
  height: 860px;
  margin: auto;
`;

const ChatContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const LeftBox = styled.div`
  width: 640px;
  margin: 0px 10px;
`;

const TitleBox = styled.div`
  width: 640px;
  height: 78px;
  margin: 10px 0px;
  padding: 30px 40px;
  box-sizing: border-box;
  display: flex;
  justify-content: flex-start;
  background-color: #fff;
  box-shadow: 0px 0px 20px rgba(172, 151, 197, 0.25);
  border-radius: 20px;
`;

const AudioBox = styled.div`
  width: 640px;
  height: 396px;
  margin: 20px 10px;
  background-color: #fff;
  box-shadow: 0px 0px 20px rgba(172, 151, 197, 0.25);
  border-radius: 20px;
`;

const ImageBox = styled.div`
  width: 370px;
  height: 490px;
  margin: 0px 20px;
  padding: 10px;
  background: #fafafa;
  box-shadow: 0px 0px 20px rgba(172, 151, 197, 0.25);
  border-radius: 20px;
  box-sizing: border-box;
  overflow: auto;
  &::-webkit-scrollbar {
    width: 10px;
    height: 8px;
    border-radius: 15px;
    background: rgba(255, 255, 255, 0.4);
  }
  &::-webkit-scrollbar-thumb {
    background: #eee7f5;
    border-radius: 6px;
  }
`;

const Image = styled.div`
  width: 330px;
  height: 500px;
  margin: 10px auto;
  border-radius: 3px;
  background-image: url("${(props) => props.src}");
  background-size: cover;
  /* &:hover {
    transition: 0.4s;
    transform: scale(4.9);
    -webkit-transform: scale(4.9);
    -moz-transform: scale(4.9);
    -ms-transform: scale(4.9);
    -o-transform: scale(4.9);
  } */
`;

const TagBox = styled.div`
  align-items: center;
  display: flex;
`;

const Tag = styled.div`
  width: 92px;
  height: 30px;
  justify-content: center;
  align-items: center;
  margin: 0px 5px;
  background-color: #eee7f5; ;
`;
