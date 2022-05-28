import React from "react";

import styled from "styled-components";
import { CgClose } from "react-icons/cg";

import { useCookies } from "react-cookie";
import moment from "moment";

import { ReactComponent as SurveyThumb } from "../assets/infoModal/survey.svg";

function Survey({ close }) {
  const COOKIE_KEY = "notAgain";
  const [cookies, setCookie] = useCookies([COOKIE_KEY]);

  const hiddenModal = () => {
    const decade = moment(); // 일단 moment 로 시간변수를 만들어주고
    decade.add(1, "d"); // 1년뒤로 값을 add 해준다.
    setCookie(COOKIE_KEY, "true", {
      // 쿠키를 셋해준다.
      path: "/", // path를 지정해주고
      expires: decade.toDate(), // 여기서 날짜를 지정해준다
    });
    close();
  };

  return (
    <React.Fragment>
      <Wrapper>
        <CgClose
          className="close"
          size={20}
          onClick={hiddenModal}
          style={{
            color: "#948A9E",
            position: "absolute",
            right: "30px",
            top: "30px",
            cursor: "pointer",
          }}
        />
        <SurveyThumb
          style={{ cursor: "pointer" }}
          onClick={() => {
            window.open("https://respond.listovey.com/rs/EctfU25gC");
          }}
        />
      </Wrapper>
    </React.Fragment>
  );
}

export default Survey;

const Wrapper = styled.div`
  position: relative;
  width: 550px;
  height: 600px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border-radius: 20px;
  @media ${({ theme }) => theme.device.mobile} {
    width: 320px;
    height: 520px;
  }
`;
