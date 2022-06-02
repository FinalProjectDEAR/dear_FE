import React from "react";
//스타일
import styled from "styled-components";
import { ReactComponent as Info1 } from "../assets/intro/s-info-1.svg";
import { ReactComponent as Info2 } from "../assets/intro/s-info-2.svg";
import { ReactComponent as Info3 } from "../assets/intro/s-info-3.svg";
import { ReactComponent as Info4 } from "../assets/intro/s-info-4.svg";
import { ReactComponent as Info5 } from "../assets/intro/s-info-5.svg";
//페이지
import Header from "../components/Header";
import MobileIntro from "../pages/MobileIntro";
import Footer from "../components/Footer";

function Intro() {
  return (
    <React.Fragment>
      <Header />
      <Wrapper>
        <ContentBox>
          <Info1
            style={{ width: "292px", marginTop: "120px", marginBottom: "80px" }}
          />
          <Image>
            <Info2 />
          </Image>
          <Image>
            <Info3 />
          </Image>
          <Image>
            <Info4 />
          </Image>
          <Info5
            style={{
              width: "1032px",
              marginTop: "80px",
              marginBottom: "300px",
            }}
          />
        </ContentBox>
        <MobileIntro />
      </Wrapper>
      <Footer />
    </React.Fragment>
  );
}

export default Intro;

const Wrapper = styled.div`
  ${({ theme }) => theme.common.flexCenter};
  width: 100%;
  @media ${({ theme }) => theme.device.mobile} {
    width: 360px;
  }
`;

const ContentBox = styled.div`
  ${({ theme }) => theme.common.flexCenterColumn};
  width: 1032px;
  margin: auto;
  @media ${({ theme }) => theme.device.mobile} {
    display: none;
  }
`;

const Image = styled.div`
  width: 1032px;
  height: 240px;
  margin: 80px 0px;
  box-sizing: border-box;
  background-size: cover;
`;
