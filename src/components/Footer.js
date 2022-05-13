import React from "react";
import { Text } from "../elements";
import styled from "styled-components";

const Footer = () => {
  return (
    <React.Fragment>
      <FooterWrapper>
        <FooterBox>
          <GitBtn
            onClick={() => {
              window.open("https://github.com/FinalProjectDEAR");
            }}
          >
            The source code is licensed HangHae 6a_team7 Please refer to github
            for details © 2022 HangHae LUCKY SEVEN
          </GitBtn>
        </FooterBox>
      </FooterWrapper>
    </React.Fragment>
  );
};

const FooterWrapper = styled.div`
  background-color: #fafafa;
  height: 300px;
  width: 100%;
  margin: auto;
  position: absolute;
`;
const FooterBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: left;
  text-align: left;
  align-items: left;
  padding: 0px;
  /* gap: 24px; */

  position: absolute;
  left: 14.17%;
  right: 60%;
  top: 40%;
  bottom: 60%;
  /* background-color: #bb9ed8; */
`;
const GitBtn = styled.button`
  display: flex;
  border: none;
  color: #948a9e;
  justify-content: left;
  text-align: left;
  align-items: left;
  cursor: pointer;
  background-color: transparent;
`;

export default Footer;
