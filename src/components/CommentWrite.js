import React from "react";

import { useHistory } from "react-router-dom";

import { actionCreators } from "../redux/modules/comment";
import { useSelector, useDispatch } from "react-redux";

import styled from "styled-components";
import { Button, Input } from "../elements";
import Swal from "sweetalert2";
import "../styles/libraryStyle/style.css";

const CommentWrite = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [comment, setComment] = React.useState();
  const [textLength, setTextLength] = React.useState(0);

  //글자 수 제한
  const checkMaxLength = (e) => {
    let wordLength = e.target.value.length;
    if (wordLength >= 255) {
      Swal.fire("255 이상 작성할 수 없습니다.");
      return;
    }
    setTextLength(wordLength);
  };

  const isUser = useSelector((state) => state.user.isLogin);

  const addComment = () => {
    if (!isUser) {
      Swal.fire("로그인 후 이용해주세요.");
      history.push(`/login`);
      return;
    }
    if (comment === "") {
      Swal.fire("댓글을 작성해주세요");
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
        <TextBox>댓글 쓰기</TextBox>
        <TextWrapper>
          <Input
            placeholder="선플은 선택이 아닌 의무입니다!"
            _onChange={(e) => {
              setComment(e.target.value);
            }}
            _onKeyUp={checkMaxLength}
            value={comment}
            multiLine
            maxlength="255"
            rows={7}
            is_submit
            onSubmit={addComment}
          />
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
  width: 100%;
  height: 250px;
  margin: auto;
  background: #ffffff;
  box-shadow: 0px 0px 20px rgba(172, 151, 197, 0.25);
  border-radius: 10px;
  flex: none;
  order: 0;
  flex-grow: 0;
`;

const TextWrapper = styled.div`
  width: 952px;
  height: 140px;
  margin: auto;
  @media ${({ theme }) => theme.device.isMobile} {
    width: 90%;
  }
`;

const TextBox = styled.div`
  display: flex;
  align-items: flex-start;
  weight: 100%;
  padding: 15px;
  margin-left: 10px;
  size: 14px;
  line-height: 18px;
  @media ${({ theme }) => theme.device.isMobile} {
    display: none;
  }
`;

const BtnWrapper = styled.div`
  display: flex;
  justify-content: right;
  align-items: right;
  flex-direction: row;
  max-width: 992px;
  width: 100%;
  height: 51px;
  margin: 0px auto;
  box-sizing: border-box;
  flex: none;
  order: 1;
  flex-grow: 0;
  @media ${({ theme }) => theme.device.isMobile} {
    width: 100%;
    margin: auto;
    justify-content: center;
    align-items: center;
  }
`;
export default CommentWrite;
