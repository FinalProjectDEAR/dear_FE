import React, { Component } from "react";
import OpenViduAudioComponent from "./OvAudio";
import styled from "styled-components";

function UserAudioComponent(props) {
  return (
    <div>
      {props.streamManager !== undefined ? (
        <OuterCircle>
          <InnerCircle color={props.color}>
            <OpenViduAudioComponent streamManager={props.streamManager} />
          </InnerCircle>
        </OuterCircle>
      ) : null}
    </div>
  );
}

export default UserAudioComponent;

const OuterCircle = styled.div`
  --size: 77px;
  width: var(--size);
  height: var(--size);
  border-radius: var(--size);
  display: flex;
  justify-content: center;
  align-items: center;
  border: 4px solid #948a9e;
  background-color: #fff;
  position: relative;
`;

const InnerCircle = styled.div`
  --size: 68px;
  width: var(--size);
  height: var(--size);
  border-radius: var(--size);
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.color};
  position: absolute;
`;
