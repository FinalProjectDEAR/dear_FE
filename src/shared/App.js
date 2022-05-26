import React, { lazy, Suspense } from "react";
import "./App.css";

import styled, { ThemeProvider } from "styled-components";
import theme from "../styles/theme";

import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configureStore";

import { Switch } from "react-router-dom";
import { Route } from "react-router-dom";

//컴포넌트
import ScrollToTop from "../components/ScrollToTop";
import FixedBtn from "../components/FixedBtn";
import Loading from "../pages/Loading";

//기본 로드 페이지
import ReqChatStart from "../pages/ReqChatStart";
import ResChatStart from "../pages/ResChatStart";
import HistoryCard from "../components/HistoryCard";
import AudioRoom from "../pages/AudioRoom";
import AudioChat from "../components/AudioChat";
import ChatClose from "../components/alert/ChatClose";
import ResReview from "../pages/ResReview";
import ReqReview from "../pages/ReqReview";
import Main from "../pages/Main";
import MainRanking from "../pages/MainRanking";
import MainHotPost from "../pages/MainHotPost";
import MainReview from "../pages/MainReview";
import MobileRanking from "../components/MobileRanking";
import LoadingMatch from "../pages/LoadingMatch";
import NotFound from "../pages/NotFound";
import Intro from "../pages/Intro";
import MobileIntro from "../pages/MobileIntro";
import ListenerInfo from "../components/ListenerInfo";

//레이지 로딩 페이지
const Login = lazy(() => import("../pages/Login"));
const KakaoAuthHandle = lazy(() => import("../pages/KakaoAuthHandle"));
const Signup = lazy(() => import("../pages/Signup"));
const MemberInfo = lazy(() => import("../pages/MemberInfo"));
const PostList = lazy(() => import("../pages/PostList"));
const PostWrite = lazy(() => import("../pages/PostWrite"));
const PostDetail = lazy(() => import("../pages/PostDetail"));
const CommentList = lazy(() => import("../components/CommentList"));
const PostEdit = lazy(() => import("../pages/PostEdit"));
const VoteWrite = lazy(() => import("../pages/VoteWrite"));
const ImageVote = lazy(() => import("../components/ImageVote"));
const VoteList = lazy(() => import("../components/VoteList"));
const SendMsg = lazy(() => import("../pages/SendMsg"));
const ReceivedMsg = lazy(() => import("../pages/ReceivedMsg"));
const VoteDetail = lazy(() => import("../pages/VoteDetail"));
const MyPage = lazy(() => import("../pages/MyPage"));
const Notification = lazy(() => import("../components/Notification"));
const EditMyPage = lazy(() => import("../pages/EditMyPage"));

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <ConnectedRouter history={history}>
          <ScrollToTop />
          <Suspense fallback={<Loading />}>
            <Switch>
              <Route path="/Intro" exact component={Intro} />
              <Route path="/MobileIntro" exact component={MobileIntro} />
              <Route path="/main" exact component={Main} />
              <Route path="/mainRanking" exact component={MainRanking} />
              <Route path="/mainHotPost" exact component={MainHotPost} />
              <Route path="/mainReview" exact component={MainReview} />
              <Route path="/" exact component={Login} />
              <Route path="/user/kakao/callback" component={KakaoAuthHandle} />
              <Route path="/signup" exact component={Signup} />
              <Route path="/info" exact component={MemberInfo} />
              <Route path="/commentList" exact component={CommentList} />
              <Route path="/postList/:category" component={PostList} />
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
              <Route path="/sendMsg/:messageId" exact component={SendMsg} />
              <Route
                path="/receivedMsg/:messageId"
                exact
                component={ReceivedMsg}
              />
              <Route path="/myPage" exact component={MyPage} />
              <Route path="/notification" exact component={Notification} />
              <Route path="/editMyPage" exact component={EditMyPage} />
              <Route path="/MobileRanking" exact component={MobileRanking} />
              <Route path="/LoadingMatch" exact component={LoadingMatch} />
              <Route path="*" exact component={NotFound} />
            </Switch>
          </Suspense>
          <FixedBtn />
        </ConnectedRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
