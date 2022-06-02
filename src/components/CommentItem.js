import React, { useState, useEffect } from "react";
//리덕스
import { useDispatch, useSelector } from "react-redux";
import { history } from "../redux/configureStore";
import { actionCreators } from "../redux/modules/comment";
import { cookies } from "../shared/cookie";
//스타일
import styled from "styled-components";
import { Text, Input, Modal } from "../elements";
import { ReactComponent as Like } from "../assets/postList/Frame 676.svg";
import Swal from "sweetalert2";
import "../styles/libraryStyle/style.css";
//시간알려주는패키지
import TimeCounting from "time-counting";
//컴포넌트
import CommentRemove from "../components/alert/CommentRemove";

const CommentItem = (props) => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(actionCreators.pages(props.totalPages));
  }, []);
  const commentList = useSelector((state) => state.comment.comments); //[]빈배열
  const commentId = props.commentId;
  const comments = props.comment;
  const postId = props.boardPostId;
  const boardPostId = props.member;

  //시간을 알아보자!
  const option = {
    lang: "ko",
    calculate: {
      justNow: 60,
    },
  };

  const createdAt = TimeCounting(props.createdAt, option);
  //좋아요!(댓글)
  const commentLike = props.likes;
  //수정을 알 수 있는 방법
  const memberId = cookies.get("memberId", { path: "/" });
  const post = useSelector((state) => state.post.detailPost);
  //수정하기
  const editComment = () => {
    dispatch(actionCreators.editCommentDB(postId, commentId, comment));
    //isEdit이 바뀌는거
    setIsEdit(false);
  };
  const isUser = useSelector((state) => state.user.isLogin);
  //댓글 채택
  const likeComment = () => {
    if (!isUser) {
      Swal.fire("로그인 후 이용해주세요.");
      history.push(`/login`);
      return;
    }
    if (post.memberId === boardPostId) {
      Swal.fire("게시글 작성자 본인의 댓글은 채택이 불가합니다");
      return;
    }
    if (post.memberId !== memberId) {
      Swal.fire("게시글 작성자만 댓글 채택이 가능합니다");
      return;
    }
    if (post.memberId) {
      dispatch(actionCreators.likeCommentDB(postId, commentId));
    }
  };

  //모달
  const [modalOpen, setModalOpen] = React.useState(false);
  const closeModal = () => {
    setModalOpen(false);
  };

  const [isEdit, setIsEdit] = useState(false);
  const [comment, setComment] = React.useState(comments);
  const [textLength, setTextLength] = React.useState(0);

  //defaultValue가 아닌 진짜 Value로 불러오기 위한 작업
  useEffect(() => {
    setComment(comments);
  }, [props]);

  //글자 수 제한
  const checkMaxLength = (e) => {
    let wordLength = e.target.value.length;
    if (wordLength >= 255) {
      Swal.fire("255 이상 작성할 수 없습니다.");
      history.goBack();
    }
    setTextLength(wordLength);
  };
  const editMode = () => {
    if (commentLike === true) {
      Swal.fire("이미 채택 된 댓글은 수정이 불가합니다!");
      return;
    }
    if (memberId !== props.member) {
      Swal.fire("본인이 작성한 댓글이 아닙니다.");
      return;
    }
    setIsEdit(true);
  };
  if (memberId !== props.member) {
    return (
      <CommentWrapper>
        <CommentContainer>
          <CommentBox>
            <Text body6 textAlign="left">
              {comments}
            </Text>
          </CommentBox>
          <CommentBtn>
            <Text sub7 color="#999999" size="12px">
              {createdAt}
            </Text>
            {post.memberId === memberId ? (
              <Text
                sub
                size="12px"
                color="#7A37BE"
                cursor="pointer"
                _onClick={likeComment}
              >
                {commentLike ? "댓글 채택취소" : "댓글 채택하기"}
              </Text>
            ) : null}
          </CommentBtn>
        </CommentContainer>
        {commentLike ? (
          <LikeBtn>
            <Like />
          </LikeBtn>
        ) : null}
      </CommentWrapper>
    );
  }
  if (isEdit) {
    return (
      <React.Fragment>
        <TextWrapper>
          <Input
            placeholder="선플은 선택이 아닌 의무입니다! (최소 10자 이상)"
            _onChange={(e) => {
              setComment(e.target.value);
            }}
            _onKeyUp={checkMaxLength}
            multiLine
            maxlength="255"
            rows={7}
            value={comment || ""}
          />
          <EditBtn onClick={editComment}>
            <Text sub2 color="#948A9E" cursor="pointer">
              수정하기
            </Text>
          </EditBtn>
        </TextWrapper>
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      <CommentWrapper>
        <CommentContainer>
          <CommentBox>
            <Text body6 textAlign="left">
              {comments}
            </Text>
          </CommentBox>
          <CommentBtn>
            <Text sub7 color="#999999" size="12px">
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
              <Text sub7 color="#999999" size="12px" cursor="pointer">
                수정
              </Text>
            </BtnBox>
            <BtnBox
              onClick={() => {
                setModalOpen(true);
              }}
            >
              <Text sub7 color="#999999" size="12px" cursor="pointer">
                삭제
              </Text>
            </BtnBox>
            {modalOpen && (
              <Modal closModal={closeModal}>
                <CommentRemove
                  closeModal={closeModal}
                  postId={postId}
                  commentId={commentId}
                  commentItem={props}
                  setPage={props.setPage}
                />
              </Modal>
            )}
          </CommentBtn>
        </CommentContainer>
      </CommentWrapper>
    </React.Fragment>
  );
};

const CommentWrapper = styled.div`
  display: flex;
  width: 1032px;
  border-bottom: 1px solid #cccccc;
  @media ${({ theme }) => theme.device.mobile} {
    width: 320px;
    display: flex;
    margin: auto;
  }
`;

const CommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 20px 40px;
  margin: auto;
  box-sizing: border-box;
  @media ${({ theme }) => theme.device.mobile} {
    display: flex;
    margin: auto;
  }
`;

const TextWrapper = styled.div`
  width: 952px;
  margin: auto;
  @media ${({ theme }) => theme.device.mobile} {
    width: 90%;
  }
`;

const EditBtn = styled.div`
  justify-content: right;
  display: flex;
  max-width: 992px;
  width: 100%;
  cursor: pointer;
`;

const CommentBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: left;
  padding: 6px 0px 10px;
  gap: 8px;
  line-height: 20px;
  flex: none;
  order: 1;
  flex-grow: 0;
  box-sizing: border-box;
`;

const CommentBtn = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: left;
  gap: 8px;
  line-height: 20px;
  flex: none;
  order: 1;
  flex-grow: 0;
`;

const BtnBox = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
`;

const LikeBtn = styled.div`
  ${({ theme }) => theme.common.flexCenter};
  box-sizing: border-box;
`;

const IsEdit = styled.div`
  width: 550px;
  height: 625px;
  background: #ffffff;
  border-radius: 20px;
  position: absolute;
  top: 100px;
  left: 35%;
  box-sizing: border-box;
`;

export default CommentItem;
