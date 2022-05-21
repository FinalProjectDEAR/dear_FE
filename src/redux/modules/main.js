import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis } from "../../shared/apis";

//액션
const GET_RANKING = "GET_RANKING";
const GET_TAPE = "GET_TAPE";
const GET_HOT_VOTE = "GET_HOT_VOTE";
const GET_HOT_BOARD = "GET_HOT_BOARD";

//초기값
const initialState = {
  rankingList: [],
  tape: "",
  hotVoteList: [],
  hotBoardList: [],
  reviewList: [],
};

//액션 생성 함수
const getRanking = createAction(GET_RANKING, (rankingList) => rankingList);
const getHotVote = createAction(GET_HOT_VOTE, (voteList) => voteList);
const getHotBoard = createAction(GET_HOT_BOARD, (BoardList) => BoardList);
const getReview = createAction(GET_SERVICE_CMT, (reviewList) => reviewList);
// const getFollow = createAction(FOLLOW_LIST, (follower) => ({ follower }));
// const getFollower = createAction(FOLLOWER, (follower) => ({ follower }));
// const getChat = createAction(CHAT_LIST, (chat) => ({ chat }));
// const getInfo = createAction(GET_INFO, (user) => ({ user }));
// const addInfo = createAction(GET_INFO, (user) => ({ user }));

//내가 작성한 글 가져오기
const getRankingDB = () => {
  return async function (dispatch, getState, { history }) {
    try {
      const { data } = await apis.getRank();
      console.log("랭킹", data);
      dispatch(getRanking(data.data));
    } catch (err) {
      console.log("랭킹데이터 가져오기 실패", err);
    }
  };
};

const getHotVoteDB = () => {
  return async function (dispatch, getState, { history }) {
    try {
      const { data } = await apis.getHotVote();
      console.log("인기투표", data);
      dispatch(getHotVote(data.data));
    } catch (err) {
      console.log("인기 투표글 가져오기 실패", err);
    }
  };
};

const getHotBoardDB = () => {
  return async function (dispatch, getState, { history }) {
    try {
      const { data } = await apis.getHotBoard();
      console.log("인기게시글", data);
      dispatch(getHotBoard(data.data));
    } catch (err) {
      console.log("인기 게시글 가져오기 실패", err);
    }
  };
};

const getReviewDB = () => {
  return async function (dispatch, getState, { history }) {
    try {
      const { data } = await apis.getServiceCmt();
      console.log("서비스후기", data);
      dispatch(getReview(data.data));
    } catch (err) {
      console.log("서비스 후기 가져오기 실패", err);
    }
  };
};

export default handleActions(
  {
    [GET_RANKING]: (state, action) =>
      produce(state, (draft) => {
        // console.log("마이페이지 익명게시판리스트 리듀서:", action.payload);
        draft.rankingList = action.payload;
      }),
    [GET_HOT_VOTE]: (state, action) =>
      produce(state, (draft) => {
        draft.hotVoteList = action.payload;
      }),
    [GET_HOT_BOARD]: (state, action) =>
      produce(state, (draft) => {
        draft.hotBoardList = action.payload;
      }),
    [GET_SERVICE_CMT]: (state, action) =>
      produce(state, (draft) => {
        draft.reviewList = action.payload;
      }),
  },
  initialState
);

const actionCreators = {
  getRankingDB,
  getHotBoardDB,
  getHotVoteDB,
  getReviewDB,
};

export { actionCreators };
