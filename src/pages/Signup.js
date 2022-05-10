import React from "react";
import { Input, Text, Button } from "../elements";

import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import { memberIdCheck, pwdCheck } from "../shared/Check";

import styled from "styled-components";

const Signup = () => {
  const dispatch = useDispatch();

  const [memberId, setMemberId] = React.useState("");
  const [pwd, setPwd] = React.useState("");
  const [pwdConfirm, setPwdConfirm] = React.useState("");
  const [isCheck, setIsCheck] = React.useState(false);

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
            <Logo />
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
            <Button
              width="32%"
              margin="0px 10px"
              borderRadius="22px"
              bg="#948A9E"
              text="중복조회"
              _onClick={() => {
                dupCheck(memberId);
              }}
            />
          </IdBox>
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

const IdBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px 0px 30px;
`;

const PasswordBox = styled.div`
  justify-content: center;
  align-items: center;
  padding: 0px 0px 30px;
`;

const ButtonBox = styled.div`
  justify-content: center;
  align-items: center;
`;
