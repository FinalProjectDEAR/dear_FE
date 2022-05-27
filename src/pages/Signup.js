import React from "react";
import { Input, Text, Button } from "../elements";

import { history } from "../redux/configureStore";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import { memberIdCheck, pwdCheck } from "../shared/Check";

import styled from "styled-components";
import Swal from "sweetalert2";
import "../styles/libraryStyle/style.css";
import logo from "../assets/main/logoS.png";
import Footer from "../components/Footer";

const Signup = () => {
  const dispatch = useDispatch();

  const [memberId, setMemberId] = React.useState("");
  const [pwd, setPwd] = React.useState("");
  const [pwdConfirm, setPwdConfirm] = React.useState("");
  const [isCheck, setIsCheck] = React.useState(false);

  const nickErr = useSelector((state) => state.user.idMsg);

  const dupCheck = (memberId) => {
    if (!memberIdCheck(memberId)) {
      Swal.fire("아이디가 형식에 맞지 않습니다. 영문/숫자 포함 3-10자");
      return;
    }
    setIsCheck(true);
    dispatch(userActions.dupMemberIdDB(memberId));
  };

  const signup = () => {
    if (isCheck === false) {
      Swal.fire("아이디 중복확인을 해주세요!");
    }

    if (memberId === "" || pwd === "") {
      Swal.fire("아이디, 패스워드를 모두 입력해주세요!");
      return;
    }

    if (!pwdCheck(pwd, memberId)) {
      Swal.fire("패스워드 형식이 맞지 않습니다! (6-12자 영문, 숫자)");
      return;
    }

    if (pwd !== pwdConfirm) {
      Swal.fire("패스워드가 일치하지 않습니다!");
      return;
    }

    dispatch(userActions.signupDB(memberId, pwd, pwdConfirm));
  };

  return (
    <React.Fragment>
      <Background>
        <SignupWrapper>
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
                secondaryDefault
                size="small"
                margin="0px 10px"
                bg="#948A9E"
                cursor="pointer"
                _onClick={() => {
                  dupCheck(memberId);
                }}
              >
                <Text body4 color="#7A37BE" cursor="pointer">
                  중복확인
                </Text>
              </Button>
            </ButtonBox>
          </IdBox>
          {isCheck && nickErr === true ? (
            <Text sub7 textAlign="left" margin="15px" color="#50BA94">
              사용 가능한 아이디입니다.
            </Text>
          ) : null}
          {isCheck && nickErr === false ? (
            <Text sub7 textAlign="left" margin="15px" color="#D53253">
              사용할 수 없는 아이디입니다.
            </Text>
          ) : null}
          {isCheck === false ? (
            <Text sub7 textAlign="left" margin="15px">
              영문(소문자), 숫자로 4-10자 이내로 입력해주세요.
            </Text>
          ) : null}

          <PasswordBox>
            <Input
              padding="14px 0px 14px 30px"
              margin="0px"
              borderRadius="100px"
              shadow="0px 0px 20px rgba(172, 151, 197, 0.25)"
              type="password"
              value={pwd}
              placeholder="비밀번호는 6자이상 입력해주세요."
              _onChange={(e) => {
                setPwd(e.target.value);
              }}
            />
            <Input
              padding="14px 0px 14px 30px"
              borderRadius="100px"
              margin="10px 0px"
              shadow="0px 0px 20px rgba(172, 151, 197, 0.25)"
              type="password"
              placeholder="비밀번호를 한 번 더 입력해주세요."
              _onChange={(e) => {
                setPwdConfirm(e.target.value);
              }}
              is_submit
              value={pwdConfirm}
              onSubmit={signup}
            />

            {/* {pwdSyncErr ? (
              <Text sub7 textAlign="left" margin="0px 15px" color="#D53253">
                비밀번호와 비밀번호 확인이 일치하지 않습니다.
              </Text>
            ) : null}
            {pwdSyncErr === false || pwdSyncErr === "" ? (
              <Text sub7 textAlign="left" margin="0px 15px">
                영문, 숫자 6-12자 조합으로 입력해주세요.
              </Text>
            ) : null}
            {pwdFormat === false ? (
              <Text sub7 textAlign="left" margin="0px 15px" color="#D53253">
                비밀번호 형식이 맞지 않습니다. (영문, 숫자 6-12자 이내)
              </Text>
            ) : null} */}
          </PasswordBox>
          <ButtonBox>
            <Button
              primaryDefault
              size="wide"
              _onClick={() => {
                signup();
              }}
              text="회원가입"
            ></Button>
            <LineBox>
              <Text sub4 margin="0px" color="#61586A" cursor="pointer">
                이미 계정이 있으신가요?
              </Text>
              <Text
                sub3
                margin="0px 10px"
                color="#7A37BE"
                deco="underLine"
                cursor="pointer"
                _onClick={() => {
                  history.push("/");
                }}
              >
                로그인
              </Text>
            </LineBox>
          </ButtonBox>
        </SignupWrapper>
        <MobileFooter>
          <FooterBtn>
            <Text
              sub
              color="#666666"
              _onClick={() => {
                history.push("/");
              }}
            >
              로그인
            </Text>
          </FooterBtn>
          <FooterBox>
            <Text sub color="#666666" margin="0px 6px">
              의견 및 오류 제보
            </Text>
            |
            <Text sub color="#666666" margin="0px 6px">
              자주 묻는 질문
            </Text>
            |
            <Text sub color="#666666" margin="0px 6px">
              개인정보처리방침
            </Text>
          </FooterBox>
        </MobileFooter>
      </Background>
    </React.Fragment>
  );
};

export default Signup;

const Background = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SignupWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 300px;
  margin: auto;
  @media ${({ theme }) => theme.device.mobile} {
    width: 300px;
    height: 935px;
  }
`;

const LogoBox = styled.div`
  padding: 0px 0px 40px;
  margin: 0px auto;
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

const IdBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PasswordBox = styled.div`
  width: 100%;
  justify-content: center;
  align-items: center;
  padding: 0px 0px 15px;
`;

const ButtonBox = styled.div`
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const LineBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 19px;
  margin: 10px auto;
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
