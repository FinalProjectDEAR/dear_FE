import React from "react";
import styled from "styled-components";
import { Button, Input } from "../elements";

import { useDispatch } from "react-redux";
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
      <CommentWriteWrapper>
        <TextWrapper>
          <TextBox>댓글 쓰기</TextBox>
          <div styled={{ width: "100%" }}>
            <Input
              placeholder="선플은 선택이 아닌 의무입니다! (최소 10자 이상)"
              _onChange={(e) => {
                setComment(e.target.value);
              }}
              _onKeyUp={checkMaxLength}
              value={comment}
              multiLine
              maxlength="200"
              rows={7}
            />
          </div>
        </TextWrapper>

        <BtnWrapper>
          <Button primaryDefault size="narrow" _onClick={addComment}>
            댓글쓰기
          </Button>
        </BtnWrapper>
      </CommentWriteWrapper>
    </React.Fragment>
  );
};
const CommentWriteWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1032px;
  height: 250px;
  background: #ffffff;
  box-shadow: 0px 0px 20px rgba(172, 151, 197, 0.25);
  border-radius: 10px;
  flex: none;
  order: 0;
  flex-grow: 0;
  @media ${({ theme }) => theme.device.mobile} {
    width: 328px;
    border: 1px solid pink;
  }
`;
const TextWrapper = styled.div`
  width: 952px;
  height: 140px;
  margin: auto;
  @media ${({ theme }) => theme.device.mobile} {
    width: 328px;
    border: 1px solid red;
  }
`;
const TextBox = styled.div`
  display: flex;
  padding: 10px;
  margin-left: 10px;
  weight: 100%;
  size: 14px;
  line-height: 18px;
  align-items: flex-start;
`;

const BtnWrapper = styled.div`
  display: flex;
  box-sizing: border-box;
  margin: 0px auto;
  flex-direction: row;
  margin: 30px 10px 10px;
  justify-content: right;
  align-items: right;
  max-width: 992px;
  width: 100%;
  height: 51px;
  flex: none;
  order: 1;
  flex-grow: 0;
  @media ${({ theme }) => theme.device.mobile} {
    width: 328px;
    border: 1px solid red;
  }
`;
export default CommentWrite;
