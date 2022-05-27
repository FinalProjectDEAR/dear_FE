import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { history } from "../redux/configureStore";

import styled from "styled-components";
import errorImg from "../assets/notFound/error_img.png";
import errorTxt from "../assets/notFound/error_txt.png";

import { Text, TextB, Button } from "../elements";

function NotFound() {
  return (
    <React.Fragment>
      <Wrapper>
        <AlertBox>
          <img
            src={errorTxt}
            alt="errorTxt"
            style={{ width: "283px", margin: "20px" }}
          />
          <Text
            sub3
            color="#6422A7"
            deco="underLine"
            cursor="pointer"
            _onClick={() => {
              history.replace("/");
            }}
          >
            메인페이지로 돌아가기
          </Text>
          <img
            src={errorImg}
            alt="errorImg"
            style={{ width: "224px", margin: "20px" }}
          />
        </AlertBox>
      </Wrapper>
    </React.Fragment>
  );
}

export default NotFound;

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
`;

const AlertBox = styled.div`
  width: 300px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
