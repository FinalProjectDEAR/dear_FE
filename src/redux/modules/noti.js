import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { api } from "../../shared/apis";

//액션
const GET_NOTI = "GET_NOTI ";

//초기값
const initialState = {
  noti: [],
};

//액션 생성 함수
const getNoti = createAction(GET_NOTI, (alarm) => alarm);

//미듈웨어
const getNotiDB = (token) => {
  console.log("알람토큰", token);
  const currentToken = localStorage.getItem("currentToken");
  return function (dispatch, getState, { history }) {
    try {
      api.get("alarm/all", { currentToken }).then((res) => {
        console.log("알람가져오기", res.data);
        dispatch(getNoti(res.data));
      });
    } catch (err) {
      console.log("알람가져오기 err", err);
      window.alert("알림정보를 가져올 수 없습니다.");
    }
  };
};

export default handleActions(
  {
    [GET_NOTI]: (state, action) =>
      produce(state, (draft) => {
        // console.log("리듀서 알림 가져오기", action.payload);
        draft.noti = action.payload;
      }),
  },
  initialState
);

const actionCreators = {
  getNotiDB,
  getNoti,
};

export { actionCreators };
