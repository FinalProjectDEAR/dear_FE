import React from "react";
import styled from "styled-components";
import { ReactComponent as EmptyIcon } from "../assets/Empty/empty2.svg";
import { ReactComponent as EmptyMsg } from "../assets/Empty/Group 560.svg";

const EmptyChat = () => {
  return (
    <React.Fragment>
      <EmptyWrapper>
        <EmptyIcon />
        <EmptyMsg />
      </EmptyWrapper>
    </React.Fragment>
  );
};
const EmptyWrapper = styled.div`
  ${({ theme }) => theme.common.flexCenterColumn};
  /* border: 1px solid red; */
  height: 400px;
`;
export default EmptyChat;
