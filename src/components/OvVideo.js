import React, { Children } from "react";
import styled from "styled-components";
import { ColorBadge } from "../elements";

function OpenViduAudioComponent(props) {
  const audioRef = React.useRef();

  React.useEffect(() => {
    if (props.streamManager && !!audioRef) {
      props.streamManager.addVideoElement(audioRef.current);
    }
    return () => {};
  }, []);

  return (
    <OutterCircle
      streamManager={props.mainStreamManager}
      autoPlay={true}
      ref={audioRef}
    >
      {Children}
    </OutterCircle>
  );
}

export default OpenViduAudioComponent;

const OutterCircle = styled.div`
  --size: 68px;
  width: var(--size);
  height: var(--size);
  border: 4px solid #948a9e;
  background-color: #fff;
  position: relative;
  margin: 0px 20px;
`;
