import React, { useState, useRef, useEffect } from "react";

//스타일
import styled from "styled-components";
import { Text, ColorBadge } from "../elements";

import { useInterval } from "../shared/hooks";

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
    <React.Fragment>
      <TimerBox>
        {remain ? (
          <Text title margin="-3px 2px">
            {parseInt(remain / 60)} : {remain % 60}
          </Text>
        ) : (
          <Text body margin="0px 3px">
            대기 중
          </Text>
        )}

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {Array.from({ length: 5 }, (item, idx) => {
            return (
              <ColorBadge
                key={idx}
                size="5"
                bg={
                  idx < 5 - parseInt(wantMore.agree.length / 2)
                    ? "#948A9E"
                    : "#fff"
                }
                margin="0px 2px"
                border="2px solid #948A9E"
              />
            );
          })}
        </div>
      </TimerBox>
      <MTimerBox>
        {remain ? (
          <Text sub margin="2px">
            {parseInt(remain / 60)} : {remain % 60}
          </Text>
        ) : (
          <Text sub margin="0px 3px">
            대기 중
          </Text>
        )}

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {Array.from({ length: 5 }, (item, idx) => {
            return (
              <ColorBadge
                key={idx}
                size="4"
                bg={
                  idx < 5 - parseInt(wantMore.agree.length / 2)
                    ? "#948A9E"
                    : "#fff"
                }
                margin="0px 1px"
                border="1px solid #948A9E"
              />
            );
          })}
        </div>
      </MTimerBox>
    </React.Fragment>
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
  ${({ theme }) => theme.common.flexCenterColumn};
  @media ${({ theme }) => theme.device.mobile} {
    display: none;
  }
`;

const MTimerBox = styled.div`
  display: none;
  width: 60px;
  height: 30px;
  margin: 0px 11px;
  background-color: #f8f8f8;
  border-radius: 4px;
  padding: 5px 8px;
  box-sizing: border-box;
  @media ${({ theme }) => theme.device.mobile} {
    ${({ theme }) => theme.common.flexCenterColumn};
  }
`;
