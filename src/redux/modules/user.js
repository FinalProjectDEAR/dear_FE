import axios from "axios";
import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis } from "../../shared/apis";
import jwtDecode from "jwt-decode";
import Swal from "sweetalert2";
import "../../styles/libraryStyle/style.css";

// actions
const LOG_OUT = "LOG_OUT";
const GET_USER = "GET_USER";
const SET_USER = "SET_USER";
const GET_INFO = "GET_INFO";
const SET_ID_MSG = "SET_ID_MSG";
const SET_NICK_MSG = "SET_NICK_MSG";

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
const setIdMessage = createAction(SET_ID_MSG, (msg) => msg);
const setNickMessage = createAction(SET_NICK_MSG, (msg) => msg);

// initialState
const initialState = {
  memberId: null,
  nickname: null,
  isLogin: false,
  userInfo: null,
  followList: null,
  historyList: null,
  idMsg: false,
  nickMsg: false,
};

// middleware actions
const signupDB = (memberId, pwd, pwdCheck) => {
  return async function (dispatch, getState, { history }) {
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
      Swal.fire("회원가입이 완료되었습니다.");

      // dispatch(setUser(userInfo));
      history.replace("/");
    } catch (err) {
      console.log(err);
      Swal.fire("회원가입이 실패했습니다. 다시 시도해주세요.");
    }
  };
};

const loginDB = (memberId, pwd) => {
  return async function (dispatch, getState, { history }) {
    try {
      const { data } = await axios.post(
        process.env.REACT_APP_URL + "/user/login",
        {
          memberId: memberId,
          password: pwd,
        }
      );
      let accessToken = data.data.accessToken;
      let refreshToken = data.data.refreshToken;

      const tokenData = jwtDecode(accessToken);
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("memberId", memberId);
      localStorage.setItem("isLogin", true);

      if (tokenData.nick) {
        history.replace("/main");
        const nickname = tokenData.nick;
        localStorage.setItem("nickname", nickname);
        dispatch(setUser(memberId, nickname));
      } else {
        history.push("/info");
      }
    } catch (err) {
      console.log(err);
      Swal.fire("일치하는 회원정보가 없습니다. 회원가입을 해주세요.");
    }
  };
};

const kakaoLogin = (code) => {
  return async function (dispatch, getState, { history }) {
    try {
      const { data } = await axios.get(
        process.env.REACT_APP_URL + `/user/kakao/callback?code=${code}`
      );
      let accessToken = data.data.accessToken;
      let refreshToken = data.data.refreshToken;

      const tokenData = jwtDecode(accessToken);
      localStorage.setItem("accessToken", accessToken);

      localStorage.setItem("isLogin", true);

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
      console.log(err);
      Swal.fire("다시 시도해주세요.");
      history.replace("/");
    }
  };
};

const memberInfoDB = (memberId, memberInfo) => {
  return async function (dispatch, getState, { history }) {
    try {
      const { data } = await apis.sendInfo(memberInfo);

      const nickname = memberInfo.nickname;
      localStorage.setItem("memberId", memberId);
      localStorage.setItem("nickname", nickname);
      dispatch(setUser(memberId, nickname));
      history.replace("/main");
    } catch (err) {
      console.log(err);
      Swal.fire("회원등록에 실패하였습니다. 다시 시도해주세요.");
    }
  };
};

const getUserInfoDB = () => {
  return async function (dispatch, getState, { history }) {
    try {
      const { data } = await apis.getUserInfo();

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
      console.log(err);
      Swal.fire("유저정보 조회에 실패하였습니다. 다시 시도해주세요.");
    }
  };
};

const logoutDB = (memberId) => {
  return async function (dispatch, getState, { history }) {
    try {
      await apis.logout(memberId);
      localStorage.removeItem("nickName");
      localStorage.removeItem("memberId");
      localStorage.removeItem("isLogin");
    } catch (err) {
      console.log(err);
    }
  };
};
const dupMemberIdDB = (memberId) => {
  return async function (dispatch, getState, { history }) {
    try {
      const { data } = await axios.post(
        process.env.REACT_APP_URL + "/user/memberIdCheck",
        {
          memberId: memberId,
        }
      );
      dispatch(setIdMessage(true));
    } catch (err) {
      console.log(err);
      dispatch(setIdMessage(false));
    }
  };
};

const dupNicknameDB = (nickname) => {
  return async function (dispatch, getState, { history }) {
    try {
      const { data } = await apis.nickCheck(nickname);
      dispatch(setNickMessage(true));
    } catch (err) {
      console.log(err);
      dispatch(setNickMessage(false));
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
        draft.msg = false;
      }),
    [LOG_OUT]: (state, action) =>
      produce(state, (draft) => {
        draft.memberId = null;
        draft.nickname = null;
      }),
    [GET_INFO]: (state, action) =>
      produce(state, (draft) => {
        draft.userInfo = action.payload.userInfo;
        draft.followList = action.payload.followList;
        draft.historyList = action.payload.historyList;
        draft.postList = action.payload.postList;
      }),
    [SET_ID_MSG]: (state, action) =>
      produce(state, (draft) => {
        draft.idMsg = action.payload;
      }),
    [SET_NICK_MSG]: (state, action) =>
      produce(state, (draft) => {
        draft.nickMsg = action.payload;
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
