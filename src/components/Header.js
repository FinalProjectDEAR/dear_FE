import React from "react";
//리덕스
import { history } from "../redux/configureStore";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
//스타일
import styled from "styled-components";
import { Text, Modal } from "../elements";
import Survey from "./Survey";
import { ReactComponent as Logo } from "../assets/main/Logo.svg";
import Swal from "sweetalert2";
import "../styles/libraryStyle/style.css";

const Header = (props) => {
  const [eventOpen, setEvenOpen] = React.useState(false);

  const openModal = () => {
    setEvenOpen(true);
  };
  const closeModal = () => {
    setEvenOpen(false);
  };

  const dispatch = useDispatch();

  const isUser = useSelector((state) => state.user.isLogin);

  const logout = () => {
    dispatch(userActions.logOut());
    Swal.fire("로그아웃 되었습니다.");
    history.push("/login");
  };

  const gotoMypage = () => {
    if (!isUser) {
      Swal.fire("로그인 후 이용해주세요.");
      history.push("/login");
    } else {
      history.push("/myPage");
    }
  };

  return (
    <React.Fragment>
      <HeaderWrapper id="1">
        <HeaderContainer>
          <HeaderBox>
            <LogoBox>
              <Logo
                onClick={() => {
                  history.push("/");
                }}
                alt="logo"
              />
            </LogoBox>

            <ButtonBox>
              <HeaderBtn
                onClick={() => {
                  history.push("/intro");
                }}
              >
                <Text sub4 cursor="pointer">
                  서비스 소개
                </Text>
              </HeaderBtn>
              <HeaderBtn
                onClick={() => {
                  history.push("/postList/전체");
                }}
              >
                <Text sub4 cursor="pointer">
                  디어상담소
                </Text>
              </HeaderBtn>
              <HeaderBtn onClick={gotoMypage}>
                <Text sub4 cursor="pointer">
                  마이페이지
                </Text>
              </HeaderBtn>
              <HeaderBtn onClick={openModal}>
                <Text sub4 cursor="pointer" color="#7A37BE">
                  설문이벤트
                </Text>
              </HeaderBtn>

              {eventOpen ? (
                <Modal>
                  <Survey close={closeModal} />
                </Modal>
              ) : null}

              {!isUser ? (
                <HeaderBtn
                  onClick={() => {
                    history.push("/login");
                  }}
                >
                  <Text sub4 cursor="pointer">
                    로그인
                  </Text>
                </HeaderBtn>
              ) : (
                <HeaderBtn onClick={logout}>
                  <Text sub4 cursor="pointer">
                    로그아웃
                  </Text>
                </HeaderBtn>
              )}
            </ButtonBox>
            {!isUser ? (
              <MHeaderBtn
                onClick={() => {
                  history.push("/login");
                }}
              >
                <Text sub4 cursor="pointer">
                  로그인
                </Text>
              </MHeaderBtn>
            ) : (
              <MHeaderBtn onClick={logout}>
                <Text sub4 cursor="pointer">
                  로그아웃
                </Text>
              </MHeaderBtn>
            )}
          </HeaderBox>
        </HeaderContainer>
      </HeaderWrapper>
    </React.Fragment>
  );
};

export default Header;

const HeaderWrapper = styled.div`
  width: 100%;
  height: 120px;
  padding: 24px;
  box-sizing: border-box;
  background: rgba(196, 196, 196, 0);
  @media ${({ theme }) => theme.device.mobile} {
    display: flex;
    align-items: flex-end;
    width: 360px;
    height: 80px;
    padding: 10px 9%;
  }
`;

const HeaderContainer = styled.div`
  @media (max-width: 1920px) {
    box-sizing: border-box;
  }

  @media ${({ theme }) => theme.device.mobile} {
    width: 320px;
  }
`;

const LogoBox = styled.div`
  ${({ theme }) => theme.common.flexCenter};
  width: 80px;
  height: 52px;
  cursor: pointer;
  @media ${({ theme }) => theme.device.mobile} {
    width: 60px;
    height: 36px;
  }
`;

const HeaderBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 1032px;
  height: 100%;
  margin: auto;
  @media ${({ theme }) => theme.device.mobile} {
    margin: 0px;
    width: 340px;
  }
`;

const HeaderBtn = styled.button`
  display: flex;
  justify-content: center;
  margin: 0px 10px;
  background-color: transparent;
  color: #61586a;
  border: none;
  line-height: 15px;
  cursor: pointer;
`;

const MHeaderBtn = styled.button`
  display: none;
  justify-content: center;
  align-items: flex-end;
  margin: 0px 5%;
  color: #61586a;
  line-height: 15px;
  border: none;
  background-color: transparent;
  cursor: pointer;
  @media ${({ theme }) => theme.device.mobile} {
    display: flex;
  }
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  @media ${({ theme }) => theme.device.mobile} {
    display: none;
  }
`;
