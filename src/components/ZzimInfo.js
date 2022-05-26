import React from "react";

import styled from "styled-components";
import { CgClose } from "react-icons/cg";

import zzim from "../assets/infoModal/zzim.png";
import zzimM from "../assets/infoModal/zzimM.png";

function ZzimInfo({ closeZzim }) {
  return (
    <React.Fragment>
      <Wrapper>
        <CgClose
          className="close"
          size={20}
          onClick={closeZzim}
          style={{
            color: "#948A9E",
            position: "absolute",
            right: "5%",
            top: "3%",
            cursor: "pointer",
          }}
        />
        <Image src={zzim} />
        <ImageM src={zzimM} />
      </Wrapper>
    </React.Fragment>
  );
}

export default ZzimInfo;

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
    padding-bottom: 66px;
    border-radius: 10px;
  }
`;

const Image = styled.div`
  width: 550px;
  height: 404px;
  box-sizing: border-box;
  background-image: url("${(props) => props.src}");
  background-size: cover;
  @media ${({ theme }) => theme.device.mobile} {
    display: none;
  }
`;

const ImageM = styled.div`
  display: none;
  width: 329px;
  height: 398px;
  box-sizing: border-box;
  background-image: url("${(props) => props.src}");
  background-size: cover;
  @media ${({ theme }) => theme.device.mobile} {
    display: block;
  }
`;