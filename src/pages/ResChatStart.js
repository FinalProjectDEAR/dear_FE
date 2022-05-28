import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Text, TextB, Button, Modal } from "../elements";
import { history } from "../redux/configureStore";

import { actionCreators as chatActions } from "../redux/modules/chat";

import styled from "styled-components";
import Swal from "sweetalert2";
import "../styles/libraryStyle/style.css";
import arrowBack from "../assets/arrow_back.png";

function ResChatStart() {
  const dispatch = useDispatch();
  const [category, setCategory] = React.useState("");

  const memberId = localStorage.getItem("memberId");

  //모달
  const [modalOpen, setModalOpen] = React.useState(true);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    history.push("/");
  };

  //정보 송부
  const submit = () => {
    if (category === "") {
      Swal.fire("상담 카테고리를 입력해주세요.");
      return;
    } else {
      const chatInfo = {
        category: category,
      };
      dispatch(chatActions.resChatDB(category));
    }
  };

  return (
    <>
      {modalOpen && (
        <Modal closeModal={closeModal}>
          <React.Fragment>
            <ResContainer>
              <ArrowLine>
                <ArrowBack
                  src={arrowBack}
                  onClick={() => {
                    history.goBack();
                  }}
                />
              </ArrowLine>
              <TitleBox>
                <TextB subTitle textAlign="left">
                  상담은 어떻게 진행할까요?
                </TextB>
                <span style={{ color: "red", marginLeft: "10px" }}> *</span>
                <Text sub7 margin="0px 4px">
                  필수입력
                </Text>
              </TitleBox>
              <LineBox>
                <ChatInfoBox>
                  <Text body4>
                    상담 카테고리
                    <span style={{ color: "red", marginLeft: "4px" }}>*</span>
                  </Text>
                </ChatInfoBox>
                <CategoryBox>
                  <CheckBox>
                    <input
                      type="radio"
                      name="category"
                      value="솔로"
                      onChange={(e) => {
                        setCategory(e.target.value);
                      }}
                    />
                    <Text
                      sub6
                      textAlign="center"
                      color="#333"
                      margin="0px 10px"
                    >
                      솔로
                    </Text>
                  </CheckBox>
                  <CheckBox>
                    <input
                      type="radio"
                      name="category"
                      value="짝사랑"
                      onChange={(e) => {
                        setCategory(e.target.value);
                      }}
                    />
                    <Text
                      sub6
                      textAlign="center"
                      color="#333"
                      margin="0px 10px"
                    >
                      짝사랑
                    </Text>
                  </CheckBox>
                  <CheckBox>
                    <input
                      type="radio"
                      name="category"
                      value="썸"
                      onChange={(e) => {
                        setCategory(e.target.value);
                      }}
                    />
                    <Text
                      sub6
                      textAlign="center"
                      color="#333"
                      margin="0px 10px"
                    >
                      썸
                    </Text>
                  </CheckBox>
                  <CheckBox>
                    <input
                      type="radio"
                      name="category"
                      value="연애"
                      onChange={(e) => {
                        setCategory(e.target.value);
                      }}
                    />
                    <Text
                      sub6
                      textAlign="center"
                      color="#333"
                      margin="0px 10px"
                    >
                      연애
                    </Text>
                  </CheckBox>
                  <CheckBox>
                    <input
                      type="radio"
                      name="category"
                      value="이별"
                      onChange={(e) => {
                        setCategory(e.target.value);
                      }}
                    />
                    <Text
                      sub6
                      textAlign="center"
                      color="#333"
                      margin="0px 10px"
                    >
                      이별
                    </Text>
                  </CheckBox>
                  <CheckBox>
                    <input
                      type="radio"
                      name="category"
                      value="기타"
                      onChange={(e) => {
                        setCategory(e.target.value);
                      }}
                    />
                    <Text
                      sub6
                      textAlign="center"
                      color="#333"
                      margin="0px 10px"
                    >
                      기타
                    </Text>
                  </CheckBox>
                </CategoryBox>
              </LineBox>

              <BottomBox>
                <Button
                  primaryDefault
                  size="regular"
                  cursor="pointer"
                  _onClick={submit}
                >
                  <Text body4 color="#fff" cursor="pointer">
                    상담 시작하기
                  </Text>
                </Button>
              </BottomBox>
            </ResContainer>
          </React.Fragment>
          <MobileButton onClick={submit}>
            <Text body4 color="#fff" cursor="pointer" textAlign="center">
              상담 시작하기
            </Text>
          </MobileButton>
        </Modal>
      )}
    </>
  );
}
export default ResChatStart;

const ResContainer = styled.div`
  width: 840px;
  height: 290px;
  padding: 60px 40px;
  box-sizing: border-box;
  background: #ffffff;
  border-radius: 20px;
  @media ${({ theme }) => theme.device.mobile} {
    width: 360px;
    min-height: 700px;
    padding: 44px 20px;
    border-radius: 0px;
  }
`;

const ArrowBack = styled.img`
  display: none;
  width: 24px;
  cursor: pointer;
`;

const ArrowLine = styled.div`
  display: none;
  width: 320px;
  height: 24px;
  margin-bottom: 24px;
  @media ${({ theme }) => theme.device.mobile} {
    display: flex;
    ${ArrowBack} {
      display: flex;
      justify-content: flex-start;
    }
  }
`;

const LineBox = styled.div`
  display: flex;
  align-items: center;
  margin: 0px auto;
  @media ${({ theme }) => theme.device.mobile} {
    flex-direction: column;
    justify-content: flex-start;
    width: 320px;
  }
`;

const TitleBox = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 40px;
  @media ${({ theme }) => theme.device.mobile} {
    margin-bottom: 15px;
  }
`;

const ChatInfoBox = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 30%;
  box-sizing: border-box;
  @media ${({ theme }) => theme.device.mobile} {
    width: 320px;
    height: 26px;
  }
`;

const CheckBox = styled.div`
  display: flex;
  align-items: center;
  width: auto;
  height: 24px;
  @media ${({ theme }) => theme.device.mobile} {
    justify-content: flex-start;
    margin: 5px 0px;
    margin-right: 33px;
  }
`;

const CategoryBox = styled.div`
  width: 428px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 0px;
  @media ${({ theme }) => theme.device.mobile} {
    width: 320px;
    height: 40px;
    flex-wrap: wrap;
    justify-content: flex-start;
    padding: 0px;
    margin-bottom: 20px;
  }
`;

const BottomBox = styled.div`
  width: 100%;
  height: 36px;
  margin: 40px auto;

  @media ${({ theme }) => theme.device.mobile} {
    display: none;
  }
`;

const MobileButton = styled.div`
  display: none;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  width: 360px;
  height: 48px;

  background: #7a37be;
  border-radius: 0px;

  @media ${({ theme }) => theme.device.mobile} {
    display: flex;
    position: fixed;
    bottom: 0;
  }
`;
