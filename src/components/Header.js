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
            style={{
              cursor: "pointer",
              width: "100px",
              height: "66.34px",
            }}
          />
          <div>
            <HeaderBtn>서비스 소개</HeaderBtn>
            <HeaderBtn
              onClick={() => {
                history.push("/postList");
              }}
            >
              디어상담소
            </HeaderBtn>
            <HeaderBtn>마이페이지</HeaderBtn>
          </div>
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
  margin: auto;
  display: flex;
  padding: 30px 20px 40px 100px;
  /* background: #bb9ed8; */
  justify-content: space-between;
`;

const HeaderBtn = styled.button`
  border: none;
  background-color: transparent;
  color: #61586a;
  cursor: pointer;
  line-height: 60px;
`;
export default Header;
