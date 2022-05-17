import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { api } from "../../shared/apis";

//액션
const GET_MESSAGE = "message/GET_MESSAGE";
const GET_DETAIL_MSG = "message/GET_DETAIL_MSG";
const ADD_MESSAGE = "message/ADD_MESSAGE";

//초기값
const initialState = {
  message: [],
  messages: [],
};

//액션 생성 함수
const getMessage = createAction(GET_MESSAGE, (message) => ({
  message,
}));
const getDetailMessage = createAction(GET_DETAIL_MSG, (message) => ({
  message,
}));
const addMessage = createAction(ADD_MESSAGE, (message, resUser) => ({
  message,
  resUser,
}));

//미듈웨어
const getMessageDB = (page) => {
  return function (dispatch, getState, { history }) {
    try {
      api.get(`/user/Info/message/${page}`, {}).then((res) => {
        // console.log("쪽지 전체가져오기", res.data);
        dispatch(getMessage(res.data));
      });
    } catch (err) {
      console.log("쪽지가져오기", err);
      window.alert("쪽지 리스트를 가져올 수 없습니다.");
    }
  };
};

const getDetailMsgDB = (messageId) => {
  console.log(messageId);
  return function (dispatch, getState, { history }) {
    try {
      api.get(`/message/detail/${messageId}`, {}).then((res) => {
        console.log("쪽지 상세 가져오기", res.data);
        dispatch(getDetailMessage(res.data));
      });
    } catch (err) {
      console.log("쪽지 상세 가져오기", err);
      window.alert("쪽지를 가져올 수 없습니다.");
    }
  };
};

const addMessageDB = (message, resUser) => {
  return function (dispatch, getState, { history }) {
    // console.log("쪽지보내기!", message, resUser);
    try {
      api
        .post(`/message/request`, { message: message, resUser: resUser })
        .then((res) => {
          // console.log("쪽지 추가", res);
          history.push("/myPage");
        });
    } catch (err) {
      console.log(err);
      window.alert("댓글 추가 실패, 다시 시도해 주세요.");
    }
  };
};

export default handleActions(
  {
    // [ADD_MESSAGE]: (state, action) =>
    //   produce(state, (draft) => {
    //     // console.log("리듀서 쪽지추가", action.payload.message.data);
    //     draft.message.unshift(action.payload.message);
    //   }),
    [GET_MESSAGE]: (state, action) =>
      produce(state, (draft) => {
        // console.log("리듀서 쪽지받기", action.payload.message.data);
        draft.message = action.payload.message.data;
      }),
    [GET_DETAIL_MSG]: (state, action) =>
      produce(state, (draft) => {
        // console.log("리듀서 상세 쪽지 받기", action.payload.message.data);
        draft.messages = action.payload.message.data;
      }),
  },
  initialState
);

const actionCreators = {
  addMessageDB,
  addMessage,
  getMessage,
  getMessageDB,
  getDetailMessage,
  getDetailMsgDB,
};

export { actionCreators };
