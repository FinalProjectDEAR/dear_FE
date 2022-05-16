import { useState, useRef, useEffect } from "react";
import { useInterval } from "../shared/hooks";
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
    <div
      style={{
        width: "110px",
        height: "44px",
        backgroundColor: "#f8f8f8",
        borderRadius: "4px",
      }}
    >
      {remain ? (
        <Text weight="700" size="20px" margin="5px">
          {parseInt(remain / 60)} : {remain % 60}
        </Text>
      ) : (
        <Text weight="700" size="15px" margin="5px">
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
    </div>
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
