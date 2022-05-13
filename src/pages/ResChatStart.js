import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Text, Button, Modal } from "../elements";
import { history } from "../redux/configureStore";

import { actionCreators as chatActions } from "../redux/modules/chat";

import styled from "styled-components";

function ResChatStart() {
  const dispatch = useDispatch();
  const [category, setCategory] = React.useState(false);
  const [gender, setGender] = React.useState("");

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
      window.alert("필수정보를 모두 입력해주세요!");
      return;
    }
    const chatInfo = {
      category: category,
      gender: gender,
    };
    dispatch(chatActions.resChatDB(category));
  };

  return (
    <>
      {modalOpen && (
        <Modal closeModal={closeModal}>
          <React.Fragment>
            <ResContainer>
              <LineBox>
                <Text batang weight="500" size="20px" textAlign="left">
                  상담은 어떻게 진행할까요?
                </Text>
                <Text margin="0px 10px" weight="300" size="14px">
                  <span style={{ color: "red", marginRight: "4px" }}> *</span>
                  필수입력
                </Text>
              </LineBox>
              <LineBox>
                <ChatInfoBox>
                  <Text weight="500" size="16px" color="#999999">
                    상담 카테고리
                    <span style={{ color: "red", marginLeft: "4px" }}>*</span>
                  </Text>
                </ChatInfoBox>
                <CategoryBox>
                  <CheckBox>
                    <input
                      type="radio"
                      name="category"
                      value="썸"
                      onChange={(e) => {
                        setCategory(e.target.value);
                      }}
                    />
                    썸
                  </CheckBox>
                  <CheckBox>
                    <input
                      type="radio"
                      name="category"
                      value="고백"
                      onChange={(e) => {
                        setCategory(e.target.value);
                      }}
                    />
                    고백
                  </CheckBox>
                  <CheckBox>
                    <input
                      type="radio"
                      name="category"
                      value="연애중"
                      onChange={(e) => {
                        setCategory(e.target.value);
                      }}
                    />
                    연애중
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
                    이별
                  </CheckBox>
                  <CheckBox>
                    <input
                      type="radio"
                      name="category"
                      value="재회"
                      onChange={(e) => {
                        setCategory(e.target.value);
                      }}
                    />
                    재회
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
                    기타
                  </CheckBox>
                </CategoryBox>
              </LineBox>
              <LineBox>
                <ChatInfoBox>
                  <Text weight="500" size="16px" color="#999999">
                    고민러의 성별
                    <span style={{ color: "red", marginLeft: "4px" }}>*</span>
                  </Text>
                </ChatInfoBox>
                <GenderBox>
                  <CheckBox>
                    <input
                      type="radio"
                      name="gender"
                      value="none"
                      onChange={(e) => {
                        setGender(e.target.value);
                      }}
                    />
                    상관없음
                  </CheckBox>
                  <CheckBox>
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      onChange={(e) => {
                        setGender(e.target.value);
                      }}
                    />
                    남성
                  </CheckBox>
                  <CheckBox>
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      onChange={(e) => {
                        setGender(e.target.value);
                      }}
                    />
                    여성
                  </CheckBox>
                </GenderBox>
              </LineBox>
              <LineBox>
                <Button
                  width="210px"
                  margin="25px auto"
                  bg="#7A37BE"
                  text="고민 들어주기"
                  cursor="pointer"
                  _onClick={submit}
                />
              </LineBox>
            </ResContainer>
          </React.Fragment>
        </Modal>
      )}
    </>
  );
}
export default ResChatStart;

const ResContainer = styled.div`
  width: 840px;
  height: 324px;
  padding: 30px 40px;
  box-sizing: border-box;
  background: #ffffff;
  border-radius: 20px;
`;

const LineBox = styled.div`
  display: flex;
  align-items: center;
  margin: 0px auto;
`;

const ChatInfoBox = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 30%;
  box-sizing: border-box;
`;

const CheckBox = styled.div`
  display: flex;
  align-items: center;
  width: auto;
  height: 24px;
`;

const CategoryBox = styled.div`
  width: 65%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 0px;
`;

const GenderBox = styled.div`
  width: 40%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 0px;
`;
