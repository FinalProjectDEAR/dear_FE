import React, { useState, useRef, useEffect } from "react";
import { useInterval } from "../shared/hooks";

import styled from "styled-components";
import { Text, ColorBadge } from "../elements";

export default function Timer(props) {
  const { targetTime, timeOverSet, askContinue, wantMore } = props;

  const useResultOfIntervalCalculator = (calculator, delay) => {
    const [result, setResult] = useState(calculator());
    useInterval(() => {
      const newResult = calculator();
      if (newResult !== result) setResult(newResult);
    }, delay);

    return result;
  };

  const remain = useResultOfIntervalCalculator(() =>
    Math.floor((new Date(targetTime) - new Date()) / 1000, 10)
  );

  const isContinue = useResultOfIntervalCalculator(() => remain === 30, 10); //테스트 10초마다 연장의사 묻기
  const isTimeOver = useResultOfIntervalCalculator(() => remain === 1, 10);

  React.useEffect(() => {
    if (wantMore.agree.length / 2 < 5 && isContinue) {
      askContinue();
    }
    if (isTimeOver) {
      timeOverSet();
    }
  });

  return (
    <TimerBox>
      {remain ? (
        <Text body margin="5px">
          {parseInt(remain / 60)} : {remain % 60}
        </Text>
      ) : (
        <Text body>대기 중...</Text>
      )}

      {/* <div style={{ display: "flex", justifyContent: "center" }}>
        <ColorBadge size="6" bg="#948A9E" margin="0px 2px" />
        <ColorBadge size="6" bg="#948A9E" margin="0px 2px" />
        <ColorBadge size="6" bg="#948A9E" margin="0px 2px" />
        <ColorBadge size="6" bg="#948A9E" margin="0px 2px" />
        <ColorBadge size="6" bg="#948A9E" margin="0px 2px" />
      </div> */}
    </TimerBox>
  );
}

Timer.defaultProps = {
  targetTime: "",
};

const TimerBox = styled.div`
  width: 110px;
  height: 44px;
  margin: 0px 10px;
  background-color: #f8f8f8;
  border-radius: 4px;
  padding: 4px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media ${({ theme }) => theme.device.mobile} {
    width: 60px;
    height: 24px;
  }
`;
