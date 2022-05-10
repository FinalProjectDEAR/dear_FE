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

function Main() {
  const history = useHistory();
  const data = useSelector((state) => state);
  const [checkBox, setCheckBox] = React.useState(false);

  return (
    <React.Fragment>
      <MainWrap>
        <Text batang color="#2E2A32">
          오늘은 연애 고민이 있는 친구를 위해
        </Text>
        <Text batang color="#2E2A32">
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
        <SpanSt>
          상대방에게 불쾌함을 주는 행위를 하였을 시, 이용에 제한을 받을 수
          있음에 동의합니다 .
        </SpanSt>
      </InputWrap>
      <BtnWrap>
        <Btn
          checkBox={checkBox}
          disabled={checkBox === false}
          onClick={() => {
            history.push("/startReq");
          }}
        >
          고민 들어줄 친구 찾기
        </Btn>
        <Btn
          checkBox={checkBox}
          disabled={checkBox === false}
          onClick={() => {
            history.push("/startRes");
          }}
        >
          친구의 고민 들어주기
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
  width: 556px;
  height: 24px;
  margin: 10px auto;
`;
const BtnWrap = styled.div`
  max-width: 790px;
  width: 100%;
  height: 311px;
  margin: auto;
  box-sizing: border-box;
  /* border: 1px solid red; */
`;
const Btn = styled.button`
  max-width: 278px;
  width: 100%;
  height: 102px;
  cursor: pointer;
  border: 1px solid #61586a;
  border-radius: 30px;
  background-color: ${(props) => (props.checkBox ? "#fff" : "#61586A")};
  color: ${(props) => (props.checkBox ? "#61586A" : "#fff")};
  margin: 5px;
`;

const SpanSt = styled.span`
  color: #6c757d;
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
