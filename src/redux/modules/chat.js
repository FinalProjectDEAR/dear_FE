import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { actionCreators as imageActions } from "./image";

import { apis } from "../../shared/apis";
// import { apis } from "../../shared/apisDev";
import Swal from "sweetalert2";
import "../../styles/libraryStyle/style.css";

// actions
const SET_ROOM_AUTH = "SET_ROOM_AUTH";
const GET_INFO = "GET_INFO";

// action creators
const setRoomAuth = createAction(SET_ROOM_AUTH, (sessionInfo) => sessionInfo);
const getChatInfo = createAction(GET_INFO, (chatInfo) => chatInfo);

// initialState
const initialState = {
  chatInfo: {
    reqTitle: "한줄 고민",
    imageUrl: ["url", "url", "url"],
    reqMemberId: "",
    reqNickname: "비둘기구구",
    reqTag: [],
    reqColor: "#fff",
    reqGender: "male",
    reqAge: "20대 초반",
    reqLoveType: "연상",
    reqLovePeriod: "6개월 이하",

    resMemberId: "",
    resNickname: "비둘기구구",
    resColor: "#fff",
    resTag: [],
    resGender: "male",
    resAge: "20대 초반",
    resLoveType: "연상",
    resLovePeriod: "6개월 이하",
    createdAt: "mm-hh",
  },
  roomAuthInfo: { role: "", sessionId: "", token: "" },
};

//middlewares

const reqChatDB = (payload) => {
  return async function (dispatch, getState, { history }) {
    try {
      const formData = new FormData();

      payload.chatFile.map((e, idx) => {
        return formData.append("imgList", e);
      });
      formData.append("reqTitle", payload.chatTitle);
      formData.append("reqGender", payload.gender);
      formData.append("reqCategory", payload.category);

      const { data } = await apis.reqChat(formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const sessionId = data.data.sessionId;
      dispatch(setRoomAuth(data.data));
      dispatch(imageActions.delData());
      history.push(`/AudioRoom/${sessionId}`);
    } catch (err) {
      Swal.fire("리스너 매칭에 실패하였습니다.");
    }
  };
};

const resChatDB = (category) => {
  return async function (dispatch, getState, { history }) {
    try {
      const { data } = await apis.resChat({ resCategory: category });
      const sessionId = data.data.sessionId;
      dispatch(setRoomAuth(data.data));
      history.push(`/AudioRoom/${sessionId}`);
    } catch (err) {
      Swal.fire("고민러 매칭에 실패하였습니다.");
    }
  };
};

const getChatInfoDB = (sessionId) => {
  return async function (dispatch, getState, { history }) {
    try {
      const { data } = await apis.getChat(sessionId);
      const chatInfo = data.data;
      dispatch(getChatInfo(chatInfo));
    } catch {
      history.replace("/");
    }
  };
};

const closeChatDB = (sessionId, time) => {
  return async function (dispatch, getState, { history }) {
    try {
      const { data } = await apis.closeChat(sessionId, time);
    } catch {
      history.replace("/");
    }
  };
};

const disConnectDB = (sessionId, role) => {
  return async function (dispatch, getState, { history }) {
    try {
      const { data } = await apis.disConnect(sessionId);

      history.replace("/");
    } catch {
      history.replace("/");
    }
  };
};

// reducer
export default handleActions(
  {
    [SET_ROOM_AUTH]: (state, action) =>
      produce(state, (draft) => {
        draft.roomAuthInfo.role = action.payload.role;
        draft.roomAuthInfo.sessionId = action.payload.sessionId;
        draft.roomAuthInfo.token = action.payload.token;
      }),
    [GET_INFO]: (state, action) =>
      produce(state, (draft) => {
        draft.chatInfo = action.payload;
      }),
  },
  initialState
);

const actionCreators = {
  reqChatDB,
  resChatDB,
  getChatInfoDB,
  closeChatDB,
  disConnectDB,
};

export { actionCreators };
