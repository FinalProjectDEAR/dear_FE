import React from "react";
import { history } from "../redux/configureStore";
import { actionCreators as userActions } from "../redux/modules/user";
import { Text } from "../elements";
import styled from "styled-components";
import Swal from "sweetalert2";
import "../styles/libraryStyle/style.css";
import { useSelector, useDispatch } from "react-redux";

const Footer = () => {
  const dispatch = useDispatch();
  const Token = localStorage.getItem("accessToken");

  const logout = () => {
    dispatch(userActions.logOut());
    Swal.fire("로그아웃 되었습니다.");
    history.push("/login");
  };
  return (
    <React.Fragment>
      <FooterWrapper>
        <FooterBox>
          <Text
            sub4
            margin="0px 15px"
            color="#948A9E"
            deco="underLine"
            cursor="pointer"
            _onClick={() => {
              window.open("https://respond.listovey.com/rs/EctfU25gC");
            }}
          >
            의견 및 오류 제보
          </Text>
          <FooterText>
            <Text sub4 color="#948A9E">
              BE
            </Text>
            임인혁 박형기 김현규
          </FooterText>
          |
          <FooterText>
            <Text sub4 color="#948A9E">
              FE
            </Text>
            김혜리 김가경
          </FooterText>
          |
          <FooterText>
            <Text sub4 color="#948A9E">
              DE
            </Text>
            김현경 최혜지
          </FooterText>
        </FooterBox>
      </FooterWrapper>
      <MobileFooter>
        {!Token ? (
          <FooterBtn>
            <Text
              sub
              margin="2px 6px"
              color="#666666"
              _onClick={() => {
                history.push("/login");
              }}
            >
              로그인
            </Text>
          </FooterBtn>
        ) : (
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
        )}

        <FooterBox>
          <Text sub color="#666666" margin="0px 5px">
            BE 임인혁 박형기 김현규
          </Text>
          |
          <Text sub color="#666666" margin="0px 5px">
            FE 김혜리 김가경
          </Text>
          |
          <Text sub color="#666666" margin="0px 5px">
            DE 김현경 최혜지
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
const FooterText = styled.div`
  margin: 0px 24px;
  font-size: 12px;
  line-height: 14px;
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
