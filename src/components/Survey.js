import React from "react";
//스타일
import styled from "styled-components";
import { CgClose } from "react-icons/cg";
import { ReactComponent as SurveyThumb } from "../assets/infoModal/survey.svg";

import { useCookies } from "react-cookie";
import dayjs from "dayjs";

import eventResult from "../assets/infoModal/eventResult.png";

function Survey({ close }) {
  const COOKIE_KEY = "notAgain";
  const [cookies, setCookie] = useCookies([COOKIE_KEY]);

  const hiddenModal = () => {
    const date = dayjs(); // 일단 dayjs 로 시간변수를 만들어주고
    const modalExpire = date.add(1, "day"); // 하루 뒤로 값을 add 해준다.
    setCookie(COOKIE_KEY, "true", {
      // 쿠키를 셋해준다.
      path: "/", // path를 지정해주고
      expires: modalExpire.toDate(), // 여기서 날짜를 지정해준다
    });
    close();
  };

  return (
    <React.Fragment>
      <img
        style={{ height: "600px", position: "relative" }}
        src={eventResult}
        alt="eventresult"
      />
      <CgClose
        className="close"
        size={20}
        onClick={hiddenModal}
        style={{
          color: "#948A9E",
          position: "absolute",
          right: "125px",
          top: "35px",
          cursor: "pointer",
        }}
      />
      {/* <SurveyThumb
          style={{ cursor: "pointer" }}
          onClick={() => {
            window.open("https://respond.listovey.com/rs/EctfU25gC");
          }}
        /> */}
    </React.Fragment>
  );
}

export default Survey;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 550px;
  height: 600px;
  box-sizing: border-box;
  background-color: #fff;
  border-radius: 20px;
  @media ${({ theme }) => theme.device.mobile} {
    width: 320px;
    height: 520px;
  }
`;
