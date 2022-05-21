import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import moment from "moment";
import { imgActions } from "./imagePost";
import { apis, api } from "../../shared/apis";

// 액션
const GET_POST = "GET_POST";
const GET_DETAIL = "GET_DETAIL";
const GET_CATEDETAIL = "GET_CATEDETAIL";
const ADD_POST = "ADD_POST";
const EDIT_POST = "EDIT_POST";
const DELETE_POST = "DELETE_POST";
const LIKE_POST = "HELP_POST";
const RESET_POST = "RESET_POST";

// 초기값
const initialState = {
  post: [],
  postList: [],
  detailPost: [],
  detail_post: [],
  postLike: [],
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
const likePost = createAction(LIKE_POST, (postId, likes) => ({
  postId,
  likes,
}));

// 미들웨어
//postList 서버에서 받아오기
const getPostDB = (page) => {
  return function (dispatch, getState, { history }) {
    try {
      api.get(`anonypost?page=${page}`, {}).then((res) => {
        // console.log("익명게시판리스트", res.data.data);
        dispatch(getPost(res.data.data));
      });
    } catch (err) {
      console.log("익명게시판 리스트 error", err);
    }
  };
};

// 게시판 상세페이지 서버에서 받아오기
const getDetailDB = (postId) => {
  // console.log(postId);
  return function (dispatch, getState, { history }) {
    try {
      api.get(`anonypost/board/${postId}`, {}).then((res) => {
        // console.log("포스트 상세보기 get", res.data.data);
        dispatch(getDetail(res.data.data));
      });
    } catch (err) {
      console.log("포스트 상세보기", err);
      window.alert("게시글 정보를 가져올 수 없습니다.");
    }
  };
};

// 게시판 카테고리별 상세페이지 서버에서 받아오기
const getCateDetailDB = (page, category) => {
  console.log(page, category);
  return function (dispatch, getState, { history }) {
    try {
      api
        .get(`/anonypost?page=${page}&category=${category}`, {})
        .then((res) => {
          // console.log("포스트 카테고리 상세보기 get", res.data.data);
          dispatch(getPost(res.data.data));
        });
    } catch (err) {
      console.log("포스트 상세보기", err);
      window.alert("게시글 정보를 가져올 수 없습니다.");
    }
  };
};

//post 서버로 보내기
const addPostDB = (payload) => {
  // console.log("포스트 추가하기", payload);
  return async function (dispatch, getState, { history }) {
    try {
      const formData = new FormData();
      //postWrite페이지에서 미리보기를 리듀서로 보낼 때 []로 보내서 서버에서 받을 때 형식이 달라졌다.
      //따라서 map 돌려서 하나씩 넣어줬고 files란 이름으로 다중이미지업로드 성공!
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
      // console.log("포스트추가하기", data.data);
      dispatch(addPost(data.data));
      //등록함과 동시에 리덕스에 남아있는 사진파일들 리셋해주기
      dispatch(imgActions.resetFile());
      history.push("/postList");
    } catch (err) {
      console.log("포스트 추가하기 error", err);
    }
  };
};

//수정하기 테스트 남음
const editPostDB = (payload) => {
  // console.log("포스트 수정하기 payload", payload);
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
      const { data } = await api.put(
        `anonypost/board/${payload.postId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("포스트 수정하기", data);
      history.push(`/postDetail/${payload.postId}`);
    } catch (err) {
      console.log("포스트 수정하기 에러", err);
    }
  };
};

const deletePostDB = (postId) => {
  return function (dispatch, getState, { history }) {
    try {
      apis.delete(postId).then((res) => {
        // console.log("게시글 삭제하기", res);
        dispatch(deletePost(postId));
        history.push("/postList");
      });
    } catch (error) {
      console.log("게시글 삭제하기", error);
    }
  };
};

// 공감 버튼
const likeDB = (postId, likes) => {
  // console.log("공감 payload", postId, likes);
  return function (dispatch, getState, { history }) {
    try {
      api
        .post(`/anonypost/board/${postId}/postLikes?likes=${likes}`, {})
        .then((res) => {
          // console.log("공감", res.data);
          dispatch(likePost(postId, res.data.data.likes));
        });
    } catch (err) {
      console.log("공감하기", err);
    }
  };
};

// 리듀서
export default handleActions(
  {
    [GET_POST]: (state, action) =>
      produce(state, (draft) => {
        // console.log(action.payload)
        draft.post = action.payload.post;
      }),
    [GET_DETAIL]: (state, action) =>
      produce(state, (draft) => {
        // console.log("상세보기 리듀서", action.payload.detailPost);
        draft.detailPost = action.payload.detailPost;
      }),
    [ADD_POST]: (state, action) =>
      produce(state, (draft) => {
        // console.log("add 포스트 리듀서", action.payload.postList);
        draft.postList.unshift(action.payload.postList);
      }),
    [DELETE_POST]: (state, action) =>
      produce(state, (draft) => {
        console.log(state.detail_post, action.payload);
        draft.detail_post = draft.detail_post.filter(
          (p) => p.postId !== action.payload.postId
        );
      }),
    // [EDIT_POST]: (state, action) =>
    //   produce(state, (draft) => {
    //     draft.comment = draft.comment.filter(
    //       (p) => p.postId === action.payload.postId
    //     );
    //   }),
    [LIKE_POST]: (state, action) =>
      produce(state, (draft) => {
        // console.log("공감 받아온 값", action.payload);
        // console.log("공감 state", state);
        draft.detailPost.likes = action.payload.likes;
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
};

export { actionCreators };
