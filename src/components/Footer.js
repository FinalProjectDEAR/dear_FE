import React from "react";
import styled from "styled-components";

const Footer = () => {
  return (
    <React.Fragment>
      <FooterWrapper>
        <FooterBox>
          The source code is licensed HangHae 6a_team7 Please refer to github
          for details © 2022 HangHae LUCKY SEVEN
          <GitBtn
            onClick={() => {
              window.open("https://github.com/FinalProjectDEAR");
            }}
          >
            <img
              src="https://velog.velcdn.com/images/gagyeong/post/bb4cb10c-a816-4d0c-8c5d-38a175ba9ad6/image.png"
              alt="깃허브로 바로가기"
            ></img>
          </GitBtn>
        </FooterBox>
      </FooterWrapper>
    </React.Fragment>
  );
};

const FooterWrapper = styled.div`
  background-color: #cdb4db;
  height: 300px;
  width: 100%;
  margin: auto;
  position: absolute;
`;
const FooterBox = styled.div`
  background-color: #bb9ed8;
`;
const GitBtn = styled.button`
  border: none;
  background-color: transparent;
`;

export default Footer;
