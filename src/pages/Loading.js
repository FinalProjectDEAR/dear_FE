import React from "react";
//스타일
import styled, { keyframes } from "styled-components";
//컴포넌트
import NoMatch from "../components/alert/NoMatch";

function Loading({ informClose, leaveSession }) {
  return (
    <React.Fragment>
      <LoaderWrapper>
        <Loader>
          <InnerSpinner>
            <Circle />
            <Circle />
            <Circle />
          </InnerSpinner>
        </Loader>
      </LoaderWrapper>
    </React.Fragment>
  );
}

export default Loading;

const LoaderWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  background: #bb9ed8;
`;

const Loader = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  @keyframes {
    transform: translate(-50%, -50%);
  }
`;

const InnerSpinner = styled.div`
  position: relative;
  -webkit-transform: translateY(-25px);
  transform: translateY(-25px);
`;

const MultipleBall = keyframes`
  0% {
    transform: scale(0.1);
    opacity: 1;
  }
  70% {
    transform: scale(1);
    opacity: 0.7;
  }
  100% {
    opacity: 0.0;
  }
`;

const Circle = styled.div`
  position: absolute;
  top: -2px;
  left: -26px;
  width: 50px;
  height: 50px;
  border-radius: 100%;
  border: 2px solid #fff;
  animation: ${MultipleBall} 1.25s 0s infinite;
  animation-duration: 1.25s;
  animation-timing-function: cubic-bezier(0.21, 0.53, 0.56, 0.8);
  animation-delay: 0s;
  animation-iteration-count: infinite;
  animation-direction: normal;
  animation-fill-mode: none;
  animation-play-state: running;
  animation-name: ${MultipleBall};
`;
