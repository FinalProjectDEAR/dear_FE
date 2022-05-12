import React, { Component } from "react";

import styled from "styled-components";
import { ColorBadge } from "../elements";

function UserAudioComponent(props) {
  console.log("streamManager:", props);
  const audioRef = React.useRef();

  React.useEffect(() => {
    if (props.streamManager && !!audioRef) {
      props.streamManager.addVideoElement(audioRef.current);
    }
    return () => {};
  }, []);

  return (
    <OuterCircle
      streamManager={props.streamManager}
      autoPlay={true}
      ref={audioRef}
    >
      <ColorBadge bg={props.color} size="60" position="absolute" />
    </OuterCircle>
  );
}

export default UserAudioComponent;

const OuterCircle = styled.video`
  --size: 70px;
  width: var(--size);
  height: var(--size);
  border-radius: var(--size);
  display: flex;
  justify-content: center;
  align-items: center;
  border: 4px solid #948a9e;
  background-color: #fff;
  position: relative;
  margin: 0px 20px;
`;
