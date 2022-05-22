import React from "react";
import { Text } from "../elements";
import styled from "styled-components";

const Footer = () => {
  return (
    <React.Fragment>
      <FooterWrapper>
        <FooterBox>
          <Text sub7 color="#666666" margin="0px 24px">
            의견 및 오류 제보
          </Text>
          |
          <Text sub7 color="#666666" margin="0px 24px">
            자주 묻는 질문
          </Text>
          |
          <Text sub7 color="#666666" margin="0px 24px">
            개인정보처리방침
          </Text>
        </FooterBox>
      </FooterWrapper>
    </React.Fragment>
  );
};

const FooterWrapper = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 200px;
  padding-top: 60px;
  background-color: #fafafa;
`;

const FooterBox = styled.div`
  width: 1032px;
  margin: 0px auto;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  color: #666;
`;

export default Footer;
