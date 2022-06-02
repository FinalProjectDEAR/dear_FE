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
  position: relative;
  ${({ theme }) => theme.common.flexCenter};
  --size: 77px;
  width: var(--size);
  height: var(--size);
  border-radius: var(--size);
  border: 4px solid #948a9e;
  background-color: #fff;
  @media ${({ theme }) => theme.device.mobile} {
    --size: 47px;
    border: 2px solid #948a9e;
  }
`;

const InnerCircle = styled.div`
  position: absolute;
  left: 4px;
  ${({ theme }) => theme.common.flexCenter};
  --size: 69px;
  width: var(--size);
  height: var(--size);
  border-radius: var(--size);
  background-color: ${(props) => props.color};
  @media ${({ theme }) => theme.device.mobile} {
    --size: 41px;
    top: 3px;
    left: 3px;
  }
`;
