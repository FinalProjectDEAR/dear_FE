import React from "react";
import { Text, Input, Button } from "../elements";

import { history } from "../redux/configureStore";
import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import { memberIdCheck } from "../shared/Check";

import styled from "styled-components";

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
    <React.Fragment>
      <LoginWrapper>
        <div style={{ padding: "50px 0px" }}>
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
              margin="10px 0px"
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
          <ButtonBox>
            <Button
              bg=" #61586A"
              cursor="pointer"
              shadow="0px 0px 20px rgba(172, 151, 197, 0.25)"
              text="로그인"
              _onClick={() => {
                login();
              }}
            />
            <Button
              bg="transparent"
              border="1px solid #61586A;"
              margin="10px 0px"
              cursor="pointer"
              shadow="0px 0px 20px rgba(172, 151, 197, 0.25)"
              _onClick={() => {
                history.push("/signup");
              }}
            >
              <Text margin="0px" color="#61586A" weight="500" size="16px">
                회원가입
              </Text>
            </Button>
          </ButtonBox>
          <KakaoBox>
            <KakaoButton onClick={kakaoAuth} />
          </KakaoBox>
        </div>
      </LoginWrapper>
    </React.Fragment>
  );
};

export default Login;

const LoginWrapper = styled.div`
  width: 360px;
  margin: auto;
`;

const LogoBox = styled.div`
  justify-content: center;
  align-items: center;
  padding: 0px 0px 30px;
`;

const Logo = styled.div`
  width: 225px;
  height: 78px;
  padding: 0px 0px 30px;
  margin: 0px auto;
  border-radius: 20px;
  background-image: url(https://encrypted-tbn0.gstatic.com/imgs?q=tbn:ANd9GcRZXhntGH9U4LYi4QSnFt1VAPJ9_ispc6gTog&usqp=CAU);
  background-repeat: no-repeat;
  background-position: center;
`;

const InputBox = styled.div`
  justify-content: center;
  align-items: center;
  padding: 0px 0px 30px;
`;

const ButtonBox = styled.div`
  justify-content: center;
  align-items: center;
`;

const KakaoBox = styled.div`
  justify-content: center;
  align-items: center;
  padding: 30px 0px 0px;
`;

const KakaoButton = styled.div`
  margin: 0px auto;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-image: url(https://encrypted-tbn0.gstatic.com/imgs?q=tbn:ANd9GcRo7CeP_r7MwNZwEbU7QkBYMfm3Gr_-4IO13A&usqp=CAU);
  --size: 60px;
  width: var(--size);
  height: var(--size);
  border-radius: var(--size);
  background-size: cover;
  box-shadow: 0px 0px 20px rgba(172, 151, 197, 0.25);
`;
