import React from "react";

import styled from "styled-components";
import Footer from "./Footer";
import Header from "./Header";

function Layout(props) {
  return (
    <div id="1">
      <Header />
      <Content>{props.children}</Content>
      <Footer />
    </div>
  );
}

export default Layout;

const Content = styled.div`
  min-height: calc(100% - 320px);
`;
