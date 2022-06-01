import React from "react";

//라우트
//리덕스
import { history } from "../redux/configureStore";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
//스타일
import styled from "styled-components";
import { Input, Text, Button } from "../elements";
import { ReactComponent as Logo } from "../assets/main/Logo.svg";
import Swal from "sweetalert2";
import "../styles/libraryStyle/style.css";
//컴포넌트
import Footer from "../components/Footer";
import { memberIdCheck, pwdCheck } from "../shared/Check";

const Signup = () => {
  const dispatch = useDispatch();

  const [memberId, setMemberId] = React.useState("");
  const [pwd, setPwd] = React.useState("");
  const [pwdConfirm, setPwdConfirm] = React.useState("");
  const [isCheck, setIsCheck] = React.useState(false);

  const nickErr = useSelector((state) => state.user.idMsg);
  const isUser = useSelector((state) => state.user.isLogin);
  const logout = () => {
    history.push("/login");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("memberId");
    localStorage.removeItem("nickname");
  };
  const dupCheck = (memberId) => {
    if (!memberIdCheck(memberId)) {
      Swal.fire("아이디가 형식에 맞지 않습니다. 영문/숫자 포함 3-10자");
      return;
    }
    setIsCheck(true);
    dispatch(userActions.dupMemberIdDB(memberId));
  };

  const signup = () => {
    if (!nickErr) {
      Swal.fire("사용가능한 아이디여야 합니다.");
      return;
    }

    if (isCheck === false) {
      Swal.fire("아이디 중복확인을 해주세요!");
    }

    if (!memberIdCheck(memberId)) {
      Swal.fire("아이디 형식이 맞지 않습니다! (3-10자 영문, 숫자 조합)");
      return;
    }

    if (memberId === "" || pwd === "") {
      Swal.fire("아이디, 패스워드를 모두 입력해주세요!");
      return;
    }

    if (pwdCheck(pwd, memberId) == false) {
      Swal.fire("패스워드 형식이 맞지 않습니다! (6-12자 영문, 숫자 조합)");
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
              onClick={() => {
                history.push("/login");
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
              영문(소문자), 숫자로 3-10자 이내로 입력해주세요.
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
                  history.push("/login");
                }}
              >
                로그인
              </Text>
            </LineBox>
          </ButtonBox>
        </SignupWrapper>
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
      </Background>
    </React.Fragment>
  );
};

export default Signup;

const Background = styled.div`
  ${({ theme }) => theme.common.flexCenterColumn};
  width: 100%;
  height: 100vh;
  @media ${({ theme }) => theme.device.mobile} {
    height: 100%;
  }
`;

const SignupWrapper = styled.div`
  width: 300px;
  margin: auto;
  @media ${({ theme }) => theme.device.mobile} {
    width: 300px;
    height: 700px;
  }
`;

const LogoBox = styled.div`
  ${({ theme }) => theme.common.flexCenter};
  width: 140px;
  height: 94px;
  margin: 0px auto;
  padding: 0px 0px 40px;
  @media ${({ theme }) => theme.device.mobile} {
    margin-top: 156px;
    width: 120px;
    height: 80px;
  }
`;

const IdBox = styled.div`
  ${({ theme }) => theme.common.flexCenter};
`;

const PasswordBox = styled.div`
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 0px 0px 15px;
`;

const ButtonBox = styled.div`
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const LineBox = styled.div`
  ${({ theme }) => theme.common.flexCenter};
  width: 100%;
  height: 19px;
  margin: 10px auto;
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
