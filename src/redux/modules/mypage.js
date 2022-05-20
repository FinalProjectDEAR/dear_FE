import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { api } from "../../shared/apis";

//액션
const GET_POST_LIST = "GET_POST_LIST";

//초기값
const initialState = {
  postList: [],
  page: [],
};

//액션 생성 함수
const getPostList = createAction(GET_POST_LIST, (post) => ({
  post,
}));

//미듈웨어
const getPostListDB = (page) => {
  console.log(page);
  return function (dispatch, getState, { history }) {
    try {
      api.get(`/user/Info/board/${page}`, {}).then((res) => {
        console.log("마이페이지 익명게시판리스트:", res.data.data);
        dispatch(getPostList(res.data.data));
      });
    } catch (err) {
      console.log("익명게시판 리스트 error", err);
    }
  };
};

export default handleActions(
  {
    [GET_POST_LIST]: (state, action) =>
      produce(state, (draft) => {
        console.log(action.payload);
        draft.post = action.payload.post;
      }),
  },
  initialState
);

const actionCreators = {
  getPostList,
  getPostListDB,
};

export { actionCreators };
