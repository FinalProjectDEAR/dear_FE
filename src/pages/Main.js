import React from "react";
import { useSelector } from "react-redux";
import { Text } from "../elements";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
//페이지
import UserRanking from "../components/UserRanking";
import BestPost from "../components/BestPost";
import Review from "../components/Review";

//슬라이드관련
import Slide from "../components/Slide";
import SwiperPro from "../components/Swiper";

//assets
import tapeD from "../assets/main/tapeD.png";
import tapeW from "../assets/main/tapeW.png";

function Main() {
  const history = useHistory();
  const data = useSelector((state) => state);
  const [checkBox, setCheckBox] = React.useState(false);

  const startReq = () => {
    if (checkBox !== true) {
      window.alert("이용약관에 동의해주세요.");
      return;
    }
    history.push("/startReq");
  };

  const startRes = () => {
    if (checkBox !== true) {
      window.alert("이용약관에 동의해주세요.");
      return;
    }
    history.push("/startRes");
  };

  return (
    <React.Fragment>
      <MainWrap>
        <Text batang color="#2E2A32" weight="500" size="26px">
          오늘은 연애 고민이 있는 친구를 위해
        </Text>
        <Text batang color="#2E2A32" weight="500" size="26px">
          다정한 리스너가 되어주는건 어떨까요?
        </Text>
      </MainWrap>
      <InputWrap>
        <input
          type="checkbox"
          name="completed"
          id="check"
          onChange={() => {
            setCheckBox(!checkBox);
          }}
        />
        <Text weight="300" size="14px" margin="10px">
          따듯하고 부드러운 언행을 사용하여 상대방과 진솔한 대화를 나누는 것에
          동의합니다.
        </Text>
      </InputWrap>
      <BtnWrap>
        <Btn checkBox={checkBox} onClick={startReq}>
          <Text
            batang
            weight="300"
            size="14px"
            margin="5px"
            cursor="pointer"
            color={checkBox ? "#fff" : "#61586A"}
          >
            고민 들어줄 친구 찾기
          </Text>
          <LineBox>
            {!checkBox ? (
              <img
                src={tapeD}
                style={{ width: "20px", height: "16px" }}
                alt="tape"
              />
            ) : (
              <img
                src={tapeW}
                style={{ width: "20px", height: "16px" }}
                alt="tape"
              />
            )}
            <Text
              margin="0px 5px"
              weigh="300"
              size="14px"
              color={checkBox ? "#fff" : "#61586A"}
              cursor="pointer"
            >
              -1
            </Text>
          </LineBox>
        </Btn>
        <Btn checkBox={checkBox} onClick={startRes}>
          <Text
            batang
            weight="300"
            size="14px"
            margin="5px"
            cursor="pointer"
            color={checkBox ? "#fff" : "#61586A"}
          >
            친구의 고민 들어주기
          </Text>
          <LineBox>
            {!checkBox ? (
              <img
                src={tapeD}
                style={{ width: "20px", height: "16px" }}
                alt="tape"
              />
            ) : (
              <img
                src={tapeW}
                style={{ width: "20px", height: "16px" }}
                alt="tape"
              />
            )}
            <Text
              margin="0px 5px"
              weigh="300"
              size="14px"
              color={checkBox ? "#fff" : "#61586A"}
              cursor="pointer"
            >
              +1
            </Text>
          </LineBox>
        </Btn>
      </BtnWrap>
      <div
        style={{
          maxWidth: "1190px",
          width: "100%",
          border: "1px solid red",
          margin: "auto",
        }}
      >
        <h1>간략한소개</h1>
      </div>
      <div
        style={{
          backgroundColor: "pink",
          maxWidth: "1190px",
          width: "100%",
          margin: "auto",
        }}
      >
        UserRanking
      </div>
      <div style={{ maxWidth: "1190px", width: "100%", margin: "auto" }}>
        <SwiperPro />
      </div>

      <div
        style={{
          backgroundColor: "pink",
          maxWidth: "1190px",
          width: "100%",
          margin: "auto",
        }}
      >
        Review
      </div>
      <div style={{ maxWidth: "1190px", width: "100%", margin: "auto" }}>
        <Slide />
      </div>
      <Wrap>
        <div
          style={{
            backgroundColor: "pink",
            maxWidth: "1190px",
            width: "100%",
            margin: "auto",
          }}
        >
          BestPost
        </div>

        <BestPost />
      </Wrap>
    </React.Fragment>
  );
}
const MainWrap = styled.div`
  max-width: 426px;
  width: 100%;
  height: 84px;
  margin: 80px auto 50px;
  /* background-color: pink; */
  box-sizing: border-box;
`;
const InputWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 556px;
  height: 24px;
  margin: 10px auto;
`;

const LineBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BtnWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px auto 420px auto;
  width: 100%;
  max-width: 790px;
  box-sizing: border-box;
  /* border: 1px solid red; */
`;
const Btn = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 22px 0px 22px;
  margin: 0px 10px;
  width: 240px;
  height: 102px;
  border: none;
  cursor: pointer;
  background-color: ${(props) => (props.checkBox ? "#61586A" : "#fff")};
  box-shadow: 0px 0px 20px rgba(172, 151, 197, 0.25);
  border-radius: 20px;
`;

const Wrap = styled.div`
  margin: 20px auto 20px auto;
  background-color: #ddd;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: flex-start;
  gap: 20px;
  max-width: 1190px;
  width: 100%;
`;

export default Main;
