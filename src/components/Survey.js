import React from "react";

import styled from "styled-components";
import { CgClose } from "react-icons/cg";

import { ReactComponent as SurveyThumb } from "../assets/infoModal/survey.svg";

function Survey({ close }) {
  return (
    <React.Fragment>
      <Wrapper>
        <CgClose
          className="close"
          size={20}
          onClick={close}
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
