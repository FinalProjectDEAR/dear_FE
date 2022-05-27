import React from "react";
import styled from "styled-components";

import { Text, TextB, Button } from "../../elements";
import { history } from "../../redux/configureStore";

function FiveSec() {
  return (
    <React.Fragment>
      <CloseContainer>
        <LineBox>
          <TextB subTitle>
            매칭되었습니다! <br /> 잠시후 채팅이 시작됩니다.
          </TextB>
        </LineBox>
        <BottomBox>
          <LoadingMark>
            <Text body4 cursor="pointer" color="#2E2A32">
              로딩중...
            </Text>
          </LoadingMark>
        </BottomBox>
      </CloseContainer>
    </React.Fragment>
  );
}

export default FiveSec;

const CloseContainer = styled.div`
  width: 400px;
  height: 200px;
  padding: 15px 0px;
  box-sizing: border-box;
  background: #ffffff;
  border-radius: 20px;
  @media ${({ theme }) => theme.device.mobile} {
    padding-top: 15px;
    width: 320px;
    height: 146px;
    border-radius: 10px;
  }
`;

const LineBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  @media ${({ theme }) => theme.device.mobile} {
    margin: auto;
  }
`;

const BottomBox = styled.div`
  height: 36px;
  margin: 15px auto;
  padding: 0px 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoadingMark = styled.div`
  width: 85px;
  height: 85px;
  border-radius: 50%;
  background-color: #d9d9d9;

  display: flex;
  justify-content: center;
  align-items: center;
`;
