import React from "react";
import "./App.css";

import styled, { ThemeProvider } from "styled-components";
import theme from "../styles/theme";

import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configureStore";

import { Switch } from "react-router-dom";
import { Route } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";

//pages
import ScrollToTop from "../components/ScrollToTop";
import Login from "../pages/Login";
import KakaoAuthHandle from "../pages/KakaoAuthHandle";
import Signup from "../pages/Signup";
import MemberInfo from "../pages/MemberInfo";
import PostList from "../pages/PostList";
import PostWrite from "../pages/PostWrite";
import PostDetail from "../pages/PostDetail";
import Main from "../pages/Main";
import ResReview from "../pages/ResReview";
import ReqReview from "../pages/ReqReview";
import CommentList from "../components/CommentList";
import PostEdit from "../pages/PostEdit";
import FixedBtn from "../components/FixedBtn";
import VoteWrite from "../pages/VoteWrite";
import ImageVote from "../components/ImageVote";
import VoteList from "../components/VoteList";
import ReqChatStart from "../pages/ReqChatStart";
import ResChatStart from "../pages/ResChatStart";
import HistoryCard from "../components/HistoryCard";
import AudioRoom from "../pages/AudioRoom";
import AudioChat from "../components/AudioChat";
import Loading from "../pages/Loading";
import ChatClose from "../components/alert/ChatClose";
import SendMsg from "../pages/SendMsg";
import ReceivedMsg from "../pages/ReceivedMsg";
import VoteDetail from "../pages/VoteDetail";
import MyPage from "../pages/MyPage";
import Notification from "../components/Notification";

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <ConnectedRouter history={history}>
          <ScrollToTop />
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
            <Route path="/resReview" exact component={ResReview} />
            <Route path="/reqReview" exact component={ReqReview} />
            <Route path="/postEdit/:postId" exact component={PostEdit} />
            <Route path="/VoteDetail/:postId" exact component={VoteDetail} />
            <Route path="/voteList" exact component={VoteList} />
            <Route path="/voteWrite" exact component={VoteWrite} />
            <Route path="/startReq" exact component={ReqChatStart} />
            <Route path="/startRes" exact component={ResChatStart} />
            <Route path="/historyCard" exact component={HistoryCard} />
            <Route path="/historyCard" exact component={HistoryCard} />
            <Route path="/AudioRoom/:sessionId" component={AudioRoom} />
            <Route path="/AudioChat" exact component={AudioChat} />
            <Route path="/loading" exact component={Loading} />
            <Route path="/ChatClose" exact component={ChatClose} />
            <Route path="/sendMsg" exact component={SendMsg} />
            <Route
              path="/receivedMsg/:messageId"
              exact
              component={ReceivedMsg}
            />
            <Route path="/myPage" exact component={MyPage} />
            <Route path="/notification" exact component={Notification} />
            <Section />
          </Wrapper>
          <Section />
          <Footer />
          <FixedBtn />
        </ConnectedRouter>
      </ThemeProvider>
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
