import React from "react";
import { history } from "../redux/configureStore";
import { Text } from "../elements";
import styled from "styled-components";
import Swal from "sweetalert2";

const Footer = () => {
  const isLogin = localStorage.getItem("isLogin");

  const logout = () => {
    Swal.fire("로그아웃 되었습니다.");
    history.push("/");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("memberId");
    localStorage.removeItem("nickname");
    localStorage.removeItem("isLogin");
  };
  return (
    <React.Fragment>
      <FooterWrapper>
        <FooterBox>
          <Text sub7 color="#666666" margin="0px 24px">
            BE임인혁 BE박형기 BE김현규
          </Text>
          |
          <Text sub7 color="#666666" margin="0px 24px">
            FE김혜리 FE김가경
          </Text>
          |
          <Text sub7 color="#666666" margin="0px 24px">
            DE김현경 DE최혜지
          </Text>
        </FooterBox>
      </FooterWrapper>
      <MobileFooter>
        {isLogin === "true" ? (
          <FooterBtn>
            <Text
              sub
              margin="2px 6px"
              color="#666666"
              _onClick={() => {
                logout();
              }}
            >
              로그아웃
            </Text>
          </FooterBtn>
        ) : (
          <FooterBtn>
            <Text
              sub
              margin="2px 6px"
              color="#666666"
              _onClick={() => {
                history.push("/");
              }}
            >
              로그인
            </Text>
          </FooterBtn>
        )}

        <FooterBox>
          <Text sub color="#666666" margin="0px 5px">
            BE임인혁 BE박형기 BE김현규
          </Text>
          |
          <Text sub color="#666666" margin="0px 5px">
            FE김혜리 FE김가경
          </Text>
          |
          <Text sub color="#666666" margin="0px 5px">
            DE김현경 DE최혜지
          </Text>
        </FooterBox>
      </MobileFooter>
    </React.Fragment>
  );
};

const FooterWrapper = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 200px;
  padding-top: 60px;
  background-color: #fafafa;
  @media ${({ theme }) => theme.device.mobile} {
    display: none;
  }
`;

const FooterBox = styled.div`
  width: 1032px;
  margin: 0px auto;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  color: #666;
  @media ${({ theme }) => theme.device.mobile} {
    width: 100%;
    margin-top: 20px;
    justify-content: center;
  }
`;

const MobileFooter = styled.div`
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 200px;

  background: #fafafa;
  border-radius: 0px;

  @media ${({ theme }) => theme.device.mobile} {
    display: flex;
  }
`;

const FooterBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 18px;

  background: #f8f8f8;

  border: 1px solid #cccccc;
  border-radius: 2px;
`;

export default Footer;
