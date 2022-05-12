import React, { useState, useEffect } from "react";
import { Text, Button, Input } from "../elements";
import { ReactComponent as Like } from "../assets/comment-select.svg";
import { ReactComponent as Cancel } from "../assets/Vector (2).svg";
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
  const createdAt = props.createdAt;
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
    // console.log("유즈이펙트 시작한다~~");
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
      <React.Fragment>
        <IsEdit>
          <CancelContainer>
            <CancelBtn
              onClick={() => {
                setIsEdit(!isEdit);
              }}
            >
              <Cancel />
            </CancelBtn>
          </CancelContainer>
          <TitleBox>
            <Text batang>댓글 수정하기</Text>
          </TitleBox>
          <InputStyle>
            <Input
              placeholder="선플은 선택이 아닌 의무입니다! (최소 10자 이상)"
              _onChange={(e) => {
                setComment(e.target.value);
              }}
              _onKeyUp={checkMaxLength}
              multiLine
              maxlength="200"
              rows={25}
              value={comment || ""}
            />
          </InputStyle>
          <Btn>
            <Button
              _onClick={editComment}
              bg="#948A9E"
              text="수정하기"
              width="160px"
            ></Button>
          </Btn>
        </IsEdit>
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      <CommentWrapper>
        <CommentContainer>
          <CommentBox>
            <Text color="#333333" size="13px" weight="300">
              {comments}
            </Text>
          </CommentBox>

          <CommentBox>
            <Text color="#999999" size="12px" weight="300">
              {createdAt}
            </Text>
            <BtnBox
              IsEdit={IsEdit}
              onClick={editMode}
              style={{
                borderLeft: "1px solid #999999",
                borderRight: "1px solid #999999",
                marginLeft: "4px",
              }}
            >
              수정
            </BtnBox>
            <BtnBox onClick={deleteComment}>삭제</BtnBox>
          </CommentBox>
        </CommentContainer>

        <LikeBtn commentLike={commentLike} onClick={likeComment}>
          <Like />
        </LikeBtn>
      </CommentWrapper>
    </React.Fragment>
  );
};

CommentItem.defaultProps = {
  member: "나는야 오태식",
  comment: "헉,, 충격적이네요..",
};

const CommentWrapper = styled.div`
  display: flex;
`;

const CommentContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding: 20px 40px;
  margin: auto;
  width: 1031px;
  height: 128px;
  border-bottom: 1px solid #cccccc;
`;
const CommentBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 6px 0px 0px;
  gap: 8px;
  height: 20px;
  line-height: 20px;
  flex: none;
  order: 1;
  flex-grow: 0;
  /* background-color: red; */
`;
const BtnBox = styled.button`
  border: none;
  background-color: transparent;
  color: #999999;
`;

const LikeBtn = styled.button`
  background-color: ${(props) => (props.commentLike ? "#7A37BE" : "#ddddd")};
  border: none;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px;
  gap: 4px;
  margin: auto;
  width: 40px;
  height: 30px;
  cursor: pointer;
  flex: none;
  order: 1;
  flex-grow: 0;
  border-radius: 4px;
`;

const IsEdit = styled.div`
  width: 550px;
  height: 625px;
  background: #ffffff;
  border-radius: 20px;
  position: absolute;
  top: 100px;
  left: 35%;
`;

const TitleBox = styled.div`
  justify-content: center;
  width: 550px;
  height: 20px;
  display: flex;
`;

const CancelBtn = styled.button`
  border: none;
  background-color: transparent;
  width: 24px;
  height: 24px;
`;

const InputStyle = styled.div`
  padding: 40px 35px 20px 15px;
  gap: 10px;
`;

const Btn = styled.div`
  margin: auto;
`;

const CancelContainer = styled.div`
  margin-left: 330px;
  padding-top: 25px;
  text-align: right;
  width: 200px;
  /* border: solid 1px red; */
`;
export default CommentItem;
