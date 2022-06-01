import React from "react";

//스타일
import styled from "styled-components";
import { useMediaQuery } from "react-responsive";
import { CgClose } from "react-icons/cg";
import { ReactComponent as WebTape } from "../assets/infoModal/TapeWeb.svg";
import { ReactComponent as MobileTape } from "../assets/infoModal/TapeMobile.svg";

function TapeInfo({ closeTape }) {
  const Mobile = useMediaQuery({
    query: "(max-width:425px)",
  });
  return (
    <React.Fragment>
      <Wrapper>
        <CgClose
          className="close"
          size={20}
          onClick={closeTape}
          style={{
            color: "#948A9E",
            position: "absolute",
            right: "5%",
            top: "3%",
            cursor: "pointer",
          }}
        />
        {Mobile ? <MobileTape /> : <WebTape />}
      </Wrapper>
    </React.Fragment>
  );
}

export default TapeInfo;

const Wrapper = styled.div`
  position: relative;
  ${({ theme }) => theme.common.flexCenter};
  width: 550px;
  height: 539px;
  padding-top: 85px;
  padding-bottom: 50px;
  box-sizing: border-box;
  background-color: #fff;
  border-radius: 20px;
  @media ${({ theme }) => theme.device.mobile} {
    width: 320px;
    height: 520px;
    padding-top: 56px;
    padding-bottom: 20px;
    border-radius: 10px;
  }
`;

const Image = styled.div`
  width: 550px;
  height: 388px;
  box-sizing: border-box;
  background-image: url("${(props) => props.src}");
  background-size: cover;
  @media ${({ theme }) => theme.device.mobile} {
    display: none;
  }
`;

const ImageM = styled.div`
  display: none;
  width: 320px;
  height: 444px;
  box-sizing: border-box;
  background-image: url("${(props) => props.src}");
  background-size: cover;
  @media ${({ theme }) => theme.device.mobile} {
    display: block;
  }
`;
