import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import { apis } from "../../shared/apis";

//액션
const GET_RANKING = "GET_RANKING";
const GET_TAPE = "GET_TAPE";
const GET_HOT_VOTE = "GET_HOT_VOTE";
const GET_HOT_BOARD = "GET_HOT_BOARD";
const GET_REVIEW = "GET_REVIEW";

//초기값
const initialState = {
  rankingList: [{ color: "#Fff", score: 36.5, nickname: "항해99", restag: "" }],
  tapeCount: "",
  hotVoteList: [],
  hotBoardList: [],
  reviewList: [],
};

//액션 생성 함수
const getRanking = createAction(GET_RANKING, (rankingList) => rankingList);
const getHotVote = createAction(GET_HOT_VOTE, (voteList) => voteList);
const getHotBoard = createAction(GET_HOT_BOARD, (BoardList) => BoardList);
const getReview = createAction(GET_REVIEW, (reviewList) => reviewList);
const getTape = createAction(GET_TAPE, (tapeCnt) => tapeCnt);

const getTapeDB = () => {
  return async function (dispatch, getState, { history }) {
    try {
      const { data } = await apis.getTape();
      dispatch(getTape(data.data.reward));
    } catch (err) {
      console.log(err);
    }
  };
};

const getRankingDB = () => {
  return async function (dispatch, getState, { history }) {
    try {
      const { data } = await axios.get(
        process.env.REACT_APP_URL + "/main/ranking/member"
      );

      dispatch(getRanking(data.data));
    } catch (err) {
      console.log(err);
    }
  };
};

const getHotVoteDB = () => {
  return async function (dispatch, getState, { history }) {
    try {
      const { data } = await axios.get(
        process.env.REACT_APP_URL + "/main/ranking/voteBoard"
      );
      dispatch(getHotVote(data.data));
    } catch (err) {
      console.log(err);
    }
  };
};

const getHotBoardDB = () => {
  return async function (dispatch, getState, { history }) {
    try {
      const { data } = await axios.get(
        process.env.REACT_APP_URL + "/main/ranking/board"
      );
      dispatch(getHotBoard(data.data));
    } catch (err) {
      console.log(err);
    }
  };
};

const getReviewDB = () => {
  return async function (dispatch, getState, { history }) {
    try {
      const { data } = await axios.get(
        process.env.REACT_APP_URL + "/main/serviceComment"
      );
      dispatch(getReview(data.data));
    } catch (err) {
      console.log(err);
    }
  };
};

export default handleActions(
  {
    [GET_RANKING]: (state, action) =>
      produce(state, (draft) => {
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
    [GET_REVIEW]: (state, action) =>
      produce(state, (draft) => {
        draft.reviewList = action.payload;
      }),
    [GET_TAPE]: (state, action) =>
      produce(state, (draft) => {
        draft.tapeCount = action.payload;
      }),
  },
  initialState
);

const actionCreators = {
  getRankingDB,
  getHotBoardDB,
  getHotVoteDB,
  getReviewDB,
  getTapeDB,
};

export { actionCreators };
