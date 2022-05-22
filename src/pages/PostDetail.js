import React from "react";
import { useParams, useHistory } from "react-router-dom";
import { ReactComponent as ThumbUp } from "../assets/postList/posthumb.svg";
import { ReactComponent as CommentNum } from "../assets/postList/post.svg";
import { ReactComponent as LikeUp } from "../assets/postList/postUp.svg";
import styled from "styled-components";
import { Text, Button, Modal } from "../elements/index";
//시간알려주는패키지
import TimeCounting from "time-counting";
//페이지관련
import Layout from "../components/Layout";
import CommentList from "../components/CommentList";
import CommentWrite from "../components/CommentWrite";
import PostRemove from "../components/alert/PostRemove";
import Pagination from "../elements/Pagination";
// 리덕스 관련
import { useDispatch, useSelector } from "react-redux";
import { actionCreators } from "../redux/modules/post";
import { actionCreators as commentActions } from "../redux/modules/comment";

function PostDetail(props) {
  const params = useParams();
  const postId = params.postId;
  const history = useHistory();
  const dispatch = useDispatch();
  //공감해요 버튼
  const [like, setLike] = React.useState(false);
  //페이지
  const [page, setPage] = React.useState(1);
  const totalPage = useSelector((state) => state.comment.pages);
  //포스트 상세 조회
  React.useEffect(() => {
    dispatch(actionCreators.getDetailDB(postId));
    //클린업작업
    return () => {
      dispatch(actionCreators.resetPost());
    };
  }, []);
  //페이지별 댓글리스트가져오기
  React.useEffect(() => {
    dispatch(commentActions.getCommentDB(postId, page));
  }, [page]);
  //상세페이지 가져오기
  const post = useSelector((state) => state.post.detailPost);
  const commentList = useSelector((state) => state.comment.comments);
  //시간을 알아보자!
  const option = {
    lang: "ko",
    calculate: {
      justNow: 60,
    },
  };
  const createdAt = TimeCounting(post?.createAt, option);
  const likesList = post?.likesList; //공감 수 로직
  const loginUser = localStorage.getItem("memberId");
  //모달
  const [modalOpen, setModalOpen] = React.useState(false);
  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };
  const deletePost = () => {
    dispatch(actionCreators.deletePostDB(postId));
  };
  const onRemove = () => {
    if (window.confirm("정말 삭제합니까?")) {
      deletePost();
    } else {
      alert("취소합니다.");
    }
  };
  const likePost = () => {
    setLike(!like);
    dispatch(actionCreators.likeDB(postId, like));
  };

  //optionalChaining ?. 과 같음 , useEffect는 리턴 후 실행
  // if (post === undefined) {
  //   return <React.Fragment />;
  // }
  return (
    <React.Fragment>
      <Layout>
        <DetailWrapper>
          <CategoryBox>
            <Title>
              <Text body4>카테고리</Text>
            </Title>
            <CateContent>
              <Text body4>{post?.category}</Text>
            </CateContent>
            <TitleContent>
              <Text sub7>{createdAt}</Text>
            </TitleContent>
          </CategoryBox>
          <TitleBox>
            <Title>
              <Text body4>제목</Text>
            </Title>
            <TitleContent>{post?.title}</TitleContent>
            <ThumbComment>
              <ThumbUp />
              <Text sub7> {likesList?.length}</Text>
              <CommentNum />
              <Text sub7> {commentList?.length}</Text>
            </ThumbComment>
          </TitleBox>
          <BtnContainer>
            {post?.memberId === loginUser ? (
              <>
                <BtnL
                  onClick={() => {
                    history.push(`/PostEdit/${postId}`);
                  }}
                >
                  수정
                </BtnL>
                <BtnR
                  onClick={() => {
                    setModalOpen(true);
                  }}
                >
                  삭제
                </BtnR>
                {modalOpen && (
                  <Modal closModal={closeModal}>
                    <PostRemove closeModal={closeModal} postId={postId} />
                  </Modal>
                )}
              </>
            ) : null}
          </BtnContainer>
          <ContentBox>
            <Text body6> {post?.contents}</Text>
          </ContentBox>
          <CommentPhotoWrap>
            <PhotoDivWrap>
              <PhotoDiv>
                <PhotoUpload1>
                  <PhotoWrap>
                    {post?.imgUrl &&
                      post?.imgUrl.map((image, id) => {
                        return (
                          <Img
                            key={id}
                            style={{
                              width: "80px",
                              marginTop: "5px",
                            }}
                            src={`${image}` ? `${image}` : null}
                            alt={`${image}-${id}`}
                          />
                        );
                      })}
                  </PhotoWrap>
                </PhotoUpload1>
              </PhotoDiv>
            </PhotoDivWrap>
          </CommentPhotoWrap>
          <IsLike onClick={likePost}>
            <Thumb likes={post?.likes}>
              <LikeUp />
            </Thumb>
            <Text size="14px" weight="500" color="#333333">
              공감해요
            </Text>
            <Text weight="700" color="#333333" cursor="pointer">
              {likesList?.length}
            </Text>
          </IsLike>
        </DetailWrapper>
        {/* 댓글 */}
        <CommentWrapper>
          <CommentList />
          <div>
            <Pagination setPage={setPage} totalPage={totalPage} />
          </div>

          <CommentWrite postId={postId} />
        </CommentWrapper>
      </Layout>
    </React.Fragment>
  );
}
const CommentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  /* border: 1px solid blue; */
  margin: 0px auto 0px auto;
  max-width: 1032px;
  height: 703px;
`;
const BtnContainer = styled.div`
  display: flex;
  width: 1032px;
  padding-top: 20px;
  justify-content: right;
`;
const DetailWrapper = styled.div`
  margin: auto;
  width: 1032px;
  height: 450px;
  /* border: 1px solid red; */
`;
const CategoryBox = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  width: 1032px;
  height: 45px;
  border-top: 1px solid #666666;
  border-bottom: 1px solid #cccccc;
`;
const TitleBox = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  width: 1032px;
  height: 45px;
  border-bottom: 1px solid #cccccc;
`;
const Title = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px 40px;
  gap: 10px;
  width: 130px;
  height: 45px;
  flex: none;
  order: 0;
  flex-grow: 0;
  ${({ theme }) => theme.device.mobile} {
    display: none;
  }
`;
const CateContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  /* padding: 0px 0px 0px 40px; */
  gap: 10px;
  width: 782px;
  height: 45px;
  flex: none;
  order: 1;
  flex-grow: 0;
  font-family: "KoPub Batang";
  ${({ theme }) => theme.device.mobile} {
  }
`;
const TitleContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  width: 760px;
  height: 45px;
  flex: none;
  order: 1;
  flex-grow: 0;
  font-family: "KoPub Batang";
  ${({ theme }) => theme.device.mobile} {
    width: 326px;
    margin: auto;
  }
`;
const ThumbComment = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
  /* width: 760px; */
  height: 45px;
  flex: none;
  order: 1;
  flex-grow: 0;
  font-family: "KoPub Batang";
`;

const BtnL = styled.button`
  border: none;
  background-color: transparent;
  border-right: 0.5px solid #999999;
  color: #666666;
  cursor: pointer;
`;
const BtnR = styled.button`
  border: none;
  background-color: transparent;
  color: #666666;
  cursor: pointer;
`;

const ContentBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 30px 40px;
  gap: 10px;
  width: 1032px;
  /* border: 1px solid red; */
`;
const IsLike = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin: auto;
  height: 150px;
`;

const Thumb = styled.button`
  background-color: ${(props) => (props.likes ? "#7A37BE" : "#ddddd")};
  border: none;
  border-radius: 50%;
  padding: 4px 8px;
  cursor: pointer;
  width: 30px;
  height: 30px;
`;
const CommentPhotoWrap = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;
const PhotoDivWrap = styled.div`
  display: flex;
  flex-direction: column;
`;
const PhotoDiv = styled.div`
  display: flex;
  flex-direction: row;
  margin: 10px;
  /* border: 1px solid red; */
`;
const PhotoWrap = styled.div`
  display: flex;
  flex-direction: row;
  /* border: 1px solid red; */
`;
const PhotoUpload1 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 80px;
  height: 80px;
  padding-top: 30px;
  display: block;
  /* border: 1px solid red; */
`;
const Img = styled.img`
  width: 100%;
  margin-top: 10px;
  margin-left: 15px;
  &:hover {
    transition: 0.4s;
    transform: scale(4.9);
    -webkit-transform: scale(4.9);
    -moz-transform: scale(4.9);
    -ms-transform: scale(4.9);
    -o-transform: scale(4.9);
  }
`;

export default PostDetail;
