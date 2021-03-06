import React from "react";

//스타일
import styled from "styled-components";
import { useMediaQuery } from "react-responsive";
import { CgClose } from "react-icons/cg";
import { ReactComponent as WebListener } from "../assets/infoModal/listenerWeb.svg";
import { ReactComponent as MobileListener } from "../assets/infoModal/listenerMobile.svg";

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
        {Mobile ? <MobileListener /> : <WebListener />}
      </Wrapper>
    </React.Fragment>
  );
}

export default ListenerInfo;

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
