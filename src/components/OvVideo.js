import React from "react";
import styled from "styled-components";
import { ColorBadge } from "../elements";

function OpenViduVideoComponent(props) {
  const audioRef = React.useRef();

  React.useEffect(() => {
    if (props.streamManager && !!audioRef) {
      props.streamManager.addVideoElement(audioRef.current);
    }
    return () => {};
  }, []);

  return (
    <OuterCircle autoPlay={true} ref={audioRef} color={props.color}>
      <ColorBadge size="60" position="absolute" />
    </OuterCircle>
  );
}

export default OpenViduVideoComponent;

const OuterCircle = styled.video`
  --size: 68px;
  width: var(--size);
  height: var(--size);
  border-radius: var(--size);
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.color};
  position: relative;
`;
