import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

import { apis } from "../../shared/apis";

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

    reqNickname: "비둘기구구",
    reqTag: [],
    reqColor: "#fff",
    reqGender: "male",
    reqAge: "20대 초반",
    reqLoveType: "연상",
    reqLovePeriod: "6개월 이하",

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

const getChatInfoDB = (sessionId) => {
  return async function (dispatch, getState, { history }) {
    console.log("채팅정보 통신시작", sessionId);
    try {
      const { data } = await apis.getChat(sessionId);
      const chatInfo = data.data;
      dispatch(getChatInfo(chatInfo));
    } catch {
      alert("채팅방 정보를 불러오지 못했습니다.");
      history.replace("/");
    }
  };
};

const reqChatDB = (payload) => {
  return async function (dispatch, getState, { history }) {
    console.log("리스너매칭 통신시작", payload);
    try {
      const formData = new FormData();

      payload.fileList.map((e, idx) => {
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
      console.log(data);
      const sessionId = data.data.sessionId;
      console.log(sessionId);
      dispatch(setRoomAuth(data.data));
      history.push(`/AudioRoom/${sessionId}`);
    } catch (err) {
      console.log(err, "리스너 매칭에 실패하였습니다.");
      window.alert("리스너 매칭에 실패하였습니다.");
    }
  };
};

const resChatDB = (category) => {
  return async function (dispatch, getState, { history }) {
    console.log("고민러 매칭 통신시작", category);
    try {
      const { data } = await apis.resChat({ resCategory: category });
      console.log(data);
      const sessionId = data.data.sessionId;
      dispatch(setRoomAuth(data.data));
      history.push(`/AudioRoom/${sessionId}`);
    } catch (err) {
      console.log(err, "고민러 매칭에 실패하였습니다.");
      window.alert("고민러 매칭에 실패하였습니다.");
    }
  };
};

// reducer
export default handleActions(
  {
    [SET_ROOM_AUTH]: (state, action) =>
      produce(state, (draft) => {
        console.log("리덕스 방정보", action.payload);
        draft.roomAuthInfo.role = action.payload.role;
        draft.roomAuthInfo.sessionId = action.payload.sessionId;
        draft.roomAuthInfo.token = action.payload.token;
      }),
    [GET_INFO]: (state, action) =>
      produce(state, (draft) => {
        console.log("채팅방 컨텐츠", action.payload);
        draft.chatInfo = action.payload;
      }),
  },
  initialState
);

const actionCreators = {
  reqChatDB,
  resChatDB,
};

export { actionCreators };
