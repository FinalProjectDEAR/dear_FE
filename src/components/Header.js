import React from "react";
import styled from "styled-components";

import logo from "../assets/main/logoS.png";

const Header = (props) => {
  return (
    <HeaderWrapper id="1">
      <HeaderContainer></HeaderContainer>
    </HeaderWrapper>
  );
};
const HeaderWrapper = styled.div`
  /* background-color: #cdb4db; */
  width: 100%;
  height: 160px;
  margin: auto;
`;

const HeaderContainer = styled.div`
  /* background-color: pink; */
  margin: auto;
  @media (max-width: 1920px) {
    padding: 0px 16px;
    box-sizing: border-box;
  }
`;

const HeaderBox = styled.div`
  display: flex;
  padding: 50px;
  /* background: ##bb9ed8; */
`;
export default Header;
