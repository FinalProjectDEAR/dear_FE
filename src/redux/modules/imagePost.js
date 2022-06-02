import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

// 액션
const SET_PRE = "SET_PRE";
const DELETE_PRE = "DELETE_PRE";
const RESET_FILE = "RESET_FILE";

// 액션 크리에이터
const setPre = createAction(SET_PRE, (data) => ({ data }));
const deletePre = createAction(DELETE_PRE, (imageId) => ({ imageId }));
const resetFile = createAction(RESET_FILE, () => {});

//초기값
const initialState = {
  preView: [],
  files: [],
  editUrl: [],
};

export default handleActions(
  {
    // 서버에서 받아온 URL 새로 추가하는 URL 포함해서 files에 넣음
    [SET_PRE]: (state, action) =>
      produce(state, (draft) => {
        draft.files = [...state.files, ...action.payload.data];
      }),
    // 인덱스로 삭제를 함
    [DELETE_PRE]: (state, action) =>
      produce(state, (draft) => {
        draft.files = draft.files.filter(
          (i, idx) => idx !== action.payload.imageId
        );
      }),
    //포스트 등록 누름과 동시에 사진 파일리셋
    [RESET_FILE]: (state, action) =>
      produce(state, (draft) => {
        draft.files = [];
      }),
  },
  initialState
);

const imgActions = {
  setPre,
  deletePre,
  resetFile,
};

export { imgActions };
