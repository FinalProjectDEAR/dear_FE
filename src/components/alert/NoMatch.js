import React from "react";
//스타일
import styled from "styled-components";
import { Text, TextB, Button } from "../../elements";

function NoMatch(props) {
  return (
    <React.Fragment>
      <CloseContainer>
        <LineBox>
          <TextB subTitle>현재 매칭 가능한 친구를 찾을 수 없어요.</TextB>
        </LineBox>
        <BottomBox>
          <Button
            primaryDefault
            size="regular"
            _onClick={() => {
              props.noMatch();
            }}
          >
            <Text body4 color="#fff" cursor="pointer">
              홈으로 돌아가기
            </Text>
          </Button>
        </BottomBox>
      </CloseContainer>
    </React.Fragment>
  );
}

export default NoMatch;

const CloseContainer = styled.div`
  width: 400px;
  height: 200px;
  box-sizing: border-box;
  padding: 35px 0px;
  background: #ffffff;
  border-radius: 20px;
  @media ${({ theme }) => theme.device.mobile} {
    width: 320px;
    height: 146px;
    padding-top: 15px;
    border-radius: 10px;
  }
`;

const LineBox = styled.div`
  ${({ theme }) => theme.common.flexCenter};
  border-radius: 20px;
  @media ${({ theme }) => theme.device.mobile} {
    margin: auto;
  }
`;

const BottomBox = styled.div`
  height: 36px;
  margin: 15px auto;
  padding: 0px 50px;
  ${({ theme }) => theme.common.flexCenter};
`;
