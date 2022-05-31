import React from "react";
//스타일
import styled from "styled-components";
import { useMediaQuery } from "react-responsive";
import { Text } from "../elements";
import { CgClose } from "react-icons/cg";
import { ReactComponent as ChatInfo } from "../assets/infoModal/ChatIntro.svg";
import { ReactComponent as MobileChatInfo } from "../assets/infoModal/ChatIntroMobile.svg";

function ChatIntro({ closeChatInfo }) {
  const setCheckBox = () => {
    console.log("오늘하루 표시 그만");
  };

  const Mobile = useMediaQuery({
    query: "(max-width:425px)",
  });
  return (
    <React.Fragment>
      <Wrapper>
        <CgClose
          className="close"
          size={20}
          onClick={closeChatInfo}
          style={{
            color: "#948A9E",
            position: "absolute",
            right: "5%",
            top: "3%",
            cursor: "pointer",
          }}
        />
        {Mobile ? <MobileChatInfo /> : <ChatInfo />}

        {/* <InputWrap>
          <input
            type="checkbox"
            name="completed"
            id="check"
            onChange={setCheckBox}
          />
          <Text sub6 margin="10px" textAlign="left">
            오늘 하루 그만 보기
          </Text>
        </InputWrap> */}
      </Wrapper>
    </React.Fragment>
  );
}

export default ChatIntro;

const Wrapper = styled.div`
  position: relative;
  width: 550px;
  height: 700px;
  padding-top: 74px;
  padding-bottom: 64px;
  box-sizing: border-box;
  ${({ theme }) => theme.common.flexCenter};
  background-color: #fff;
  border-radius: 20px;
  @media ${({ theme }) => theme.device.mobile} {
    width: 320px;
    height: 520px;
    padding-top: 56px;
    padding-bottom: 66px;
    border-radius: 10px;
  }
`;

const Image = styled.div`
  width: 550px;
  height: 404px;
  box-sizing: border-box;
  background-image: url("${(props) => props.src}");
  background-size: cover;
  @media ${({ theme }) => theme.device.mobile} {
    display: none;
  }
`;

const ImageM = styled.div`
  display: none;
  width: 329px;
  height: 398px;
  box-sizing: border-box;
  background-image: url("${(props) => props.src}");
  background-size: cover;
  @media ${({ theme }) => theme.device.mobile} {
    display: block;
  }
`;

const InputWrap = styled.div`
  ${({ theme }) => theme.common.flexCenter};
  word-break: keep-all;
  width: 556px;
  height: 24px;
  margin: 10px auto;
  @media ${({ theme }) => theme.device.mobile} {
    width: 262px;
    height: 32px;
  }
`;
