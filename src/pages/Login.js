import React from "react";
import { Text, Input, Button } from "../elements";

import { history } from "../redux/configureStore";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import { memberIdCheck } from "../shared/Check";

import styled from "styled-components";
import logo from "../assets/main/logoS.png";
import kakao from "../assets/kakao.png";
import Footer from "../components/Footer";

const Login = () => {
  const dispatch = useDispatch();

  const [memberId, setMemberId] = React.useState("");
  const [pwd, setPwd] = React.useState("");

  const login = () => {
    if (memberId === "" || pwd === "") {
      window.alert("아이디 혹은 비밀번호가 공란입니다. 입력해주세요.");
      return;
    }

    if (!memberIdCheck(memberId)) {
      window.alert("아이디 형식이 맞지 않습니다.");
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
        <div style={{ padding: "50px 0px" }}>
          <LogoBox>
            <Logo src={logo} />
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
              sub5
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
          <KakaoButton onClick={kakaoAuth} src={kakao} />
        </KakaoBox>
      </LoginWrapper>
      <Footer />
    </Background>
  );
};

export default Login;

const Background = styled.div`
  width: 100%;
  height: 935px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 300px;
  margin: auto;

  @media ${({ theme }) => theme.device.mobile} {
    width: 300px;
    height: 935px;
  }
`;

const LogoBox = styled.div`
  padding: 0px 0px 40px;
`;

const Logo = styled.img`
  width: 140px;
  height: 94px;
  margin: 0px auto;
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
  width: 300px;
  height: 69px;
  margin-bottom: 30px;
  justify-content: center;
  align-items: center;
`;

const LineBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 19px;
  margin: 10px auto;
`;

const KakaoBox = styled.div`
  justify-content: center;
  align-items: center;
`;

const KakaoButton = styled.img`
  margin: 0px auto;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  --size: 60px;
  width: var(--size);
  height: var(--size);
  border-radius: var(--size);
  box-shadow: 0px 0px 20px rgba(172, 151, 197, 0.25);

  @media ${({ theme }) => theme.device.mobile} {
    --size: 40px;
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
  padding: 2px 6px;

  width: 38px;
  height: 18px;

  background: #f8f8f8;

  border: 1px solid #cccccc;
  border-radius: 2px;
`;

const FooterBox = styled.div`
  margin: 10px auto;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  color: #666;
`;
