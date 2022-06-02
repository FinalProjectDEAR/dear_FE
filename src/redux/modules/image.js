import { createAction, handleActions } from "redux-actions";
import produce from "immer";

//actions
const UPLOADING = "UPLOADING";
const UPLOAD_IMAGE = "UPLOAD_IMAGE";
const SET_PREVIEW = "SET_PREVIEW";
const DEL_DATA = "DEL_DATA";
const DEL_IMAGE = "DEL_IMAGE";

//action creators
const uploading = createAction(UPLOADING, (uploading) => ({ uploading }));
const uploadImage = createAction(UPLOAD_IMAGE, (imageFiles, where) => ({
  imageFiles,
  where,
}));
const delData = createAction(DEL_DATA);
const delImage = createAction(DEL_IMAGE, (idx) => ({ idx }));

//initial state
const initialState = {
  fileList: [],
  preview: [],
  imageLeft: "",
  imageRight: "",
  uploading: false,
};

// reducer
export default handleActions(
  {
    [UPLOAD_IMAGE]: (state, action) =>
      produce(state, (draft) => {
        if (action.payload.where === "left") {
          draft.preview[0] = action.payload.preview;
          draft.imageLeft = action.payload.imageFiles;
          draft.uploading = false;
        } else if (action.payload.where === "right") {
          draft.preview[1] = action.payload.preview;
          draft.imageRight = action.payload.imageFiles;
          draft.uploading = false;
        } else {
          draft.fileList = [...state.fileList, ...action.payload.imageFiles];
        }
      }),
    [DEL_IMAGE]: (state, action) =>
      produce(state, (draft) => {
        draft.fileList = draft.fileList.filter(
          (i, idx) => idx !== action.payload.idx
        );
      }),
    [DEL_DATA]: (state, action) =>
      produce(state, (draft) => {
        draft.imageLeft = initialState.imageLeft;
        draft.imageRight = initialState.imageRight;
        draft.fileList = initialState.fileList;
      }),
  },
  initialState
);

const actionCreators = {
  uploadImage,
  delData,
  delImage,
};

export { actionCreators };
