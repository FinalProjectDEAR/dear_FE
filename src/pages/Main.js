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
  @media ${({ theme }) => theme.device.isMobile} {
    display: none;
  }
`;

const MobileWrapper = styled.div`
  display: none;
  @media ${({ theme }) => theme.device.isMobile} {
    display: block;
  }
`;

const GoTop = styled.div`
  position: absolute;
  z-index: 10;
  bottom: 410px;
  left: 90%;
  width: 54px;
  height: 54px;
  border-radius: 50%;
  background-color: transparent;
  cursor: pointer;
  @media ${({ theme }) => theme.device.isMobile} {
    bottom: 200px;
    left: 83%;
  }
`;
