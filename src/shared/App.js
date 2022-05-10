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

function App() {
  return (
    <div className="App">
      <ConnectedRouter history={history}>
        <Header />
        <Wrapper>
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
