import React from "react";
import { Text, Button } from "../elements";

import { useDispatch, useSelector } from "react-redux";
import { actionCreators } from "../redux/modules/comment";

const CommentWrite = (props) => {
  const dispatch = useDispatch();
  const [comment, setComment] = React.useState();
  const [textLength, setTextLength] = React.useState(0);
  //글자 수 제한
  const checkMaxLength = (e) => {
    let wordLength = e.target.value.length;
    // if (wordLength <= 10) {
    //   window.alert("최소 10자 이상 작성 부탁 드립니다.");
    //   return;
    // }
    if (wordLength >= 200) {
      window.alert("200자 이상 작성할 수 없습니다.");
      return;
    }
    setTextLength(wordLength);
  };

  const addComment = () => {
    if (comment === "") {
      window.alert("댓글을 작성해주세요");
      return;
    }
    dispatch(
      actionCreators.addCommentDB({ comment: { comment } }, props.postId)
    );
    //버튼 누르면 인풋에 값 날리기
    setComment("");
  };
  return (
    <React.Fragment>
      <div style={{ display: "flex" }}>
        <input
          placeholder="선플은 선택이 아닌 의무입니다! (최소 10자 이상)"
          onChange={(e) => {
            setComment(e.target.value);
          }}
          onKeyUp={checkMaxLength}
          value={comment}
          style={{ width: "3700px" }}
        />
        <div style={{ display: "flex" }}>
          {/* <Text textAlign="right" margin="0px 5px">
            {textLength}/ 200자
          </Text> */}
          <Button width="200px" _onClick={addComment}>
            댓글등록
          </Button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CommentWrite;
