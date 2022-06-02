import React from "react";
import styled from "styled-components";
import { ReactComponent as EmptyMsgIcon } from "../assets/empty/empty3.svg";
import { ReactComponent as EmptyMsg } from "../assets/empty/Group 561.svg";

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
  height: 350px;
  @media ${({ theme }) => theme.device.isMobile} {
    padding: 100px;
  }
`;
export default EmptyMSG;
