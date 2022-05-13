import React from "react";
import styled from "styled-components";

function OpenViduAudioComponent(props) {
  const audioRef = React.useRef();

  React.useEffect(() => {
    if (props.streamManager && !!audioRef) {
      props.streamManager.addVideoElement(audioRef.current);
    }
    return () => {};
  }, []);

  return <Source autoPlay={true} ref={audioRef} />;
}

export default OpenViduAudioComponent;

const Source = styled.video`
  width: 0.5px;
`;
