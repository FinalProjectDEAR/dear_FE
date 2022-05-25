import React from "react";
import styled from "styled-components";
import { ReactComponent as EmptyMsg } from "../assets/Empty/상담에 참여하여 리스너 태그를 받아보세요..svg";

const EmptyChat = () => {
  return (
    <React.Fragment>
      <EmptyWrapper>
        <EmptyMsg />
      </EmptyWrapper>
    </React.Fragment>
  );
};
const EmptyWrapper = styled.div``;
export default EmptyChat;
