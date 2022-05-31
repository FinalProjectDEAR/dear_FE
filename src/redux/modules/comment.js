import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { api } from "../../shared/apis";
import axios from "axios";
import Swal from "sweetalert2";
import "../../styles/libraryStyle/style.css";

//액션
const ADD = "comment/ADD";
const LOAD = "comment/LOAD";
const DELETE = "comment/DELETE";
const EDIT = "comment/EDIT";
const LIKE = "comment/LIKE";
const TOTAL = "comment/TOTAL";
const RESET_COMMENT = "RESET_COMMENT";

//초기값
const initialState = {
  comment: [],
  comments: [],
  pages: [],
};

//액션 생성 함수
const getComment = createAction(LOAD, (comments) => ({
  comments,
}));
const addComment = createAction(ADD, (comments) => ({
  comments,
}));
const editComment = createAction(EDIT, (commentId, newContent) => ({
  commentId,
  newContent,
}));
const delComment = createAction(DELETE, (commentId) => ({ commentId }));
const likeComment = createAction(LIKE, (commentId, likes) => ({
  commentId,
  likes,
}));
const pages = createAction(TOTAL, (totalPages) => ({ totalPages }));
const resetComment = createAction(RESET_COMMENT, () => ({}));

//미듈웨어
//서버에서 댓글 가져오기
const getCommentDB = (postId, page) => {
  // console.log(postId);
  return function (dispatch, getState, { history }) {
    try {
      axios
        .get(
          process.env.REACT_APP_URL + `/anonypost/${postId}/comment/${page}`,
          {}
        )
        .then((res) => {
          dispatch(getComment(res.data));
        });
    } catch (err) {
      console.log(err);
      Swal.fire("댓글정보를 가져올 수 없습니다.");
    }
  };
};

//서버에게 댓글 보내기
const addCommentDB = (comment, postId) => {
  return function (dispatch, getState, { history }) {
    try {
      api
        .post(`anonypost/board/${postId}/comment`, comment.comment)
        .then((res) => {
          dispatch(addComment(res.data.data));
          dispatch(getCommentDB(postId, 1));
        });
    } catch (err) {
      console.log(err);
      Swal.fire("댓글 추가 실패, 다시 시도해 주세요.");
    }
  };
};
//댓글 수정하기
const editCommentDB = (comment_id, comment, postId) => {
  return function (dispatch, getState, { history }) {
    try {
      api
        .put(`anonypost/board/${postId}/comment/${comment_id}`, { comment })
        .then((res) => {
          dispatch(editComment(comment_id, comment));
        });
    } catch (err) {
      console.log(err);
      Swal.fire("본인 댓글만 수정이 가능합니다!");
    }
  };
};
//댓글삭제하기
const delCommentDB = (payload) => {
  return function (dispatch, getState, { history }) {
    try {
      api
        .delete(
          `anonypost/board/${payload.postId}/comment/${payload.comment_id}`
        )
        .then(() => {
          dispatch(delComment(payload.comment_id));
          dispatch(getCommentDB(payload.postId, 1));
        });
    } catch (err) {
      console.log(err);
    }
  };
};
//댓글 좋아요
const likeCommentDB = (postId, commentId) => {
  return function (dispatch, getState, { history }) {
    try {
      api
        .post(`anonypost/board/${postId}/commentLikes/${commentId}`, {})
        .then((res) => {
          dispatch(likeComment(commentId, res.data.data.likes));
        });
    } catch (err) {
      console.loe(err);
    }
  };
};

export default handleActions(
  {
    [LOAD]: (state, action) =>
      produce(state, (draft) => {
        draft.comments = action.payload.comments.data;
      }),
    [ADD]: (state, action) =>
      produce(state, (draft) => {
        draft.comments.unshift(action.payload.comments);
      }),
    [EDIT]: (state, action) =>
      produce(state, (draft) => {
        let idx = draft.comments.findIndex((c) => {
          return parseInt(c.commentId) === parseInt(action.payload.commentId);
        });
        draft.comments[idx] = {
          ...draft.comments[idx],
          comment: action.payload.newContent,
        };
      }),
    [DELETE]: (state, action) =>
      produce(state, (draft) => {
        //걔빼고 전부 다
        draft.comments = draft.comments.filter(
          (p) => p.commentId !== action.payload.commentId
        );
      }),
    [LIKE]: (state, action) =>
      produce(state, (draft) => {
        draft.comments.map((e, id) => {
          if (action.payload.commentId === e.commentId) {
            e.likes = action.payload.likes;
          }
        });
      }),
    [TOTAL]: (state, action) =>
      produce(state, (draft) => {
        draft.pages = action.payload.totalPages;
      }),
    //클린업작업
    [RESET_COMMENT]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.comment = [];
        draft.comments = [];
        draft.pages = [];
      }),
  },
  initialState
);

const actionCreators = {
  getCommentDB,
  getComment,
  addComment,
  likeComment,
  addCommentDB,
  editCommentDB,
  delCommentDB,
  likeCommentDB,
  pages,
  resetComment,
};

export { actionCreators };
