import React, { useState, useEffect } from "react";
import { Text, Input, Modal } from "../elements";
import { ReactComponent as Like } from "../assets/comment-select.svg";
import styled from "styled-components";
import Swal from "sweetalert2";
import "../styles/libraryStyle/style.css";

//시간알려주는패키지
import TimeCounting from "time-counting";
//페이지
import CommentRemove from "../components/alert/CommentRemove";
//리덕스
import { useDispatch, useSelector } from "react-redux";
import { history } from "../redux/configureStore";
import { actionCreators } from "../redux/modules/comment";

const CommentItem = (props) => {
  // console.log(props);
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(actionCreators.pages(props.totalPages));
    //클린업작업
    // return () => {
    //   dispatch(actionCreators.resetComment());
    // };
  }, []);
  // const Page = useSelector((state) => state.comment.pages);
  // console.log(Page);
  const commentList = useSelector((state) => state.comment.comments); //[]빈배열
  const comment_id = props.commentId;
  const comments = props.comment;
  const postId = props.boardPostId;
  const boardPostId = props.member;
  // console.log(props);
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
  const post = useSelector((state) => state.post.detailPost);
  //수정하기
  const editComment = () => {
    dispatch(actionCreators.editCommentDB(comment_id, comment, postId));
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
      dispatch(actionCreators.likeCommentDB(postId, comment_id));
    }

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
            <Text color="#999999" size="12px" weight="300">
              {createdAt}
            </Text>
          </CommentBtn>
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
            maxlength="255"
            rows={7}
            value={comment || ""}
          />
          <EditBtn onClick={editComment}>
            <Text sub2 color="#948A9E" cursor="pointer">
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

          <CommentBtn>
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
                  commentItem={props}
                  setPage={props.setPage}
                />
              </Modal>
            )}
          </CommentBtn>
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
  /* height: 200px; */
  border-bottom: 1px solid #cccccc;
  /* background: orange; */
  @media ${({ theme }) => theme.device.isMobile} {
    /* width: 328px; */
    margin: auto;
    /* border: 1px solid violet; */
    /* text-align: left; */
    display: flex;
    /* background: orange; */
  }
`;

const CommentContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding: 20px 40px;
  margin: auto;
  max-width: 952px;
  width: 100%;
  height: 100%;
  /* border: 1px solid red; */
  /* border-bottom: 1px solid #cccccc; */
  @media ${({ theme }) => theme.device.isMobile} {
    /* width: 328px; */
    /* border: 1px solid red; */
    margin: auto;
    display: flex;
  }
`;
const TextWrapper = styled.div`
  width: 952px;
  /* height: 140px; */
  margin: auto;
  @media ${({ theme }) => theme.device.isMobile} {
    width: 90%;
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
  /* height: 20px; */
  line-height: 20px;
  flex: none;
  order: 1;
  flex-grow: 0;

  /* background-color: red; */
`;

const CommentBtn = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: left;
  /* padding: 6px 0px 10px; */
  gap: 8px;
  /* height: 20px; */
  margin: 0px;
  line-height: 20px;
  flex: none;
  order: 1;
  flex-grow: 0;
  /* background-color: pink; */
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
