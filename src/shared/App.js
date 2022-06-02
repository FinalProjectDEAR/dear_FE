import React, { lazy, Suspense } from "react";

import { Switch, Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";

import { history } from "../redux/configureStore";

import { ThemeProvider } from "styled-components";
import theme from "../styles/theme";
import "./App.css";

//HOC
import PrivateRoute from "../shared/auth/PrivateRoute";

//컴포넌트
import ScrollToTop from "../components/ScrollToTop";
import FixedBtn from "../components/FixedBtn";
import Loading from "../pages/Loading";

//기본 로드 페이지
import ReqChatStart from "../pages/ReqChatStart";
import ResChatStart from "../pages/ResChatStart";
import AudioRoom from "../pages/AudioRoom";
import Main from "../pages/Main";
import LoadingMatch from "../pages/LoadingMatch";
import NotFound from "../pages/NotFound";
import Intro from "../pages/Intro";
import reqReview from "../pages/ReqReview.js";
import resReview from "../pages/ResReview.js";

//레이지 로딩 페이지
const Login = lazy(() => import("../pages/Login"));
const KakaoAuthHandle = lazy(() => import("../pages/KakaoAuthHandle"));
const Signup = lazy(() => import("../pages/Signup"));
const MemberInfo = lazy(() => import("../pages/MemberInfo"));
const PostList = lazy(() => import("../pages/PostList"));
const PostWrite = lazy(() => import("../pages/PostWrite"));
const PostDetail = lazy(() => import("../pages/PostDetail"));
const PostEdit = lazy(() => import("../pages/PostEdit"));
const VoteWrite = lazy(() => import("../pages/VoteWrite"));
const SendMsg = lazy(() => import("../pages/SendMsg"));
const ReceivedMsg = lazy(() => import("../pages/ReceivedMsg"));
const ReplyMsg = lazy(() => import("../pages/ReplyMsg"));
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
              <Route path="/" exact component={Main} />
              <Route path="/info" exact component={MemberInfo} />
              <Route path="/Intro" exact component={Intro} />
              <Route path="/user/kakao/callback" component={KakaoAuthHandle} />
              <Route path="/postList/:category" component={PostList} />
              <Route path="/postWrite" exact component={PostWrite} />
              <Route path="/postDetail/:postId" exact component={PostDetail} />
              <Route path="/postEdit/:postId" exact component={PostEdit} />
              <Route path="/VoteDetail/:postId" exact component={VoteDetail} />
              <Route path="/voteWrite" exact component={VoteWrite} />
              <Route path="/startReq" exact component={ReqChatStart} />
              <Route path="/startRes" exact component={ResChatStart} />
              <Route path="/AudioRoom/:sessionId" component={AudioRoom} />
              <Route path="/loading" exact component={Loading} />
              <Route path="/sendMsg" exact component={SendMsg} />
              <Route path="/replyMsg/:messageId" exact component={ReplyMsg} />
              <Route
                path="/receivedMsg/:messageId"
                exact
                component={ReceivedMsg}
              />
              <PrivateRoute Component={MyPage} path="/myPage" exact />
              <PrivateRoute
                Component={Notification}
                path="/notification"
                exact
              />
              <Route path="/editMyPage" exact component={EditMyPage} />
              <Route path="/LoadingMatch" exact component={LoadingMatch} />
              <Route path="/resReview" exact component={resReview} />
              <Route path="/reqReview" exact component={reqReview} />
              <Route path="/signup" exact component={Signup} />
              <Route path="/login" exact component={Login} />
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
