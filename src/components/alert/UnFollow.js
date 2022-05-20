import React from "react";
import { useDispatch } from "react-redux";

import styled from "styled-components";
import { Text, Button, TextB } from "../../elements";

import { actionCreators } from "../../redux/modules/review";

function UnFollow(props) {
  const dispatch = useDispatch();
  const { closeModal, Follower } = props;
  const [follow, unFollow] = React.useState(false);
  const userFollow = () => {
    unFollow(!follow);
    dispatch(actionCreators.followDB(Follower, follow));
    closeModal();
  };

  return (
    <React.Fragment>
      <CloseContainer>
        <LineBox>
          <Text headline color="#2E2A32" size="16px">
            {Follower}
          </Text>
          <TextB size="16px" color="#2E2A32">
            님 찜을 해제할까요?
          </TextB>
        </LineBox>
        <Text sub4 color="#999999">
          해제된 찜은 마이페이지에서 복구할 수 없어요
        </Text>
        <BottomBox>
          <Button
            secondaryDefault
            cursor="pointer"
            size="narrow"
            _onClick={closeModal}
          >
            <Text body4 color="#7A37BE" cursor="pointer">
              돌아가기
            </Text>
          </Button>
          <Button
            primaryDefault
            shadow="0px 0px 20px rgba(172, 151, 197, 0.25)"
            cursor="pointer"
            size="narrow"
            _onClick={userFollow}
          >
            <Text body4 color="#fff" cursor="pointer">
              해제하기
            </Text>
          </Button>
        </BottomBox>
      </CloseContainer>
    </React.Fragment>
  );
}

export default UnFollow;

const CloseContainer = styled.div`
  width: 550px;
  height: 260px;
  padding: 60px 0px;
  box-sizing: border-box;
  background: #ffffff;
  border-radius: 20px;
`;

const LineBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const BottomBox = styled.div`
  width: 296px;
  height: 40px;
  margin: 40px auto;
  padding: 0px 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
