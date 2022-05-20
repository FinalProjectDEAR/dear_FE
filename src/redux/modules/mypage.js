import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { api } from "../../shared/apis";

//액션
const GET_POST_LIST = "GET_POST_LIST";
const FOLLOW_LIST = "FOLLOW_LIST";
const FOLLOWER = "FOLLOWER";
const CHAT_LIST = "CHAT_LIST";
const GET_INFO = "GET_INFO";
const ADD_INFO = "ADD_INFO";

//초기값
const initialState = {
  postList: [],
  followList: [],
  follower: [],
  chatList: [],
  user: [],
  userInfo: [],
};

//액션 생성 함수
const getPostList = createAction(GET_POST_LIST, (post) => ({
  post,
}));
const getFollow = createAction(FOLLOW_LIST, (follower) => ({ follower }));
const getFollower = createAction(FOLLOWER, (follower) => ({ follower }));
const getChat = createAction(CHAT_LIST, (chat) => ({ chat }));
const getInfo = createAction(GET_INFO, (user) => ({ user }));
const addInfo = createAction(GET_INFO, (user) => ({ user }));

//내가 작성한 글 가져오기
const getPostListDB = (page) => {
  return function (dispatch, getState, { history }) {
    try {
      api.get(`/user/Info/board/${page}`, {}).then((res) => {
        // console.log("마이페이지 익명게시판리스트:", res.data.data);
        dispatch(getPostList(res.data.data));
      });
    } catch (err) {
      console.log("익명게시판 리스트 error", err);
    }
  };
};
//팔로우한 사람 가져오기
const getFollowDB = (page) => {
  console.log(page);
  return function (dispatch, getState, { history }) {
    try {
      api.get(`/user/Info/follow/${page}`, {}).then((res) => {
        console.log("마이페이지 팔로우리스트:", res.data.data);
        dispatch(getFollow(res.data.data));
      });
    } catch (err) {
      console.log("마이페이지 팔로우리스트: error", err);
    }
  };
};
//상담 히스토리 가져오기
const getChatDB = () => {
  return function (dispatch, getState, { history }) {
    try {
      api.get("/user/Info/chatHistory", {}).then((res) => {
        // console.log("상담 히스토리 가져오기:", res.data.data);
        dispatch(getChat(res.data.data));
      });
    } catch (err) {
      console.log("상담 히스토리 가져오기 error", err);
    }
  };
};
//멤버 인포가져오기
const getInfoDB = () => {
  return function (dispatch, getState, { history }) {
    try {
      api.get("/user/Info/profile", {}).then((res) => {
        console.log("멤버 인포가져오기:", res.data.data);
        dispatch(getInfo(res.data.data));
      });
    } catch (err) {
      console.log("멤버 인포가져오기 error", err);
    }
  };
};
//멤버인포 수정하기
const addInfoDB = (age, color, gender, lovePeriod, loveType, nickname) => {
  return function (dispatch, getState, { history }) {
    try {
      api.post("/user/Info", {}).then((res) => {
        console.log("멤버 인포가져오기:", res.data.data);
        dispatch(addInfo(res.data.data));
      });
    } catch (err) {
      console.log("멤버 인포가져오기 error", err);
    }
  };
};

export default handleActions(
  {
    [GET_POST_LIST]: (state, action) =>
      produce(state, (draft) => {
        // console.log("마이페이지 익명게시판리스트 리듀서:", action.payload);
        draft.postList = action.payload.post;
      }),
    [FOLLOW_LIST]: (state, action) =>
      produce(state, (draft) => {
        // console.log("마이페이지 팔로우리스트 리듀서:", action.payload);
        draft.followList = action.payload.follower;
      }),
    [FOLLOWER]: (state, action) =>
      produce(state, (draft) => {
        // console.log("마이페이지 팔로워 리듀서:", action.payload);
        draft.follower = action.payload.follower;
      }),
    [CHAT_LIST]: (state, action) =>
      produce(state, (draft) => {
        // console.log("마이페이지 채팅기록 리듀서:", action.payload);
        draft.chatList = action.payload.chat;
      }),
    [GET_INFO]: (state, action) =>
      produce(state, (draft) => {
        console.log("마이페이지 유저인포 리듀서:", action.payload.user);
        draft.user = action.payload;
      }),
  },
  initialState
);

const actionCreators = {
  getPostList,
  getPostListDB,
  getFollow,
  getFollowDB,
  getFollower,
  getChatDB,
  getChat,
  getInfo,
  getInfoDB,
  addInfo,
  addInfoDB,
};

export { actionCreators };
