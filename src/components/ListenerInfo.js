import React from "react";

import styled from "styled-components";
import { useMediaQuery } from "react-responsive";
import { CgClose } from "react-icons/cg";

import listenerWeb from "../assets/infoModal/listener.png";
import listenerMobile from "../assets/infoModal/listenerMobile.png";

function ListenerInfo({ close }) {
  const Mobile = useMediaQuery({
    query: "(max-width:767px)",
  });
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
        {Mobile ? <Image src={listenerMobile} /> : <Image src={listenerWeb} />}
      </Wrapper>
    </React.Fragment>
  );
}

export default ListenerInfo;

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
  @media ${({ theme }) => theme.device.isMobile} {
    width: 320px;
    height: 520px;
  }
`;

const Image = styled.div`
  width: 550px;
  height: 404px;
  box-sizing: border-box;
  background-image: url("${(props) => props.src}");
  background-size: cover;
`;
