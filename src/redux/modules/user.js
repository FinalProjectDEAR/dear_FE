import axios from "axios";
import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis } from "../../shared/apis";
import jwtDecode from "jwt-decode";

// actions
const LOG_OUT = "LOG_OUT";
const GET_USER = "GET_USER";
const SET_USER = "SET_USER";
const GET_INFO = "GET_INFO";
const SET_MSG = "SET_MSG";

// action creators
const logOut = createAction(LOG_OUT, (memberId) => memberId);
const setUser = createAction(
  SET_USER,
  (memberId, nickname) => (memberId, nickname)
);
const getInfo = createAction(
  GET_INFO,
  (userInfo, followList, historyList, postList) => (
    userInfo, followList, historyList, postList
  )
);
const setMessage = createAction(SET_MSG, (msg) => msg);

// initialState
const initialState = {
  memberId: null,
  nickname: null,
  isLogin: false,
  userInfo: null,
  followList: null,
  historyList: null,
  msg: false,
};

// middleware actions
const signupDB = (memberId, pwd, pwdCheck) => {
  return async function (dispatch, getState, { history }) {
    console.log("회원가입 DB통신");
    try {
      const userInfo = {
        memberId: memberId,
        password: pwd,
        passwordCheck: pwdCheck,
      };
      console.log(userInfo);
      const { data } = await axios.post(
        process.env.REACT_APP_URL + "/user/signup",
        userInfo
      );
      console.log("서버응답", data);

      //   dispatch(setUser(userInfo));
      history.replace("/");
    } catch (err) {
      console.log("회원가입 실패", err);
      window.alert("회원가입이 실패했습니다. 다시 시도해주세요.");
    }
  };
};

const loginDB = (memberId, pwd) => {
  return async function (dispatch, getState, { history }) {
    console.log("로그인 한다!");
    try {
      const { data } = await axios.post(
        process.env.REACT_APP_URL + "/user/login",
        {
          memberId: memberId,
          password: pwd,
        }
      );
      console.log("서버응답", data);
      let accessToken = data.data.accessToken;
      let refreshToken = data.data.refreshToken;

      const tokenData = jwtDecode(accessToken);
      localStorage.setItem("accessToken", accessToken);

      if (tokenData.nick) {
        const nickname = tokenData.nick;
        localStorage.setItem("memberId", memberId);
        localStorage.setItem("nickname", nickname);
        dispatch(setUser(memberId, nickname));
        history.replace("/main");
      } else {
        history.push("/info");
      }
    } catch (err) {
      console.log("로그인 실패", err);
      window.alert("로그인이 실패했습니다. 다시 시도해주세요.");
    }
  };
};

const kakaoLogin = (code) => {
  return async function (dispatch, getState, { history }) {
    console.log(code);
    try {
      const { data } = await axios.get(
        process.env.REACT_APP_URL + `/user/kakao/callback?code=${code}`
      );
      console.log("서버응답", data);
      let accessToken = data.data.accessToken;
      let refreshToken = data.data.refreshToken;

      const tokenData = jwtDecode(accessToken);
      localStorage.setItem("accessToken", accessToken);
      console.log(tokenData);

      if (tokenData.nick) {
        const memberId = tokenData.sub;
        const nickname = tokenData.nick;
        localStorage.setItem("memberId", memberId);
        localStorage.setItem("nickname", nickname);
        dispatch(setUser(memberId, nickname));
        history.replace("/main");
      } else {
        history.push("/info");
      }
    } catch (err) {
      console.log("소셜로그인 에러", err);
      window.alert("카카오로그인에 실패하였습니다. 다시 시도해주세요.");
      history.replace("/");
    }
  };
};

const memberInfoDB = (memberId, memberInfo) => {
  console.log("유저정보 입력 DB 통신");
  return async function (dispatch, getState, { history }) {
    try {
      console.log(memberId, memberInfo);
      const { data } = await apis.sendInfo(memberInfo);
      console.log("서버응답", data);

      const nickname = memberInfo.nickname;
      localStorage.setItem("memberId", memberId);
      localStorage.setItem("nickname", nickname);
      dispatch(setUser(memberId, nickname));
      history.replace("/main");
    } catch (err) {
      console.log("유저정보 등록 에러", err);
      window.alert("등록에 실패하였습니다. 다시 시도해주세요.");
    }
  };
};

const getUserInfoDB = () => {
  return async function (dispatch, getState, { history }) {
    try {
      const { data } = await apis.getUserInfo();
      console.log("서버응답", data);

      const userInfo = {
        memberId: data.data.memberId,
        resTag: data.data.resTag,
        coin: data.data.coin,
        star: data.data.star,
      };
      const followList = data.data.followList;
      const historyList = data.data.chatHistory;
      const postList = data.data.postList;
      dispatch(getInfo(userInfo, followList, historyList, postList));
    } catch (err) {
      console.log("유저정보 조회 에러", err);
      window.alert("유저정보 조회에 실패하였습니다. 다시 시도해주세요.");
    }
  };
};

const logoutDB = (memberId) => {
  return async function (dispatch, getState, { history }) {
    try {
      await apis.logout(memberId);
      localStorage.removeItem("nickName");
      localStorage.removeItem("memberId");
    } catch (err) {
      console.log(err, "로그아웃 실패");
    }
  };
};
const dupMemberIdDB = (memberId) => {
  return async function (dispatch, getState, { history }) {
    console.log("중복체크DB", memberId);
    try {
      const { data } = await axios.post(
        process.env.REACT_APP_URL + "/user/memberIdCheck",
        {
          memberId: memberId,
        }
      );
      console.log(data);
      const msg = "사용 가능한 아이디 입니다.";
      dispatch(setMessage(msg));
    } catch (err) {
      console.log("아이디 중복조회 실패", err);
      const msg = "사용 할 수 없는 아이디 입니다.";
      dispatch(setMessage(msg));
    }
  };
};

const dupNicknameDB = (nickname) => {
  return async function (dispatch, getState, { history }) {
    try {
      console.log("중복체크DB", nickname);
      const { data } = await apis.nickCheck(nickname);
      console.log("서버응답", data);
      const msg = "사용 가능한 닉네임 입니다.";
      dispatch(setMessage(msg));
    } catch (err) {
      console.log("닉네임 중복조회 실패", err);
      const msg = "사용 할 수 없는 닉네임 입니다.";
      dispatch(setMessage(msg));
    }
  };
};

// reducer
export default handleActions(
  {
    [SET_USER]: (state, action) =>
      produce(state, (draft) => {
        draft.memberId = action.payload.memberId;
        draft.nickname = action.payload.nickname;
      }),
    [LOG_OUT]: (state, action) =>
      produce(state, (draft) => {
        draft.memberId = null;
        draft.nickname = null;
      }),
    [GET_INFO]: (state, action) =>
      produce(state, (draft) => {
        console.log("리덕스 마이페이지", action.payload);
        draft.userInfo = action.payload.userInfo;
        draft.followList = action.payload.followList;
        draft.historyList = action.payload.historyList;
        draft.postList = action.payload.postList;
      }),
    [SET_MSG]: (state, action) =>
      produce(state, (draft) => {
        console.log("메세지 리덕스", action.payload);
        draft.msg = action.payload;
      }),
  },
  initialState
);

// action creator export
const actionCreators = {
  logOut,
  loginDB,
  dupMemberIdDB,
  dupNicknameDB,
  memberInfoDB,
  getUserInfoDB,
  signupDB,
  logoutDB,
  kakaoLogin,
};

export { actionCreators };
