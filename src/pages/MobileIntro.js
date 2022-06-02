import React from "react";
//스타일
import styled from "styled-components";
import { ReactComponent as Info1 } from "../assets/intro/s-info-1m.svg";
import { ReactComponent as Info2 } from "../assets/intro/s-info-2m.svg";
import { ReactComponent as Info3 } from "../assets/intro/s-info-3m.svg";
import { ReactComponent as Info4 } from "../assets/intro/s-info-4m.svg";
import { ReactComponent as Info5 } from "../assets/intro/s-info-5m.svg";

function MobileIntro() {
  return (
    <React.Fragment>
      <Wrapper>
        <ContentBox>
          <Info1
            style={{ width: "240px", marginTop: "160px", marginBottom: "90px" }}
          />
          <Info2 style={{ width: "328px", margin: "90px 0px" }} />
          <Info3 style={{ width: "328px", margin: "90px 0px" }} />
          <Info4 style={{ width: "328px", margin: "90px 0px" }} />
          <Info5
            style={{
              width: "328px",
              margin: "90px 0px",
              marginBottom: "135px",
            }}
          />
        </ContentBox>
      </Wrapper>
    </React.Fragment>
  );
}

export default MobileIntro;

const Wrapper = styled.div`
  display: none;
  justify-content: center;
  align-items: center;
  width: 360px;
  box-sizing: border-box;
  padding: 0px 45px;
  @media ${({ theme }) => theme.device.mobile} {
    padding: 0px;
    ${({ theme }) => theme.common.flexCenterColumn};
  }
`;

const ContentBox = styled.div`
  width: 328px;
  ${({ theme }) => theme.common.flexCenterColumn};
`;
