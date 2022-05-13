import React from "react";
import styled from "styled-components";
import { ReactComponent as Logo } from "../assets/Frame.svg";

import { useHistory } from "react-router-dom";

import logo from "../assets/main/logoS.png";

const Header = (props) => {
  const history = useHistory();
  return (
    <HeaderWrapper id="1">
      <HeaderContainer>
        <HeaderBox>
          <Logo
            onClick={() => {
              history.push("/main");
            }}
            style={{ cursor: "pointer" }}
          />
        </HeaderBox>
      </HeaderContainer>
    </HeaderWrapper>
  );
};
const HeaderWrapper = styled.div`
  /* background-color: #cdb4db; */
  width: 100%;
  height: 160px;
  /* margin: auto; */
`;

const HeaderContainer = styled.div`
  @media (max-width: 1920px) {
    padding: 0px 16px;
    box-sizing: border-box;
  }
`;

const HeaderBox = styled.div`
  display: flex;
  padding-top: 30px;
  padding-bottom: 40px;
  padding-left: 200px;
  background: ##bb9ed8;
`;
export default Header;
