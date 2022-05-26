import React from "react";

import Header from "../components/Header";
import MobileIntro from "../pages/MobileIntro";

import styled from "styled-components";

import info1 from "../assets/intro/s-info-1.png";
import info2 from "../assets/intro/s-info-2.png";
import info3 from "../assets/intro/s-info-3.png";
import info4 from "../assets/intro/s-info-4.png";
import info5 from "../assets/intro/s-info-5.png";

function Intro() {
  return (
    <React.Fragment>
      <Header />
      <Wrapper>
        <ContentBox>
          <img
            src={info1}
            style={{ width: "292px", marginTop: "120px", marginBottom: "80px" }}
            alt="intro"
          />
          <Image src={info2} />
          <Image src={info3} />
          <Image src={info4} />
          <Image src={info5} />
        </ContentBox>
      </Wrapper>
      <MobileIntro />
    </React.Fragment>
  );
}

export default Intro;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  @media ${({ theme }) => theme.device.mobile} {
    display: none;
  }
`;

const ContentBox = styled.div`
  width: 1032px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Image = styled.div`
  width: 1032px;
  height: 240px;
  margin: 80px 0px;
  box-sizing: border-box;
  background-image: url("${(props) => props.src}");
  background-size: cover;
`;
