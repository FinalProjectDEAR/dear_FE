import React from "react";

import styled from "styled-components";
import ReactPageScroller from "react-page-scroller";

import { Text, TextB } from "../elements";

import MainChat from "./MainChat";
import MainRanking from "./MainRanking";
import MainHotPost from "./MainHotPost";
import MainReview from "./MainReview";

function Main() {
  const [currentPage, setCurrentPage] = React.useState(null);

  const pageChange = (number) => {
    setCurrentPage(number);
  };

  const beforePageChange = (number) => {
    console.log(number);
  };

  return (
    <React.Fragment>
      <ReactPageScroller
        pageOnChange={pageChange}
        onBeforePageScroll={beforePageChange}
        customPageNumber={currentPage}
      >
        <MainChat />
        <MainRanking />
        <MainHotPost />
        <MainReview />
      </ReactPageScroller>
      <GoTop
        onClick={() => {
          pageChange(0);
        }}
      />
    </React.Fragment>
  );
}

export default Main;

const GoTop = styled.div`
  position: absolute;
  z-index: 10;
  bottom: 335px;
  left: 90%;
  width: 54px;
  height: 54px;
  border-radius: 50%;
  background-color: transparent;
  cursor: pointer;
  @media ${({ theme }) => theme.device.isMobile} {
    bottom: 100px;
  }
`;
