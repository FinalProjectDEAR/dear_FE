import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

import { apis } from "../../shared/apis";

// actions
const SET_ROOM_AUTH = "SET_ROOM_AUTH";

// action creators
const setRoomAuth = createAction(SET_ROOM_AUTH, (sessionInfo) => sessionInfo);

// initialState
const initialState = {
  chatInfo: [],
  roomAuthInfo: { role: "", sessionId: "", token: "" },
};

//middlewares

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
      history.push(`/chatRoom/${sessionId}`);
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
      history.push(`/chatRoom/${sessionId}`);
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
  },
  initialState
);

const actionCreators = {
  reqChatDB,
  resChatDB,
};

export { actionCreators };
