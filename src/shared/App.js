import React from "react";
import "./App.css";
import styled from "styled-components";

import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configureStore";

import { Text, Button, Input } from "../elements";

import { Switch } from "react-router-dom";
import { Route } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";

//pages
import Login from "../pages/Login";
import KakaoAuthHandle from "../pages/KakaoAuthHandle";
import Signup from "../pages/Signup";
import MemberInfo from "../pages/MemberInfo";

function App() {
  return (
    <div className="App">
      <ConnectedRouter history={history}>
        <Header />
        <Wrapper>
          <Route path="/" exact component={Login} />
          <Route path="/user/kakao/callback" component={KakaoAuthHandle} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/info" exact component={MemberInfo} />
          <Section />
        </Wrapper>
        <Footer />
      </ConnectedRouter>
    </div>
  );
}

const Wrapper = styled.div`
  min-height: 100vh;
  position: relative;
  width: 100%;
`;
const Section = styled.div`
  padding-bottom: 300px;
`;
export default App;
