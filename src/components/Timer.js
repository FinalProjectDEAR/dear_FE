import { useState, useRef, useEffect } from "react";
import { useInterval } from "../shared/hooks";

import styled from "styled-components";
import { Text, ColorBadge } from "../elements";
import { actionCreators as chatActions } from "../redux/modules/chat";

export default function Timer({ targetTime, leaveSession }) {
  const data = new Date();
  const remain = Math.floor((new Date(targetTime) - data) / 1000, 10);
  console.log(remain);

  const isNotYet = useResultOfIntervalCalculator(
    () => new Date(targetTime) - new Date() > 0,
    10
  );
  return (
    <div>
      <TimerView targetTime={targetTime} leaveSession={leaveSession} />
    </div>
  );
}

Timer.defaultProps = {
  targetTime: "",
};

function TimerView({ targetTime, leaveSession }) {
  const remain = useResultOfIntervalCalculator(() =>
    Math.floor((new Date(targetTime) - new Date()) / 1000, 10)
  );

  useEffect(() => {
    if (remain <= 0) {
      leaveSession();
    }
    return;
  });

  return (
    <TimerBox>
      {remain ? (
        <Text body margin="5px">
          {parseInt(remain / 60)} : {remain % 60}
        </Text>
      ) : (
        <Text body margin="5px">
          매칭 대기 중
        </Text>
      )}

      <div style={{ display: "flex", justifyContent: "center" }}>
        <ColorBadge size="6" bg="#948A9E" margin="0px 2px" />
        <ColorBadge size="6" bg="#948A9E" margin="0px 2px" />
        <ColorBadge size="6" bg="#948A9E" margin="0px 2px" />
        <ColorBadge size="6" bg="#948A9E" margin="0px 2px" />
        <ColorBadge size="6" bg="#948A9E" margin="0px 2px" />
      </div>
    </TimerBox>
  );
}

const useResultOfIntervalCalculator = (calculator, delay) => {
  const [result, setResult] = useState(calculator());
  useInterval(() => {
    const newResult = calculator();
    if (newResult !== result) setResult(newResult);
  }, delay);

  return result;
};

const TimerBox = styled.div`
  width: 110px;
  height: 44px;
  background-color: #f8f8f8;
  border-radius: 4px;
  padding: 4px;
  box-sizing: border-box;
`;
