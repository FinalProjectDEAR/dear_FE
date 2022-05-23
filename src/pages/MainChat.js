import React from "react";
import { Text, TextB } from "../elements";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { actionCreators as mainActions } from "../redux/modules/main";

//assets
import Header from "../components/Header";
import logo from "../assets/main/logoL.png";
import tapeD from "../assets/main/tapeD.png";
import tapeW from "../assets/main/tapeW.png";

import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";

function MainChat() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [checkBox, setCheckBox] = React.useState(false);

  React.useEffect(() => {
    dispatch(mainActions.getTapeDB());
  }, []);

  const tapeCount = useSelector((state) => state.main.tapeCount);

  const startReq = () => {
    if (checkBox !== true) {
      window.alert("이용약관에 동의해주세요.");
      return;
    }
    history.push("/startReq");
  };

  const startRes = () => {
    if (checkBox !== true) {
      window.alert("이용약관에 동의해주세요.");
      return;
    }
    history.push("/startRes");
  };

  return (
    <React.Fragment>
      <Header />
      <Background>
        <MainWrap id="1">
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
            <Text sub6 margin="10px">
              따듯하고 부드러운 언행을 사용하여 상대방과 진솔한 대화를 나누는
              것에 동의합니다.
            </Text>
          </InputWrap>
          <BtnWrap>
            <Btn checkBox={checkBox} onClick={startReq}>
              <TextB
                subtitle
                margin="5px"
                cursor="pointer"
                color={checkBox ? "#fff" : "#2E2A32"}
              >
                고민 들어줄 친구 찾기
              </TextB>
              <LineBox>
                {!checkBox ? (
                  <img
                    src={tapeD}
                    style={{ width: "24px", height: "24px" }}
                    alt="tape"
                  />
                ) : (
                  <img
                    src={tapeW}
                    style={{ width: "24px", height: "24px" }}
                    alt="tape"
                  />
                )}
                <Text
                  sub6
                  margin="0px 5px"
                  color={checkBox ? "#fff" : "#61586A"}
                  cursor="pointer"
                >
                  -1
                </Text>
              </LineBox>
            </Btn>
            <Btn checkBox={checkBox} onClick={startRes}>
              <TextB
                subtitle
                margin="5px"
                cursor="pointer"
                color={checkBox ? "#fff" : "#61586A"}
              >
                친구의 고민 들어주기
              </TextB>
              <LineBox>
                {!checkBox ? (
                  <img
                    src={tapeD}
                    style={{ width: "24px", height: "24px" }}
                    alt="tape"
                  />
                ) : (
                  <img
                    src={tapeW}
                    style={{ width: "24px", height: "24px" }}
                    alt="tape"
                  />
                )}
                <Text
                  sub6
                  margin="0px 5px"
                  color={checkBox ? "#fff" : "#61586A"}
                  cursor="pointer"
                >
                  +1
                </Text>
              </LineBox>
            </Btn>
          </BtnWrap>
          <TapeCntLine>
            <Text sub7>현재 보유 테이프: {tapeCount}</Text>
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
    margin-top: 60px;
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
  background-color: ${(props) => (props.checkBox ? "#61586A" : "#fff")};
  box-shadow: 0px 0px 20px rgba(172, 151, 197, 0.25);
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
`;
