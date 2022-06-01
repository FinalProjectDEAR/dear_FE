import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis } from "../../shared/apis";

//액션
const GET_POST_LIST = "GET_POST_LIST";
const FOLLOW_LIST = "FOLLOW_LIST";
const FOLLOWER = "FOLLOWER";
const CHAT_LIST = "CHAT_LIST";
const GET_INFO = "GET_INFO";
const ADD_INFO = "ADD_INFO";
const FOLLOW_PAGE = "FOLLOW_PAGE";
const RESET_PAGE = "RESET_POST";

//초기값
const initialState = {
  postList: [],
  followList: [],
  follower: [],
  chatList: [],
  user: [],
  userInfo: [],
  followPage: [],
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
const followPage = createAction(FOLLOW_PAGE, (page) => ({ page }));
const resetPage = createAction(RESET_PAGE, () => ({}));

//내가 작성한 글 가져오기
const getPostListDB = (page) => {
  return async function (dispatch, getState, { history }) {
    try {
      const { data } = await apis.getPost(page);
      dispatch(getPostList(data.data));
    } catch (err) {
      console.log(err);
    }
  };
};
//팔로우한 사람 가져오기
const getFollowDB = (page) => {
  return async function (dispatch, getState, { history }) {
    try {
      const { data } = await apis.getFollow(page);
      dispatch(getFollow(data.data));
    } catch (err) {
      console.log(err);
    }
  };
};
//상담 히스토리 가져오기
const getChatDB = () => {
  return async function (dispatch, getState, { history }) {
    try {
      const { data } = await apis.getChatList();
      dispatch(getChat(data.data));
    } catch (err) {
      console.log(err);
    }
  };
};
//멤버 인포가져오기
const getInfoDB = () => {
  return async function (dispatch, getState, { history }) {
    try {
      const { data } = await apis.getMember();
      dispatch(getInfo(data.data));
    } catch (err) {
      console.log(err);
    }
  };
};
//멤버인포 수정하기
const addInfoDB = (memberInfo) => {
  return async function (dispatch, getState, { history }) {
    try {
      const { data } = await apis.putInfo({
        age: memberInfo.age,
        color: memberInfo.color,
        dating: memberInfo.dating,
        lovePeriod: memberInfo.lovePeriod,
        loveType: memberInfo.loveType,
        nickname: memberInfo.nickname,
        gender: memberInfo.gender,
      });
      dispatch(addInfo(data.data));
      history.push("/myPage");
    } catch (err) {
      console.log(err);
    }
  };
};

export default handleActions(
  {
    [GET_POST_LIST]: (state, action) =>
      produce(state, (draft) => {
        draft.postList = action.payload.post;
      }),
    [FOLLOW_LIST]: (state, action) =>
      produce(state, (draft) => {
        draft.followList = action.payload.follower;
      }),
    [FOLLOWER]: (state, action) =>
      produce(state, (draft) => {
        draft.follower = action.payload.follower;
      }),
    [CHAT_LIST]: (state, action) =>
      produce(state, (draft) => {
        draft.chatList = action.payload.chat;
      }),
    [GET_INFO]: (state, action) =>
      produce(state, (draft) => {
        draft.user = action.payload;
      }),
    [FOLLOW_PAGE]: (state, action) =>
      produce(state, (draft) => {
        draft.page = action.payload.page;
      }),
    [RESET_PAGE]: (state, action) =>
      produce(state, (draft) => {
        draft.postList = [];
        draft.followList = [];
        draft.follower = [];
        draft.chatList = [];
        draft.user = [];
        draft.userInfo = [];
        draft.followPage = [];
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
  followPage,
  resetPage,
};

export { actionCreators };
