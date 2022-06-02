import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";

import { imgActions } from "./imagePost";

import { apis } from "../../shared/apis";

import Swal from "sweetalert2";
import "../../styles/libraryStyle/style.css";

// 액션
const GET_POST = "GET_POST";
const GET_DETAIL = "GET_DETAIL";
const GET_CATEDETAIL = "GET_CATEDETAIL";
const ADD_POST = "ADD_POST";
const EDIT_POST = "EDIT_POST";
const DELETE_POST = "DELETE_POST";
const LIKE_POST = "LIKE_POST";
const RESET_POST = "RESET_POST";

// 초기값
const initialState = {
  post: [],
  postList: [],
  detailPost: [],
  detail_post: [],
  postLike: [],
  pages: [],
};

// 액션 생성 함수
const getPost = createAction(GET_POST, (post) => ({ post }));
const getDetail = createAction(GET_DETAIL, (detailPost) => ({ detailPost }));
const getCateDetail = createAction(GET_CATEDETAIL, (detailPostCategory) => ({
  detailPostCategory,
}));
const addPost = createAction(ADD_POST, (postList) => ({
  postList,
}));
const deletePost = createAction(DELETE_POST, (postId) => ({
  postId,
}));
const editPost = createAction(EDIT_POST, (postId, postList) => ({
  postId,
  postList,
}));
const likePost = createAction(LIKE_POST, (postId, likes, list) => ({
  postId,
  likes,
  list,
}));
const resetPost = createAction(RESET_POST, () => ({}));

//postList 서버에서 받아오기
const getPostDB = (page) => {
  return async function (dispatch, getState, { history }) {
    try {
      const { data } = await axios.get(
        process.env.REACT_APP_URL + `/anonypost?page=${page}`,
        {}
      );
      dispatch(getPost(data.data));
    } catch (err) {
      console.log(err);
    }
  };
};

// 게시판 상세페이지 서버에서 받아오기
const getDetailDB = (postId) => {
  return async function (dispatch, getState, { history }) {
    try {
      const memberId = localStorage.getItem("memberId");
      const { data } = await axios.get(
        process.env.REACT_APP_URL + `/anonypost/board/${postId}?id=${memberId}`,
        {}
      );
      dispatch(getDetail(data.data));
    } catch (err) {
      console.log(err);
      Swal.fire("게시글 정보를 가져올 수 없습니다.");
    }
  };
};

// 게시판 카테고리별 상세페이지 서버에서 받아오기
const getCateDetailDB = (page, category) => {
  return function (dispatch, getState, { history }) {
    try {
      axios
        .get(
          process.env.REACT_APP_URL +
            `/anonypost?page=${page}&category=${category}`,
          {}
        )
        .then((res) => {
          dispatch(getPost(res.data.data));
          dispatch(getCateDetail(res.data.data));
        });
    } catch (err) {
      console.log(err);
      Swal.fire("게시글 정보를 가져올 수 없습니다.");
    }
  };
};

//post 서버로 보내기
const addPostDB = (payload) => {
  return async function (dispatch, getState, { history }) {
    try {
      const formData = new FormData();
      //postWrite페이지에서 미리보기를 리듀서로 보낼 때 []로 보내서 서버에서 받을 때 형식이 달라졌다.
      //따라서 map 돌려서 하나씩 넣어줬고 files란 이름으로 다중이미지업로드 성공
      payload.files.map((e, idx) => {
        return formData.append("files", e);
      });
      formData.append("title", payload.title);
      formData.append("category", payload.category);
      formData.append("contents", payload.contents);
      const { data } = await apis.post(formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      dispatch(addPost(data.data));
      //등록함과 동시에 리덕스에 남아있는 사진파일들 리셋해주기
      dispatch(imgActions.resetFile());
      history.push("/postList/전체");
    } catch (err) {
      console.log(err);
      Swal.fire("게시글을 다시 작성해주세요.");
    }
  };
};

//수정하기
const editPostDB = (payload) => {
  return async function (dispatch, getState, { history }) {
    try {
      const formData = new FormData();
      //기존사진url
      payload.editUrl.map((e, idx) => {
        return formData.append("existedURL", e);
      });
      //수정사진파일
      payload.newFiles.map((e, idx) => {
        return formData.append("files", e);
      });
      formData.append("title", payload.title);
      formData.append("category", payload.category);
      formData.append("contents", payload.contents);
      const { data } = await apis.edit(payload.postId, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      history.push(`/postDetail/${payload.postId}`);
    } catch (err) {
      console.log(err);
    }
  };
};

//삭제하기
const deletePostDB = (postId) => {
  return async function (dispatch, getState, { history }) {
    try {
      const { data } = await apis.delete(postId);
      dispatch(deletePost(postId));
      history.push("/postList/전체");
    } catch (error) {
      console.log(error);
    }
  };
};

// 공감 버튼
const likeDB = (postId, likes) => {
  return async function (dispatch, getState, { history }) {
    try {
      const { data } = await apis.like(postId, likes);
      dispatch(likePost(postId, data.data.likes, data.data.memberIdList));
    } catch (err) {
      console.log(err);
    }
  };
};

// 리듀서
export default handleActions(
  {
    [GET_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.post = action.payload.post;
      }),
    [GET_CATEDETAIL]: (state, action) =>
      produce(state, (draft) => {
        draft.pages = action.payload.detailPostCategory.totalPages;
      }),
    [GET_DETAIL]: (state, action) =>
      produce(state, (draft) => {
        draft.detailPost = action.payload.detailPost;
      }),
    [ADD_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.postList.unshift(action.payload.postList);
      }),
    [DELETE_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.detail_post = draft.detail_post.filter(
          (p) => p.postId !== action.payload.postId
        );
      }),
    [LIKE_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.detailPost.likes = action.payload.likes;
        draft.detailPost.likesList = action.payload.list;
      }),
    //클린업작업
    [RESET_POST]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.post = [];
        draft.postList = [];
        draft.detailPost = [];
        draft.detail_post = [];
        draft.postLike = [];
      }),
  },
  initialState
);

// export 할 것들
const actionCreators = {
  getPost,
  getDetail,
  addPost,
  deletePost,
  likePost,
  getPostDB,
  getDetailDB,
  addPostDB,
  editPostDB,
  deletePostDB,
  likeDB,
  getCateDetailDB,
  getCateDetail,
  resetPost,
};

export { actionCreators };
