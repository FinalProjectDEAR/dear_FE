import React from "react";

import styled from "styled-components";
import { CgClose } from "react-icons/cg";

import tapeInfo from "../assets/infoModal/tapeInfo.png";
import tapeInfoM from "../assets/infoModal/tapeInfoM.png";

function TapeInfo({ closeTape }) {
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
        <Image src={tapeInfo} />
        <ImageM src={tapeInfoM} />
      </Wrapper>
    </React.Fragment>
  );
}

export default TapeInfo;

const Wrapper = styled.div`
  position: relative;
  width: 550px;
  height: 539px;
  padding-top: 85px;
  padding-bottom: 50px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
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
