import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";

import { apis } from "../../shared/apis";
import { cookies } from "../../shared/cookie";

import Swal from "sweetalert2";
import "../../styles/libraryStyle/style.css";

// actions
const SET_VOTE = "GET_VOTE";
const SET_RANKING = "SET_RANKING";
const ADD_VOTE = "ADD_VOTE";
const DETAIL_VOTE = "DETAIL_VOTE";
const GET_RESULT = "GET_RESULT";
const DEL_VOTE = "DELETE_VOTE";
const PUT_VOTE = "PUT_VOTE";
const DEL_DATA = "DEL_DATA";

// action creators
const setVote = createAction(SET_VOTE, (voteList) => voteList);
const setRanking = createAction(SET_RANKING, (RankingList) => RankingList);
const detailVote = createAction(DETAIL_VOTE, (voteInfo) => voteInfo);
const getResult = createAction(GET_RESULT, (voteInfo) => voteInfo);
const delVote = createAction(DEL_VOTE, (postId) => postId);
const putVote = createAction(PUT_VOTE, (postId) => postId);
const delData = createAction(DEL_DATA);

// initialState
const initialState = {
  voteList: [
    {
      memberId: "luckyseven",
      vote: [
        {
          imageUrl: false,
          imageTitle: "",
          selectionList: ["스파르타", "항해99"],
          selected: true,
        },
        {
          imageUrl: false,
          imageTitle: "",
          selectionList: ["스파르타", "항해99", "럭키세븐호"],
          selected: false,
        },
      ],
      createdAt: "",
      title: "",
      contents: "",
    },
    {
      memberId: "luckyseven",
      vote: [
        {
          imageUrl: "",
          imageTitle: "",
          selectionList: ["스파르타", "항해99", "럭키세븐호"],
          selected: false,
        },
        {
          imageUrl: "",
          imageTitle: "",
          selectionList: ["스파르타"],
          selected: false,
        },
      ],
      createdAt: "",
      title: "",
      contents: "",
    },
  ],
  voteInfo: {
    memberId: "럭키세븐호02",
    createdAt: "",
    title: "",
    contents: "",
    vote: [
      {
        imageUrl: "",
        imageTitle: "",
        selectionList: ["스파르타", "항해99", "럭키세븐호"],
        selected: false,
      },
      {
        imageUrl: "",
        imageTitle: "",
        selectionList: ["스파르타", "항해99"],
        selected: false,
      },
    ],
  },
  voteResult: {
    memberId: "럭키세븐호02",
    createdAt: "22-05-01 10:00:00",
    title: "",
    contents: "",
    vote: [
      {
        imageUrl: "",
        imageTitle: "",
        selectionList: ["스파르타", "항해99", "럭키세븐호"],
        selected: false,
      },
      {
        imageUrl: "",
        imageTitle: "",
        selectionList: ["스파르타", "항해99"],
        selected: false,
      },
    ],
  },
};

//middlewares
const getVoteDB = (type) => {
  return async function (dispatch, getState) {
    try {
      const { data } = await apis.getVote(type);
      const voteList = data.data;
      dispatch(setVote(voteList));
    } catch {
      alert("투표리스트를 불러오지 못했습니다.");
    }
  };
};

const detailVoteDB = (postId) => {
  return async function (dispatch, getState, { history }) {
    try {
      const memberId = cookies.get("memberId", { path: "/" });
      if (memberId) {
        const { data } = await axios.get(
          process.env.REACT_APP_URL +
            `/anonypost/vote/${postId}?id=${memberId}`,
          {}
        );
        dispatch(detailVote(data.data));
      } else {
        const { data } = await axios.get(
          process.env.REACT_APP_URL + `/anonypost/vote/${postId}`,
          {}
        );
        dispatch(detailVote(data.data));
      }
    } catch (err) {
      Swal.fire("투표정보 불러오기 실패, 다시 시도해주세요.");
      history.push("/postList");
      console.log(err);
    }
  };
};

const addVoteDB = (
  imgVote,
  title,
  contents,
  vote1,
  vote2,
  imageLeft,
  imageRight
) => {
  return async function (dispatch, getState, { history }) {
    try {
      const formData = new FormData();
      if (imgVote === true) {
        formData.append("imgLeftFile", imageLeft);
        formData.append("imgRightFile", imageRight);
        formData.append("imgLeftTitle", vote1);
        formData.append("imgRightTitle", vote2);
        formData.append("title", title);
        formData.append("contents", contents);
      } else {
        formData.append("imgLeftTitle", vote1);
        formData.append("imgRightTitle", vote2);
        formData.append("title", title);
        formData.append("contents", contents);
      }

      const { data } = await apis.addVote(formData);
      //   dispatch(getVoteDB());
      history.replace("/postList/전체");
    } catch (err) {
      console.log(err);
      Swal.fire("업로드에 실패하였습니다.");
    }
  };
};

const putVoteDB = (postId, leftSelected) => {
  return async function (dispatch, getState, { history }) {
    try {
      const { data } = await apis.putVote(postId, leftSelected);
      dispatch(getResult(data.data));
    } catch (err) {
      console.log(err);
      Swal.fire("투표하기 실패, 다시 시도해주세요.");
    }
  };
};

const delVoteDB = (postId) => {
  return async function (dispatch, getState, { history }) {
    try {
      const { data } = await apis.delVote(postId);
      const voteList = getState().vote.voteList;

      dispatch(delVote(postId));
      history.push("/postList/전체");
    } catch (err) {
      console.log(err);
      Swal.fire("삭제실패, 다시 시도해주세요.");
    }
  };
};

// reducer
export default handleActions(
  {
    [SET_VOTE]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.voteList;
      }),
    [DETAIL_VOTE]: (state, action) =>
      produce(state, (draft) => {
        draft.voteInfo = action.payload;
      }),
    [GET_RESULT]: (state, action) =>
      produce(state, (draft) => {
        draft.voteResult = action.payload;
      }),
    [DEL_VOTE]: (state, action) =>
      produce(state, (draft) => {
        draft.voteList = state.voteList.filter(
          (v) => v.postId !== action.payload
        );
      }),
    [DEL_DATA]: (state, action) =>
      produce(state, (draft) => {
        draft.voteList = [];
        draft.voteInfo = [];
      }),
  },
  initialState
);

const actionCreators = {
  getVoteDB,
  addVoteDB,
  detailVoteDB,
  delVoteDB,
  putVoteDB,
  delData,
};

export { actionCreators };
