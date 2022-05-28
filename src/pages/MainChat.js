import React from "react";
import { Text, TextB, Modal } from "../elements";
import styled from "styled-components";
import Swal from "sweetalert2";
import "../styles/libraryStyle/style.css";
import { useHistory, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { actionCreators as mainActions } from "../redux/modules/main";

import TapeInfo from "../components/TapeInfo";

//assets
import Header from "../components/Header";
import logo from "../assets/main/logoL.png";
import tapeD from "../assets/main/tapeD.png";
import tapeW from "../assets/main/tapeW.png";

import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import HelpOutlineRoundedIcon from "@mui/icons-material/HelpOutlineRounded";

function MainChat() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [checkBox, setCheckBox] = React.useState(false);
  const [showInfo, setShowInfo] = React.useState(false);

  React.useEffect(() => {
    dispatch(mainActions.getTapeDB());
  }, []);

  const closeTape = () => {
    setShowInfo(false);
  };

  const isUser = useSelector((state) => state.user.isLogin);
  const tapeCount = useSelector((state) => state.main.tapeCount);
  const Token = localStorage.getItem("accessToken");
  const nickname = localStorage.getItem("nickname");

  const startReq = () => {
    if (checkBox !== true) {
      Swal.fire("이용약관에 동의해주세요.");
      return;
    } else if (!isUser) {
      Swal.fire("로그인 후 이용해 주세요.");
      history.replace("/login");
      return;
    } else if (isUser && nickname === null) {
      Swal.fire("상담에 필요한 회원정보를 입력 후 이용해 주세요.");

      history.replace("/mypage");
      return;
    }

    history.replace("/startReq");
  };

  const startRes = () => {
    if (checkBox !== true) {
      Swal.fire("이용약관에 동의해주세요.");
      return;
    } else if (!isUser) {
      Swal.fire("로그인 후 이용해 주세요.");
      history.replace("/login");
      return;
    } else if (isUser && nickname === null) {
      Swal.fire("상담에 필요한 회원정보를 입력 후 이용해 주세요.");
      history.replace("/mypage");
      return;
    }
    history.replace("/startRes");
  };

  return (
    <React.Fragment>
      <Header />
      <Background>
        <MainWrap>
          <IntroWrap>
            <LogoBox>
              <Logo src={logo} />
            </LogoBox>
            <TextB title color="#2E2A32" margin="0px">
              오늘은 연애 고민이 있는 친구를 위해
            </TextB>
            <TextB title color="#2E2A32" margin="0px">
              다정한 리스너가 되어주는건 어떨까요?
            </TextB>
          </IntroWrap>
          <InputWrap>
            <input
              type="checkbox"
              name="completed"
              id="check"
              onChange={() => {
                setCheckBox(!checkBox);
              }}
            />
            <Text sub6 margin="10px" textAlign="left">
              따뜻하고 부드러운 언행을 사용하여 상대방과 진솔한 대화를 나누는
              것에 동의합니다.
            </Text>
          </InputWrap>
          <BtnWrap>
            <Btn checkBox={checkBox} onClick={startReq}>
              <TextB subtitle margin="5px" cursor="pointer" color="#2E2A32">
                고민 들어줄 친구 찾기
              </TextB>
              <LineBox>
                <img
                  src={tapeD}
                  style={{ width: "24px", height: "24px" }}
                  alt="tape"
                />

                <Text sub6 margin="0px 5px" color="#61586A" cursor="pointer">
                  -1
                </Text>
              </LineBox>
            </Btn>
            <Btn checkBox={checkBox} onClick={startRes}>
              <TextB subtitle margin="5px" cursor="pointer" color="#2E2A32">
                친구의 고민 들어주기
              </TextB>
              <LineBox>
                <img
                  src={tapeD}
                  style={{ width: "24px", height: "24px" }}
                  alt="tape"
                />

                <Text sub6 margin="0px 5px" color="#61586A" cursor="pointer">
                  +1
                </Text>
              </LineBox>
            </Btn>
          </BtnWrap>
          <TapeCntLine>
            <HelpOutlineRoundedIcon
              style={{ width: "15px", color: "#61586A", cursor: "pointer" }}
              onClick={() => {
                setShowInfo(true);
              }}
            />
            {showInfo ? (
              <Modal>
                <TapeInfo closeTape={closeTape} />
              </Modal>
            ) : null}
            <Text sub7 margin="0px 5px">
              현재 보유 테이프: {tapeCount}
            </Text>
            {/* <Text sub7>현재 나의 보유 테이프: 4</Text> */}
          </TapeCntLine>

          <ScrollBox>
            <Text body color="#948A9E">
              SCROLL
            </Text>
            <ArrowDropDownRoundedIcon
              style={{ width: "30px", color: "#948A9E" }}
            />
          </ScrollBox>
        </MainWrap>
      </Background>
    </React.Fragment>
  );
}

export default MainChat;

const Background = styled.div`
  width: 100%;
  height: 100vh - 180px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media ${({ theme }) => theme.device.mobile} {
    height: 100vh - 100px;
  }
`;

const MainWrap = styled.div`
  width: 100%;
  margin-top: 70px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media ${({ theme }) => theme.device.mobile} {
    margin-top: 0px;
  }
`;

const IntroWrap = styled.div`
  max-width: 426px;
  width: 100%;
  height: 230px;
  margin: auto;
  @media ${({ theme }) => theme.device.mobile} {
    margin-top: 30px;
    height: 180px;
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
    width: 100px;
    height: 67px;
  }
`;

const InputWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  word-break: keep-all;
  width: 556px;
  height: 24px;
  margin: 10px auto;
  @media ${({ theme }) => theme.device.mobile} {
    width: 262px;
    height: 32px;
  }
`;

const LineBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BtnWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px auto;
  width: 100%;
  max-width: 790px;
  box-sizing: border-box;
  @media ${({ theme }) => theme.device.mobile} {
    flex-direction: column;
    width: 272px;
    height: 110px;
  }
`;

const Btn = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 22px 0px 22px;
  margin: 0px 10px;
  width: 240px;
  height: 102px;
  border: none;
  cursor: pointer;
  background-color: #fff;
  box-shadow: ${(props) =>
    props.checkBox ? "0px 0px 20px rgba(122, 55, 190, 0.2)" : ""};
  border-radius: 20px;
  @media ${({ theme }) => theme.device.mobile} {
    flex-direction: row;
    border-radius: 16px;
    height: 50px;
    padding: 13px 20px;
    margin: 5px 0px;
  }
`;

const TapeCntLine = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 500px;
  @media ${({ theme }) => theme.device.mobile} {
    justify-content: center;
    width: 240px;
  }
`;

const ScrollBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 150px;
  @media ${({ theme }) => theme.device.mobile} {
    margin-top: 100px;
  }
`;
