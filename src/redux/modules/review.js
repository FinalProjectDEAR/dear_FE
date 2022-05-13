import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis, api } from "../../shared/apis";

//액션
const GET_REVIEW = "GET_REVIEW";
const ADD_REVIEW = "ADD_REVIEW";
const FOLLOW = "FOLLOW";

//액션생성함수
const getReview = createAction(GET_REVIEW, (review) => ({ review }));
const addReview = createAction(ADD_REVIEW, (review) => ({ review }));
const follow = createAction(FOLLOW, (memberId, follow) => ({
  memberId,
  follow,
}));

//초기값
const initialState = { review: [], follow: false };

//미듈웨어
const getReviewDB = () => {
  return function (dispatch, getState, { history }) {
    try {
      apis.get().then((res) => {
        console.log("후기가져오기", res);
        dispatch(getReview(res));
      });
    } catch (err) {
      console.log("후기가져오기 error", err);
    }
  };
};
//고민러 후기 작성
const addReviewReqDB = (
  requestReview,
  // oppositeMemberId,
  tagLike,
  tagSelectList,
  serviceComment
) => {
  console.log(
    "고민러 후기 미듈웨어",
    requestReview,
    // oppositeMemberId,
    tagLike,
    tagSelectList,
    serviceComment
  );
  return function (dispatch, getState, { history }) {
    try {
      // api
      //   .post("/chat/request/review", {
      //     requestReview: requestReview,
      //     // oppositeMemberId:oppositeMemberId,
      //     tagLike: tagLike,
      //     tagSelectList: tagSelectList,
      //     serviceComment: serviceComment,
      //   })
      //   .then((res) => {
      //     console.log("후기추가하기", res);
      //     dispatch(addReview(res));
      //   });
    } catch (err) {
      console.log("고민러 후기추가하기error", err);
    }
  };
};
//리스너 후기 작성
const addReviewResDB = (
  requestReview,
  // oppositeMemberId,
  tagLike,
  tagSelectList,
  serviceComment
) => {
  console.log(
    "리스너 후기 미듈웨어",
    requestReview,
    // oppositeMemberId,
    tagLike,
    tagSelectList,
    serviceComment
  );
  return function (dispatch, getState, { history }) {
    try {
      // api
      //   .post("/chat/response/review", {
      //     requestReview: requestReview,
      //     // oppositeMemberId:oppositeMemberId,
      //     tagLike: tagLike,
      //     tagSelectList: tagSelectList,
      //     serviceComment: serviceComment,
      //   })
      //   .then((res) => {
      //     console.log("후기추가하기", res);
      //     dispatch(addReview(res));
      //   });
    } catch (err) {
      console.log("리스너 후기추가하기error", err);
    }
  };
};
//유저팔로우하기 (쿼리문 준비해두기)
const followDB = (memberId, follow) => {
  console.log("팔로우", memberId, follow);
  return function (dispatch, getState, { history }) {
    try {
      api.post(`user/${memberId}/follow?follow=${follow}`, {}).then((res) => {
        console.log("팔로우하기", res.data.data.follow);
        // dispatch(follow(memberId, res.data.data));
      });
    } catch (err) {
      console.log("팔로우하기 err", err);
    }
  };
};

//리듀서
export default handleActions(
  {
    [GET_REVIEW]: (state, action) =>
      produce(state, (draft) => {
        // console.log(action.payload)
        draft.review = action.payload.review;
      }),
    [ADD_REVIEW]: (state, action) =>
      produce(state, (draft) => {
        console.log(action.payload);
        draft.review.unshift(action.payload.review);
      }),
    // [FOLLOW]: (state, action) =>
    //   produce(state, (draft) => {
    //     console.log("follow 받아온 값", action.payload);
    //     console.log("follow state", state);
    //     draft.review.map((e, id) => {
    //       if (action.payload.memberId === e.memberId) {
    //         e.follow = action.payload.follow;
    //       }
    //     });
    //   }),
  },
  initialState
);

const actionCreators = {
  getReviewDB,
  addReviewReqDB,
  addReviewResDB,
  getReview,
  addReview,
  followDB,
};

export { actionCreators };
