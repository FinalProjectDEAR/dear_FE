import React from "react";
import "./App.css";
import styled from "styled-components";

import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configureStore";

import { Switch } from "react-router-dom";
import { Route } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";

//pages
import Login from "../pages/Login";
import KakaoAuthHandle from "../pages/KakaoAuthHandle";
import Signup from "../pages/Signup";
import MemberInfo from "../pages/MemberInfo";
import PostList from "../pages/PostList";
import PostWrite from "../pages/PostWrite";
import PostDetail from "../pages/PostDetail";
import Main from "../pages/Main";
import Review from "../pages/Review";
import CommentList from "../components/CommentList";
import PostEdit from "../pages/PostEdit";
import FixedBtn from "../components/FixedBtn";
import VoteWrite from "../pages/VoteWrite";
import VoteDetail from "../pages/VoteDetail";
import VoteList from "../components/VoteList";

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
          <Route path="/commentList" exact component={CommentList} />
          <Route path="/main" exact component={Main} />
          <Route path="/postList" exact component={PostList} />
          <Route path="/postWrite" exact component={PostWrite} />
          <Route path="/postDetail/:postId" exact component={PostDetail} />
          <Route path="/review" exact component={Review} />
          <Route path="/postEdit/:postId" exact component={PostEdit} />
          <Route path="/voteWrite" exact component={VoteWrite} />
          <Route path="/voteDetail/:postId" component={VoteDetail} />
          <Route path="/voteList" component={VoteList} />
          <Section />
        </Wrapper>
        <Section />
        <Footer />
        <FixedBtn />
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
