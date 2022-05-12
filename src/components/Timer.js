import { useState } from "react";
import { useInterval } from "../shared/hooks";
import { Text, ColorBadge } from "../elements";

export default function Timer(props) {
  const data = new Date();
  const remain = Math.floor((new Date(props.targetTime) - data) / 1000, 10);
  console.log(remain);

  const isNotYet = useResultOfIntervalCalculator(
    () => new Date(props.targetTime) - new Date() > 0,
    10
  );
  return (
    <div>
      <TimerView targetTime={props.targetTime} />
    </div>
  );
}

Timer.defaultProps = {
  targetTime: "",
};

function TimerView({ targetTime }) {
  const remain = useResultOfIntervalCalculator(() =>
    Math.floor((new Date(targetTime) - new Date()) / 1000, 10)
  );
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
          {remain}
        </Text>
      ) : (
        <Text weight="700" size="20px" margin="5px">
          "매칭 대기 중"
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
