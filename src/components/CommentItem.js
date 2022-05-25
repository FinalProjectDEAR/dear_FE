import React, { useState, useEffect } from "react";
import { Text, Input, Modal } from "../elements";
import { ReactComponent as Like } from "../assets/comment-select.svg";
import styled from "styled-components";
//시간알려주는패키지
import TimeCounting from "time-counting";
//페이지
import CommentRemove from "../components/alert/CommentRemove";
//리덕스
import { useDispatch, useSelector } from "react-redux";
import { actionCreators } from "../redux/modules/comment";

const CommentItem = (props) => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(actionCreators.pages(props.totalPages));
    //클린업작업
    return () => {
      dispatch(actionCreators.resetPost());
    };
  }, []);
  // const Page = useSelector((state) => state.comment.pages);
  // console.log(Page);
  const commentList = useSelector((state) => state.comment.comments); //[]빈배열
  const comment_id = props.commentId;
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
  const memberId = localStorage.getItem("memberId");
  //수정하기
  const editComment = () => {
    dispatch(actionCreators.editCommentDB(comment_id, comment, postId));
    //isEdit이 바뀌는거
    setIsEdit(false);
  };
  //댓글 채택
  const likeComment = () => {
    if (boardPostId === memberId) {
      window.alert("본인 댓글은 채택이 불가합니다.");
      return;
    }
    dispatch(actionCreators.likeCommentDB(postId, comment_id));
    // setLike(!like);
  };
  //모달
  const [modalOpen, setModalOpen] = React.useState(false);
  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
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
    if (wordLength >= 200) {
      window.alert("200자 이상 작성할 수 없습니다.");
      return;
    }
    setTextLength(wordLength);
  };
  const editMode = () => {
    if (commentLike === true) {
      window.alert("이미 채택 된 댓글은 수정이 불가합니다!");
      return;
    }
    if (memberId !== props.member) {
      window.alert("본인이 작성한 댓글이 아닙니다.");
      return;
    }
    setIsEdit(true);
  };
  if (memberId !== props.member) {
    return (
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
          </CommentBox>
        </CommentContainer>
        {boardPostId ? (
          <LikeBtn commentLike={commentLike} onClick={likeComment}>
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
            maxlength="200"
            rows={7}
            value={comment || ""}
          />
          <EditBtn onClick={editComment}>
            <Text sub2 color="#948A9E">
              수정하기
            </Text>
            {/* <Btn onClick={editComment}>수정하기</Btn> */}
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
            <BtnBox
              onClick={() => {
                setModalOpen(true);
              }}
            >
              삭제
            </BtnBox>
            {modalOpen && (
              <Modal closModal={closeModal}>
                <CommentRemove
                  closeModal={closeModal}
                  postId={postId}
                  comment_id={comment_id}
                />
              </Modal>
            )}
          </CommentBox>
        </CommentContainer>
        {boardPostId ? (
          <LikeBtn commentLike={commentLike} onClick={likeComment}>
            <Like />
          </LikeBtn>
        ) : null}
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
  max-width: 1032px;
  width: 100%;
  height: 200px;
  border-bottom: 1px solid #CCCCCC;
  /* background: orange; */
  @media ${({ theme }) => theme.device.isMobile} {
    /* width: 328px; */
    margin: auto;
    /* border: 1px solid violet; */
    /* text-align: left; */
    display: flex;  
    /* background: orange; */
`;

const CommentContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding: 20px 40px;
  margin: auto;
  max-width: 1032px;
  width: 100%;
  height: 100%;
  /* border-bottom: 1px solid #cccccc; */
  @media ${({ theme }) => theme.device.isMobile} {
    /* width: 328px; */
    /* border: 1px solid orange; */
    margin: auto;
    display: flex;
`;
const TextWrapper = styled.div`
  width: 952px;
  /* height: 140px; */
  margin: auto;
  @media ${({ theme }) => theme.device.isMobile} {
    width: 90%;
    /* border: 1px solid red; */
  }
`;
const EditBtn = styled.div`
  max-width: 992px;
  width: 100%;
  justify-content: right;
  display: flex;
  cursor: pointer;
  /* background: yellow; */
  /* @media ${({ theme }) => theme.device.isMobile} {
  } */
`;
const CommentBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: left;
  padding: 6px 0px 10px;
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
  cursor: pointer;
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
  height: 40px;
  cursor: pointer;
  flex: none;
  order: 1;
  flex-grow: 0;
  border-radius: 50%;
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

const Btn = styled.button`
  border: none;
  background-color: transparent;
  color: #948a9e;
  text-decoration-line: underline;
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  cursor: pointer;
`;

const CancelContainer = styled.div`
  margin-left: 330px;
  padding-top: 25px;
  text-align: right;
  width: 200px;
  /* border: solid 1px red; */
`;
export default CommentItem;
