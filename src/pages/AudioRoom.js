import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { history } from "../redux/configureStore";
import { useParams } from "react-router-dom";

import { actionCreators as chatActions } from "../redux/modules/chat";

import Header from "../components/Header";
import AudioChat from "../components/AudioChat";

import styled from "styled-components";
import { Text, TextB, Modal } from "../elements";

import example from "../assets/imageex.png";
import empty from "../assets/empty1.png";

function AudioRoom(props) {
  const dispatch = useDispatch();
  const params = useParams();
  const sessionId = params.sessionId;

  const chatInfo = useSelector((state) => state.chat.chatInfo);
  console.log("url", chatInfo.imgUrl);
  React.useEffect(() => {
    dispatch(chatActions.getChatInfoDB(sessionId));
  }, []);

  const [modalOpen, setModalOpen] = React.useState(false);
  const [imgUrl, setImgUrl] = React.useState("");

  //모달
  const openModal = (url) => {
    setModalOpen(true);
    setImgUrl(url);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <React.Fragment>
      <Background>
        <Header />
        <ChatWrapper>
          <ChatContainer>
            <LeftBox>
              <TitleBox>
                <TextB subTitle color="#BB9ED8" margin="0px 10px 0px 0px">
                  {chatInfo.category}
                </TextB>
                <TextB subTitle margin="0px">
                  {chatInfo.reqTitle}
                </TextB>
              </TitleBox>
              <AudioChat chatInfo={chatInfo} />
            </LeftBox>
            {chatInfo.imageUrl?.length === 0 ? (
              <NoImgBox>
                <NoMsg>
                  <img src={empty} alt="noInfo" style={{ width: "30px" }}></img>
                  <Text body3 color="#948A9E">
                    상담에 첨부한 자료가 없어요.
                  </Text>
                </NoMsg>
              </NoImgBox>
            ) : (
              <ImageBox>
                {chatInfo.imageUrl?.map((url, idx) => {
                  return (
                    <Image
                      key={idx}
                      src={url}
                      onClick={() => {
                        openModal(url);
                      }}
                    />
                  );
                })}
              </ImageBox>
            )}

            {modalOpen ? (
              <Modal closeModal={closeModal}>
                <img src={imgUrl} alt="img" style={{ maxHeight: "650px" }} />
              </Modal>
            ) : null}
          </ChatContainer>
        </ChatWrapper>
      </Background>
    </React.Fragment>
  );
}

export default AudioRoom;

const Background = styled.div`
  width: 100%;
  height: 935px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media ${({ theme }) => theme.device.mobile} {
    justify-content: flex-start;
    width: 360px;
    height: 1100px;
  }
`;

const ChatWrapper = styled.div`
  width: 1130px;
  height: 904px;
  margin: 250px auto;
  @media ${({ theme }) => theme.device.mobile} {
    width: 328px;
    margin: 50px 0px;
  }
`;

const ChatContainer = styled.div`
  display: flex;
  justify-content: center;
  @media ${({ theme }) => theme.device.mobile} {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0px;
  }
`;

const LeftBox = styled.div`
  width: 640px;
  margin: 0px 10px;
  @media ${({ theme }) => theme.device.mobile} {
    width: 328px;
    height: 310px;
  }
`;

const TitleBox = styled.div`
  width: 640px;
  height: 78px;
  margin: 10px 0px;
  padding: 30px 40px;
  box-sizing: border-box;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-color: #fff;
  box-shadow: 0px 0px 20px rgba(172, 151, 197, 0.25);
  border-radius: 20px;
  @media ${({ theme }) => theme.device.mobile} {
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    width: 328px;
    height: 82px;
    padding: 0px 20px;
    border-radius: 10px;
  }
`;

const ImageBox = styled.div`
  width: 370px;
  height: 490px;
  margin: 10px 20px;
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

  @media ${({ theme }) => theme.device.mobile} {
    width: 330px;
    height: auto;
  }
`;

const NoImgBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 370px;
  height: 490px;
  margin: 10px 20px;
  padding: 10px;
  background: #fafafa;
  box-shadow: 0px 0px 20px rgba(172, 151, 197, 0.25);
  border-radius: 20px;
  box-sizing: border-box;
  @media ${({ theme }) => theme.device.mobile} {
    width: 330px;
    height: auto;
  }
`;

const NoMsg = styled.div`
  width: 182px;
  height: 75px;
  margin: auto;
`;

const Image = styled.div`
  width: 330px;
  height: 300px;
  margin: 10px auto;
  border-radius: 3px;
  background-image: url("${(props) => props.src}");
  background-size: cover;
  @media ${({ theme }) => theme.device.mobile} {
    width: 300px;
    height: 200px;
  }
`;
