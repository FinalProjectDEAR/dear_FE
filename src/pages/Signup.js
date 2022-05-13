import React from "react";
import { Input, Text, Button } from "../elements";

import { history } from "../redux/configureStore";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import { memberIdCheck, pwdCheck } from "../shared/Check";

import styled from "styled-components";
import logo from "../assets/main/logoL.png";

const Signup = () => {
  const dispatch = useDispatch();

  const [memberId, setMemberId] = React.useState("");
  const [pwd, setPwd] = React.useState("");
  const [pwdConfirm, setPwdConfirm] = React.useState("");
  const [isCheck, setIsCheck] = React.useState(false);
  const nickErr = useSelector((state) => state.user.msg);

  const dupCheck = (memberId) => {
    if (!memberIdCheck(memberId)) {
      window.alert("아이디가 형식에 맞지 않습니다. 영문/숫자 포함 3-10자");
      return;
    }
    setIsCheck(true);
    dispatch(userActions.dupMemberIdDB(memberId));
  };

  const signup = () => {
    if (isCheck === false) {
      window.alert("아이디 중복확인을 해주세요!");
    }

    if (memberId === "" || pwd === "") {
      window.alert("아이디, 패스워드를 모두 입력해주세요!");
      return;
    }

    if (!pwdCheck(pwd, memberId)) {
      window.alert("패스워드 형식이 맞지 않습니다!");
      return;
    }

    if (pwd !== pwdConfirm) {
      window.alert("패스워드가 일치하지 않습니다!");
      return;
    }

    dispatch(userActions.signupDB(memberId, pwd, pwdConfirm));
  };
  // 가운데 수직 붙이기
  return (
    <React.Fragment>
      <SignupWrapper>
        <div style={{ padding: "50px 0px" }}>
          <LogoBox>
            <Logo
              src={logo}
              onClick={() => {
                history.push("/");
              }}
            />
          </LogoBox>
          <IdBox>
            <Input
              padding="14px 0px 14px 30px"
              margin="0px"
              borderRadius="100px"
              placeholder="아이디를 입력해주세요."
              alignItems="center"
              shadow="0px 0px 20px rgba(172, 151, 197, 0.25)"
              _onChange={(e) => {
                setMemberId(e.target.value);
              }}
              value={memberId}
            />
            <ButtonBox>
              <Button
                width="110px"
                margin="0px 10px"
                borderRadius="22px"
                bg="#948A9E"
                cursor="pointer"
                text="중복확인"
                _onClick={() => {
                  dupCheck(memberId);
                }}
              />
            </ButtonBox>
          </IdBox>
          <Text
            weight="300"
            size="12px"
            color="#999"
            textAlign="left"
            margin="15px"
          >
            {nickErr}
          </Text>
          <PasswordBox>
            <Input
              padding="14px 0px 14px 30px"
              margin="0px"
              borderRadius="100px"
              shadow="0px 0px 20px rgba(172, 151, 197, 0.25)"
              type="password"
              placeholder="비밀번호를 입력해주세요."
              _onChange={(e) => {
                setPwd(e.target.value);
              }}
              value={pwd}
            />
            <Input
              padding="14px 0px 14px 30px"
              borderRadius="100px"
              margin="10px 0px"
              shadow="0px 0px 20px rgba(172, 151, 197, 0.25)"
              type="password"
              placeholder="비밀번호를 다시 입력해주세요."
              _onChange={(e) => {
                setPwdConfirm(e.target.value);
              }}
              value={pwdConfirm}
              is_submit
              onSubmit={signup}
            />
          </PasswordBox>
          <ButtonBox>
            <Button
              bg=" #61586A"
              shadow="0px 0px 20px rgba(172, 151, 197, 0.25)"
              _onClick={() => {
                signup();
              }}
              text="회원가입"
            ></Button>
          </ButtonBox>
        </div>
      </SignupWrapper>
    </React.Fragment>
  );
};

export default Signup;

const SignupWrapper = styled.div`
  width: 360px;
  margin: auto;
`;

const LogoBox = styled.div`
  justify-content: center;
  align-items: center;
  padding: 0px 0px 30px;
`;

const Logo = styled.img`
  width: 225px;
  margin: 0px auto;
  border-radius: 20px;
  cursor: pointer;
`;

const IdBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PasswordBox = styled.div`
  justify-content: center;
  align-items: center;
  padding: 0px 0px 30px;
`;

const ButtonBox = styled.div`
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
