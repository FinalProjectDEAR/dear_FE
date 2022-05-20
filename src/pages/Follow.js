import React from "react";
import styled from "styled-components";
import { Text, ColorBadge, Modal } from "../elements";
import { ReactComponent as UnFollower } from "../assets/찜해제.svg";
import { ReactComponent as Msg } from "../assets/Group 493.svg";
//시간알려주는패키지
import TimeCounting from "time-counting";
//페이지
import UnFollow from "../components/alert/UnFollow";

const Follow = () => {
  //모달
  const [modalOpen, setModalOpen] = React.useState(false);
  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };
  return (
    <FollowWrapper>
      <FollowContainer>
        <ColorBox>
          <ColorBadge
            border="2px solid #F8F8F8"
            size="40"
            bg="#43BDE3"
            cursor="pointer"
          />
        </ColorBox>
        <Text body4 color="#333333">
          내연애는못하는사람
        </Text>
        <Text sub color="#999999">
          3시간 전
        </Text>
        <BtnBox>
          <UnFollower
            style={{ cursor: "pointer" }}
            onClick={() => {
              setModalOpen(true);
            }}
          />
          {modalOpen && (
            <Modal closModal={closeModal}>
              <UnFollow closeModal={closeModal} />
            </Modal>
          )}
          <Msg style={{ cursor: "pointer" }} />
        </BtnBox>
      </FollowContainer>
    </FollowWrapper>
  );
};
const FollowWrapper = styled.div`
  width: 186px;
  height: 186px;
  background-color: #fafafa;
`;
const FollowContainer = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const ColorBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px auto;
`;
const BtnBox = styled.div`
  width: 70px;
  height: 30px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 14px auto;
`;
export default Follow;
