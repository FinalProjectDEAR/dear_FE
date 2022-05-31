import React from "react";

//리덕스
import { useDispatch, useSelector } from "react-redux";
import { history } from "../redux/configureStore";
import { actionCreators as userActions } from "../redux/modules/user";
//스타일
import { Text } from "../elements";
import styled from "styled-components";
import Swal from "sweetalert2";
import "../styles/libraryStyle/style.css";

const Footer = () => {
  const dispatch = useDispatch();
  const isUser = useSelector((state) => state.user.isLogin);
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
          <MemberIntro>
            <FooterText>
              <Text sub4 color="#948A9E" margin="0px 8px">
                Backend
              </Text>
              <Text sub7 color="#948A9E">
                임인혁 박형기 김현규
              </Text>
            </FooterText>
            <FooterText>
              <Text sub4 color="#948A9E" margin="0px 8px">
                Frontend
              </Text>
              <Text sub7 color="#948A9E">
                김혜리 김가경
              </Text>
            </FooterText>
            <FooterText>
              <Text sub4 color="#948A9E" margin="0px 8px">
                Designer
              </Text>
              <Text sub7 color="#948A9E">
                김현경 최혜지
              </Text>
            </FooterText>
          </MemberIntro>
        </FooterBox>
      </FooterWrapper>
      <MobileFooter>
        {!isUser ? (
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

        <MFooterBox>
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
            <Text sub4 color="#948A9E" margin="22px 4px 0px 4px">
              Backend
            </Text>
            <Text sub7 color="#948A9E" margin="22px 8px 0px 0px">
              임인혁 박형기 김현규
            </Text>
            <Text sub4 color="#948A9E" margin="22px 4px 0px 4px">
              Frontend
            </Text>
            <Text sub7 color="#948A9E" margin="22px 8px 0px 0px">
              김혜리 김가경
            </Text>
          </FooterText>
          <FooterText>
            <Text sub4 color="#948A9E" margin="8px">
              Designer
            </Text>
            <Text sub7 color="#948A9E">
              김현경 최혜지
            </Text>
          </FooterText>
        </MFooterBox>
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

const MemberIntro = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FooterBox = styled.div`
  width: 70%;
  margin: 0px auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #666;
  @media ${({ theme }) => theme.device.mobile} {
    width: 100%;
    margin-top: 20px;
    justify-content: center;
  }
`;

const MFooterBox = styled.div`
  display: none;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  margin-top: 20px;
  color: #666;
  @media ${({ theme }) => theme.device.mobile} {
    display: flex;
  }
`;

const FooterText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
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
