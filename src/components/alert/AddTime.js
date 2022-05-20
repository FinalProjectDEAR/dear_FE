import React from "react";
import { history } from "../../redux/configureStore";

import styled from "styled-components";
import { Text, TextB, Button } from "../../elements";

function AddTime(props) {
  const { addTimeClose, sendContinueSignal, wantMore } = props;

  const leftOver = 5 - parseInt(wantMore.agree.length / 2);

  return (
    <React.Fragment>
      <CloseContainer>
        <LineBox>
          <TextB subTitle margin="5px">
            상담 종료 30초 전이에요. 상담을 연장할까요?
          </TextB>
          <Text sub4 color="#999999">
            나와 상대방 모두 연장하기를 클릭 상담이 자동으로 연장됩니다. (남은
            연장 횟수 ({leftOver}/5)
          </Text>
        </LineBox>

        <BottomBox>
          <Button
            secondaryDefault
            size="narrow"
            margin="0px 8px"
            _onClick={addTimeClose}
          >
            <Text body4 color="#7A37BE" cursor="pointer">
              돌아가기
            </Text>
          </Button>
          <Button
            primaryDefault
            size="narrow"
            margin="0px 8px"
            _onClick={() => {
              sendContinueSignal();
              addTimeClose();
            }}
          >
            <Text body4 color="#fff" cursor="pointer">
              연장하기
            </Text>
          </Button>
        </BottomBox>
      </CloseContainer>
    </React.Fragment>
  );
}

export default AddTime;

const CloseContainer = styled.div`
  width: 550px;
  height: 260px;
  padding: 60px 0px;
  box-sizing: border-box;
  background: #ffffff;
  border-radius: 20px;
  @media ${({ theme }) => theme.device.mobile} {
    padding-top: 30px;
    width: 320px;
    height: 234px;
    border-radius: 10px;
  }
`;

const LineBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media ${({ theme }) => theme.device.mobile} {
    margin: auto;
    width: 250px;
    word-break: keep-all;
  }
`;

const BottomBox = styled.div`
  height: 36px;
  margin: 50px auto;
  padding: 0px 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
