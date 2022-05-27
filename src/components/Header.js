import React from "react";
import styled from "styled-components";

import { history } from "../redux/configureStore";
import { Text } from "../elements";

import { useSelector, useDispatch } from "react-redux";
import logo from "../assets/main/logoS.png";
import Swal from "sweetalert2";
import "../styles/libraryStyle/style.css";

const Header = (props) => {
  const Token = localStorage.getItem("accessToken");

  const logout = () => {
    Swal.fire("로그아웃 되었습니다.");
    history.push("/login");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("memberId");
    localStorage.removeItem("nickname");
    localStorage.removeItem("isLogin");
  };

  const gotoMypage = () => {
    if (!Token) {
      Swal.fire("로그인 후 이용해주세요.");
      history.push("/login");
      return;
    }
    history.push("/myPage");
  };

  return (
    <React.Fragment>
      <HeaderWrapper id="1">
        <HeaderContainer>
          <HeaderBox>
            <LogoBox>
              <Logo
                src={logo}
                onClick={() => {
                  history.push("/");
                }}
                alt="logo"
              />
            </LogoBox>

            <ButtonBox>
              <HeaderBtn
                onClick={() => {
                  history.push("/intro");
                }}
              >
                <Text sub7 cursor="pointer">
                  서비스 소개
                </Text>
              </HeaderBtn>
              <HeaderBtn
                onClick={() => {
                  history.push("/postList/전체");
                }}
              >
                <Text sub7 cursor="pointer">
                  디어상담소
                </Text>
              </HeaderBtn>
              <HeaderBtn onClick={gotoMypage}>
                <Text sub7 cursor="pointer">
                  마이페이지
                </Text>
              </HeaderBtn>
              {!Token ? (
                <HeaderBtn
                  onClick={() => {
                    history.push("/login");
                  }}
                >
                  <Text sub7 cursor="pointer">
                    로그인
                  </Text>
                </HeaderBtn>
              ) : (
                <HeaderBtn onClick={logout}>
                  <Text sub7 cursor="pointer">
                    로그아웃
                  </Text>
                </HeaderBtn>
              )}
            </ButtonBox>
          </HeaderBox>
        </HeaderContainer>
      </HeaderWrapper>
    </React.Fragment>
  );
};

export default Header;

const HeaderWrapper = styled.div`
  width: 100%;
  height: 120px;
  padding: 24px;
  box-sizing: border-box;
  background: rgba(196, 196, 196, 0);
  @media ${({ theme }) => theme.device.mobile} {
    padding: 15px 10px;
    width: 360px;
    height: 60px;
  }
`;

const HeaderContainer = styled.div`
  @media (max-width: 1920px) {
    box-sizing: border-box;
  }

  @media ${({ theme }) => theme.device.mobile} {
    width: 320px;
  }
`;

const LogoBox = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const Logo = styled.img`
  width: 100px;
  height: 66px;
  margin: 0px auto;
  cursor: pointer;
  @media ${({ theme }) => theme.device.mobile} {
    width: 60px;
    height: 36px;
  }
`;

const HeaderBox = styled.div`
  width: 1032px;
  height: 100%;
  margin: auto;
  display: flex;
  justify-content: space-between;
  @media ${({ theme }) => theme.device.mobile} {
    margin: 0px;
    width: 340px;
  }
`;

const HeaderBtn = styled.button`
  display: flex;
  justify-content: center;
  border: none;
  background-color: transparent;
  color: #61586a;
  cursor: pointer;
  line-height: 15px;
  margin: 0px 15px;
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  @media ${({ theme }) => theme.device.mobile} {
    display: none;
  }
`;
