import React from "react";
//리덕스
import { history } from "../redux/configureStore";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
//스타일
import styled from "styled-components";
import { Text, Input, Button, Modal } from "../elements";
import { ReactComponent as Logo } from "../assets/main/Logo.svg";
import { ReactComponent as Kakao } from "../assets/etc/kakao_sns.svg";
import Survey from "../components/Survey";
import Swal from "sweetalert2";
import "../styles/libraryStyle/style.css";

import { memberIdCheck } from "../shared/Check";
import { useCookies } from "react-cookie";

const Login = () => {
  const [open, setOpen] = React.useState(true);
  const close = () => {
    setOpen(false);
  };
  const COOKIE_KEY = "notAgain";
  const [cookies, setCookie] = useCookies([COOKIE_KEY]);

  const Token = localStorage.getItem("accessToken");

  const logout = () => {
    history.push("/login");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("memberId");
    localStorage.removeItem("nickname");
  };

  const dispatch = useDispatch();

  const [memberId, setMemberId] = React.useState("");
  const [pwd, setPwd] = React.useState("");

  const isUser = useSelector((state) => state.user.isLogin);

  const login = () => {
    if (memberId === "" || pwd === "") {
      Swal.fire("아이디 혹은 비밀번호가 공란입니다. 입력해주세요.");
      return;
    }

    if (!memberIdCheck(memberId)) {
      Swal.fire("아이디 형식이 맞지 않습니다.");
      return;
    }
    dispatch(userActions.loginDB(memberId, pwd));
  };

  const kakaoAuth = () => {
    window.location.href = process.env.REACT_APP_KakaoAuthUrl;
  };

  // 가운데 수직 붙이기
  return (
    <Background>
      <LoginWrapper>
        <div style={{ paddingBottom: "50px" }}>
          <LogoBox>
            <Logo />
          </LogoBox>
          <InputBox>
            <Input
              padding="14px 0px 14px 30px"
              margin="0px"
              borderRadius="100px"
              placeholder="아이디"
              alignItems="center"
              shadow="0px 0px 20px rgba(172, 151, 197, 0.25)"
              value={memberId}
              _onChange={(e) => {
                setMemberId(e.target.value);
              }}
            />
            <Input
              padding="14px 0px 14px 30px"
              borderRadius="100px"
              margin="15px 0px"
              shadow="0px 0px 20px rgba(172, 151, 197, 0.25)"
              placeholder="비밀번호"
              type="password"
              value={pwd}
              _onChange={(e) => {
                setPwd(e.target.value);
              }}
              is_submit
              onSubmit={() => {
                login();
              }}
            />
          </InputBox>
        </div>
        <ButtonBox>
          <Button
            primaryDefault
            size="wide"
            _onClick={() => {
              login();
            }}
          >
            <Text
              body4
              textAlign="center"
              margin="0px"
              color="#fff"
              cursor="pointer"
            >
              로그인
            </Text>
          </Button>
          <LineBox>
            <Text sub4 margin="0px" color="#61586A">
              계정이 없으신가요?
            </Text>
            <Text
              sub3
              margin="0px 10px"
              color="#7A37BE"
              deco="underLine"
              cursor="pointer"
              _onClick={() => {
                history.push("/signup");
              }}
            >
              회원가입
            </Text>
          </LineBox>
        </ButtonBox>
        <KakaoBox>
          <Kakao onClick={kakaoAuth} />
        </KakaoBox>
      </LoginWrapper>

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
      {cookies[COOKIE_KEY] ? null : (
        <Modal>
          <Survey close={close} />
        </Modal>
      )}
    </Background>
  );
};

export default Login;

const Background = styled.div`
  ${({ theme }) => theme.common.flexCenterColumn};
  width: 100%;
  height: 100vh;
  @media ${({ theme }) => theme.device.mobile} {
    height: 100%;
  }
`;

const LoginWrapper = styled.div`
  ${({ theme }) => theme.common.flexCenterColumn};
  width: 300px;
  margin: auto;

  @media ${({ theme }) => theme.device.mobile} {
    width: 300px;
    height: 750px;
  }
`;

const LogoBox = styled.div`
  ${({ theme }) => theme.common.flexCenter};
  width: 140px;
  height: 94px;
  margin: 0px auto;
  padding: 0px 0px 40px;
  @media ${({ theme }) => theme.device.mobile} {
    width: 120px;
    height: 80px;
  }
`;

const InputBox = styled.div`
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 95px;
  box-sizing: border-box;
`;

const ButtonBox = styled.div`
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 69px;
  margin-bottom: 30px;
`;

const LineBox = styled.div`
  ${({ theme }) => theme.common.flexCenter};
  width: 100%;
  height: 19px;
  margin: 10px auto;
`;

const KakaoBox = styled.div`
  justify-content: center;
  align-items: center;
  @media ${({ theme }) => theme.device.mobile} {
    width: 40px;
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
  ${({ theme }) => theme.common.flexCenter};
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
  ${({ theme }) => theme.common.flexCenter};
  height: 18px;
  background: #f8f8f8;
  border: 1px solid #cccccc;
  border-radius: 2px;
`;
