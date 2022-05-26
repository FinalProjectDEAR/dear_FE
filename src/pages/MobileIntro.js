import React from "react";

import styled from "styled-components";

import info1 from "../assets/intro/s-info-1m.png";
import info2 from "../assets/intro/s-info-2m.png";
import info3 from "../assets/intro/s-info-3m.png";
import info4 from "../assets/intro/s-info-4m.png";
import info5 from "../assets/intro/s-info-5m.png";

function MobileIntro() {
  return (
    <React.Fragment>
      <Wrapper>
        <ContentBox>
          <img
            src={info1}
            alt="mobileIntro"
            style={{ width: "240px", marginTop: "240px", marginBottom: "90px" }}
          />
          <img
            src={info2}
            alt="mobileIntro"
            style={{ width: "328px", margin: "90px 0px" }}
          />
          <img
            src={info3}
            alt="mobileIntro"
            style={{ width: "328px", marginTop: "90px 0px" }}
          />
          <img
            src={info4}
            alt="mobileIntro"
            style={{ width: "328px", marginTop: "90px 0px" }}
          />
          <img
            src={info5}
            alt="mobileIntro"
            style={{
              width: "328px",
              marginTop: "90px 0px",
              marginBottom: "135px",
            }}
          />
        </ContentBox>
      </Wrapper>
    </React.Fragment>
  );
}

export default MobileIntro;

const Wrapper = styled.div`
  width: 360px;
  padding: 0px 45px;
  box-sizing: border-box;
  display: none;
  justify-content: center;
  align-items: center;
  @media ${({ theme }) => theme.device.mobile} {
    display: flex;
  }
`;

const ContentBox = styled.div`
  width: 328px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Image = styled.div`
  width: 328px;
  margin: 90px 0px;
  background-image: url("${(props) => props.src}");
  background-size: cover;
`;
