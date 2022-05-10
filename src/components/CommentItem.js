import React, { useState, useEffect } from "react";
import { Text, Button } from "../elements";
import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";
import { actionCreators } from "../redux/modules/comment";

const CommentItem = (props) => {
  const dispatch = useDispatch();
  //댓글좋아요
  const [like, setLike] = React.useState(false);

  const commentList = useSelector((state) => state.comment.comments); //[]빈배열
  const comment_id = props.commentId;
  const comments = props.comment;
  const postId = props.boardPostId;
  //좋아요!(댓글)
  const commentLike = props.likes;

  //수정을 알 수 있는 방법
  const memberId = localStorage.getItem("memberId");

  const editComment = () => {
    dispatch(actionCreators.editCommentDB(comment_id, comment, postId));
    //isEdit이 바뀌는거랑
    setIsEdit(false);
  };
  const likeComment = () => {
    dispatch(actionCreators.likeCommentDB(postId, comment_id, setLike));
    // setLike(!like);
  };

  const [isEdit, setIsEdit] = useState(false);
  const [comment, setComment] = React.useState(comments);
  const [textLength, setTextLength] = React.useState(0);
  //defaultValue가 아닌 진짜 Value로 불러오기 위한 작업
  useEffect(() => {
    console.log("유즈이펙트 시작한다~~");
    setComment(comments);
  }, [props]);
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

  const deleteComment = () => {
    if (memberId !== props.member) {
      window.alert("본인이 작성한 댓글이 아닙니다.");
      return;
    }
    if (!window.confirm("댓글을 삭제하시겠습니까??")) return;
    dispatch(actionCreators.delCommentDB({ comment_id, postId }));
  };

  const editMode = () => {
    if (memberId !== props.member) {
      window.alert("본인이 작성한 댓글이 아닙니다.");
      return;
    }
    setIsEdit(true);
  };
  if (memberId !== props.member) {
    return (
      <div style={{ border: "1px solid #ddd" }}>
        <Text color="black">{comments}</Text>
      </div>
    );
  }
  if (isEdit) {
    return (
      <div>
        <input
          placeholder="선플은 선택이 아닌 의무입니다! (최소 10자 이상)"
          onChange={(e) => {
            setComment(e.target.value);
          }}
          onKeyUp={checkMaxLength}
          style={{ width: "3700px" }}
          value={comment || ""}
        />
        <div>
          {/* <Text textAlign="right" margin="0px 5px">
            {textLength}/ 200자
          </Text> */}
          <Button _onClick={editComment}>수정완료</Button>
          <Button
            _onClick={() => {
              setIsEdit(!isEdit);
            }}
          >
            취소하기
          </Button>
        </div>
      </div>
    );
  }
  return (
    <React.Fragment>
      <div style={{ display: "flex" }}>
        <div style={{ width: "600px" }}>
          <Text color="black">{comments}</Text>
        </div>
        <div style={{ margin: "0px 50px" }}>
          <Button width="30px" _onClick={editMode}>
            수정
          </Button>
          <Button width="30px" _onClick={deleteComment}>
            삭제
          </Button>
          <LikeBtn commentLike={commentLike} onClick={likeComment}>
            💌
          </LikeBtn>
        </div>
      </div>
    </React.Fragment>
  );
};

CommentItem.defaultProps = {
  member: "나는야 오태식",
  comment: "헉,, 충격적이네요..",
};

const LikeBtn = styled.button`
  background-color: ${(props) => (props.commentLike ? "red" : "#ddd")};
  border: none;
`;

export default CommentItem;
