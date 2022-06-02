import React from "react";
//스타일
import styled from "styled-components";
import ReactPageScroller from "react-page-scroller";
//페이지
import MainChat from "./MainChat";
import MainRanking from "./MainRanking";
import MainHotPost from "./MainHotPost";
import MainReview from "./MainReview";

function Main() {
  const [currentPage, setCurrentPage] = React.useState(null);

  const pageChange = (number) => {
    setCurrentPage(number);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const beforePageChange = (number) => {};

  return (
    <React.Fragment>
      <Wrapper>
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
      </Wrapper>
      <MobileWrapper>
        <MainChat />
        <MainRanking />
        <MainHotPost />
        <MainReview />
      </MobileWrapper>
      <GoTop
        onClick={() => {
          pageChange(0);
        }}
      />
    </React.Fragment>
  );
}

export default Main;

const Wrapper = styled.div`
  ${({ theme }) => theme.common.flexCenterColumn};
  width: 100%;
  height: 100%;
  @media ${({ theme }) => theme.device.isMobile} {
    display: none;
  }
`;

const MobileWrapper = styled.div`
  position: relative;
  display: none;
  @media ${({ theme }) => theme.device.isMobile} {
    display: block;
    height: 100%;
  }
`;

const GoTop = styled.div`
  position: fixed;
  z-index: 10;
  bottom: 410px;
  left: 90%;
  width: 54px;
  height: 54px;
  border-radius: 50%;
  background-color: transparent;
  cursor: pointer;
  @media ${({ theme }) => theme.device.isMobile} {
    /* display: none; */
    bottom: 220px;
    left: 83%;
  }
`;
