import React from "react";
import styled from "styled-components";
import { ReactComponent as EmptyMsgIcon } from "../assets/Empty/empty1.svg";
import { ReactComponent as EmptyMsg } from "../assets/Empty/Group 559.svg";

const EmptyMSG = () => {
  return (
    <React.Fragment>
      <EmptyWrapper>
        <EmptyMsgIcon />
        <EmptyMsg />
      </EmptyWrapper>
    </React.Fragment>
  );
};
const EmptyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* border: 1px solid red; */
  height: 400px;
`;
export default EmptyMSG;
