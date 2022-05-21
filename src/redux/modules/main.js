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
};

//액션 생성 함수
const getRanking = createAction(GET_RANKING, (rankingList) => rankingList);
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
      console.log(data);
      dispatch(getRanking(data.data));
    } catch (err) {
      console.log(err);
      window.alert("투표실패! 다시 시도해주세요.");
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
  },
  initialState
);

const actionCreators = {
  getRankingDB,
};

export { actionCreators };
