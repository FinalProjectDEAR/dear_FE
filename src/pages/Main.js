import React from "react";

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
    </React.Fragment>
  );
}

export default Main;
