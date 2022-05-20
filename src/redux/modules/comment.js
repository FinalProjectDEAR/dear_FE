import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { api } from "../../shared/apis";

//액션
const ADD = "comment/ADD";
const LOAD = "comment/LOAD";
const DELETE = "comment/DELETE";
const EDIT = "comment/EDIT";
const LIKE = "comment/LIKE";
const TOTAL = "comment/TOTAL";

//초기값
const initialState = {
  comment: [],
  comments: [],
  pages: [],
  // is_edit: false,
  // likes: false,
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

//미듈웨어
//서버에서 댓글 가져오기
const getCommentDB = (postId, page) => {
  // console.log(postId);
  return function (dispatch, getState, { history }) {
    try {
      api.get(`anonypost/${postId}/comment/${page}`, {}).then((res) => {
        // console.log("댓글가져오기", res.data);
        dispatch(getComment(res.data));
      });
    } catch (err) {
      console.log("댓글가져오기", err);
      window.alert("댓글정보를 가져올 수 없습니다.");
    }
  };
};

//서버에게 댓글 보내기
const addCommentDB = (comment, postId) => {
  return function (dispatch, getState, { history }) {
    // console.log("댓글추가하기!", comment.comment, postId);
    try {
      api
        .post(`anonypost/board/${postId}/comment`, comment.comment)
        .then((res) => {
          // console.log("댓글 추가", res.data.data);
          dispatch(addComment(res.data.data));
        });
    } catch (err) {
      console.log(err);
      window.alert("댓글 추가 실패, 다시 시도해 주세요.");
    }
  };
};
//댓글 수정하기
const editCommentDB = (comment_id, comment, postId) => {
  // console.log("댓글수정하기", comment_id, comment, postId);
  return function (dispatch, getState, { history }) {
    try {
      api
        .put(`anonypost/board/${postId}/comment/${comment_id}`, { comment })
        .then((res) => {
          // console.log("댓글 수정", res);
          dispatch(editComment(comment_id, comment));
        });
    } catch (err) {
      console.log("댓글 수정 error", err);
      window.alert("본인 댓글만 수정이 가능합니다!");
    }
  };
};
//댓글삭제하기
const delCommentDB = (payload) => {
  // console.log("댓글 삭제", payload.comment_id, payload.postId);
  return function (dispatch, getState, { history }) {
    try {
      api
        .delete(
          `anonypost/board/${payload.postId}/comment/${payload.comment_id}`
        )
        .then(() => {
          dispatch(delComment(payload.comment_id));
        });
    } catch (err) {
      console.log("댓글 삭제", err);
    }
  };
};
//댓글 좋아요
const likeCommentDB = (postId, commentId) => {
  console.log("댓글 좋아요", postId, commentId);
  return function (dispatch, getState, { history }) {
    try {
      api
        .post(`anonypost/board/${postId}/commentLikes/${commentId}`, {})
        .then((res) => {
          // console.log("댓글좋아요 Res", res);
          dispatch(likeComment(commentId, res.data.data.likes));
        });
    } catch (err) {
      console.loe("댓글 좋아요 err", err);
    }
  };
};

export default handleActions(
  {
    [LOAD]: (state, action) =>
      produce(state, (draft) => {
        // console.log("리듀서 로드", action.payload.comments.data);
        draft.comments = action.payload.comments.data;
      }),
    [ADD]: (state, action) =>
      produce(state, (draft) => {
        // console.log("리듀서 댓글추가", action.payload.comments);
        draft.comments.unshift(action.payload.comments);
      }),
    [EDIT]: (state, action) =>
      produce(state, (draft) => {
        // console.log("댓글 수정 리듀서", action.payload);
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
        // console.log(action.payload);
        //걔빼고 전부 다
        draft.comments = draft.comments.filter(
          (p) => p.commentId !== action.payload.commentId
        );
      }),
    [LIKE]: (state, action) =>
      produce(state, (draft) => {
        // console.log("댓글 좋아요 받아온 값", action.payload);
        // console.log("댓글 좋아요 state", state);
        draft.comments.map((e, id) => {
          if (action.payload.commentId === e.commentId) {
            e.likes = action.payload.likes;
          }
        });
      }),
    [TOTAL]: (state, action) =>
      produce(state, (draft) => {
        // console.log("페이지 받아온 값", action.payload);
        draft.pages = action.payload.totalPages;
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
};

export { actionCreators };
