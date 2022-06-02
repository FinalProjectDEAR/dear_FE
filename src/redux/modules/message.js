import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

import { apis } from "../../shared/apis";

import Swal from "sweetalert2";
import "../../styles/libraryStyle/style.css";

//액션
const GET_MESSAGE = "message/GET_MESSAGE";
const GET_DETAIL_MSG = "message/GET_DETAIL_MSG";
const ADD_MESSAGE = "message/ADD_MESSAGE";
const MSG_PAGE = "MSG_PAGE";
const RESET_MSG = "RESET_MSGT";

//초기값
const initialState = {
  message: [],
  messages: [],
  msgPage: [],
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
const msgPage = createAction(MSG_PAGE, (page) => ({ page }));
const resetMsg = createAction(RESET_MSG, () => ({}));

//미듈웨어
//쪽지리스트받기
const getMessageDB = (page) => {
  return async function (dispatch, getState, { history }) {
    try {
      const { data } = await apis.getMsg(page);
      dispatch(getMessage(data));
    } catch (err) {
      console.log(err);
      Swal.fire("쪽지 리스트를 가져올 수 없습니다.");
    }
  };
};
//쪽지자세히보기
const getDetailMsgDB = (messageId) => {
  return async function (dispatch, getState, { history }) {
    try {
      const { data } = await apis.getDetailMsg(messageId);
      dispatch(getDetailMessage(data));
    } catch (err) {
      console.log(err);
      Swal.fire("쪽지를 가져올 수 없습니다.");
    }
  };
};
//쪽지보내기
const addMessageDB = (message, resUserId) => {
  console.log(message, resUserId);
  return async function (dispatch, getState, { history }) {
    try {
      const { data } = await apis.addMsg(message, resUserId);
      history.push("/myPage");
    } catch (err) {
      console.log(err);
      Swal.fire("쪽지보내기에 실패했어요..");
    }
  };
};

export default handleActions(
  {
    [GET_MESSAGE]: (state, action) =>
      produce(state, (draft) => {
        draft.message = action.payload.message.data;
      }),
    [GET_DETAIL_MSG]: (state, action) =>
      produce(state, (draft) => {
        draft.messages = action.payload.message.data;
      }),
    [MSG_PAGE]: (state, action) =>
      produce(state, (draft) => {
        draft.page = action.payload.page;
      }),
    //클린업작업
    [RESET_MSG]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.message = [];
        draft.messages = [];
        draft.msgPage = [];
      }),
  },
  initialState
);

const MsgActionCreators = {
  addMessageDB,
  addMessage,
  getMessage,
  getMessageDB,
  getDetailMessage,
  getDetailMsgDB,
  msgPage,
  resetMsg,
};

export { MsgActionCreators };
