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
  const [like, setLike] = React.useState(true);
  //페이지
  const [page, setPage] = React.useState(1);
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
  // console.log(post);
  const commentList = useSelector((state) => state.comment.comments);
  // console.log(commentList);
  const commentPage = commentList?.[0]?.totalPages;
  // console.log(commentPage);
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
  //본인인지 확인 하기
  const member = localStorage.getItem("memberId");
  const likePost = () => {
    if (post?.memberId === member) {
      window.alert("본인 글의 공감은 불가합니다.");
      return;
    }
    setLike(!like);
    dispatch(actionCreators.likeDB(postId, like));
  };

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

          <MobileCategory>
            <Text body4 color="#7A37BE">
              {post?.category}
            </Text>
          </MobileCategory>
          <TitleBox>
            <Title>
              <Text body4>제목</Text>
            </Title>
            <TitleContent>{post?.title}</TitleContent>
            <ThumbComment>
              <ThumbUp />
              <Text sub7> {likesList?.length}</Text>
              <CommentNum />
              <Text sub7> {commentList[0]?.totalComments}</Text>
            </ThumbComment>
          </TitleBox>
          <BtnContainer>
            <div className="time">
              <Text sub7>{createdAt}</Text>
            </div>
            {post?.memberId === loginUser ? (
              <div className="smallBtn">
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
              </div>
            ) : null}
          </BtnContainer>
          <ContentBox>
            <Text body6 textAlign="left">
              {post?.contents}
            </Text>
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
          <IsLike>
            <Thumb likes={post?.likes} onClick={likePost}>
              <LikeUp />
            </Thumb>
            <Text size="14px" weight="500" color="#333333">
              공감해요
            </Text>
            <Text weight="700" color="#7A37BE" cursor="pointer">
              {likesList?.length}
            </Text>
          </IsLike>
        </DetailWrapper>
        {/* 댓글 */}
        <CommentWrapper>
          <CommentList />
        </CommentWrapper>
        <PageWrapper>
          <Pagination setPage={setPage} totalPage={commentPage} />
        </PageWrapper>
        <WriteWrapper>
          <CommentWrite postId={postId} />
        </WriteWrapper>
      </Layout>
    </React.Fragment>
  );
}
const CommentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 30px auto 0px auto;
  max-width: 1032px;
  width: 100%;
  height: 300px;
  /* border: 1px solid blue; */
`;
const PageWrapper = styled.div`
  /* border: 1px solid red; */
  @media ${({ theme }) => theme.device.isMobile} {
    padding: 10px 0px 10px;
  }

  display: flex;
  justify-content: center;
  align-items: center;

  /* border: 1px solid red; */
`;
const WriteWrapper = styled.div`
  padding: 10px 0px 10px;
`;
const BtnContainer = styled.div`
  display: flex;
  width: 1032px;
  padding-top: 20px;
  justify-content: right;
  @media ${({ theme }) => theme.device.isMobile} {
    width: 326px;
    border-top: 1px solid #666666;
    justify-content: space-between;
  }
  @media ${({ theme }) => theme.device.web} {
    .time {
      display: none;
    }
    .smallBtn {
      /* border: 1px solid red; */
      /* justify-content: right; */
    }
  }
`;
const DetailWrapper = styled.div`
  margin: auto;
  max-width: 1032px;
  width: 100%;
  max-height: 700px;
  /* border: 1px solid red; */
  @media ${({ theme }) => theme.device.isMobile} {
    width: 326px;
    margin: auto;
  }
`;
const CategoryBox = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  max-width: 1032px;
  width: 100%;
  height: 45px;
  border-top: 1px solid #666666;
  border-bottom: 1px solid #cccccc;
  /* background: yellow; */
  @media ${({ theme }) => theme.device.isMobile} {
    /* width: 326px;
    margin: auto;
    border: none; */
    display: none;
  }
`;
const TitleBox = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  max-width: 1032px;
  width: 100%;
  height: 45px;
  border-bottom: 1px solid #cccccc;
  @media ${({ theme }) => theme.device.isMobile} {
    width: 326px;
    margin: auto;
    /* border: 1px solid red; */
  }
`;

const MobileCategory = styled.div`
  @media ${({ theme }) => theme.device.isMobile} {
    /* border: 1px solid red; */
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
  }
  @media ${({ theme }) => theme.device.web} {
    display: none;
  }
`;
const Title = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px 40px;
  gap: 10px;
  max-width: 130px;
  width: 100%;
  height: 45px;
  flex: none;
  order: 0;
  flex-grow: 0;
  @media ${({ theme }) => theme.device.isMobile} {
    display: none;
  }
`;
const CateContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  max-width: 782px;
  width: 100%;
  height: 45px;
  flex: none;
  order: 1;
  flex-grow: 0;
  font-family: "KoPub Batang";
`;
const TitleContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  max-width: 760px;
  width: 100%;
  height: 45px;
  flex: none;
  order: 1;
  flex-grow: 0;
  font-family: "KoPub Batang";
  @media ${({ theme }) => theme.device.isMobile} {
    width: 326px;
    margin: auto;
  }
`;
const ThumbComment = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
  height: 45px;
  flex: none;
  order: 1;
  flex-grow: 0;
  font-family: "KoPub Batang";
  @media ${({ theme }) => theme.device.isMobile} {
    display: none;
  }
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
  padding: 30px;
  gap: 10px;
  max-width: 1032px;
  width: 100%;
  /* border: 1px solid red; */
  box-sizing: border-box;
  @media ${({ theme }) => theme.device.isMobile} {
    padding: 30px 0px;
  }
`;
const IsLike = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin: auto;
  height: 20px;
  /* border: 1px solid yellow; */
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
  /* flex-direction: column; */
`;
const PhotoDiv = styled.div`
  display: flex;
  /* flex-direction: row; */
  margin: 10px;
  /* border: 1px solid red; */
`;
const PhotoWrap = styled.div`
  display: flex;
  /* flex-direction: row; */
  /* border: 1px solid red; */
  ${({ theme }) => theme.device.isMobile} {
    display: flex;
    flex-direction: column;
  }
`;
const PhotoUpload1 = styled.div`
  display: flex;
  /* flex-direction: column; */
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
    transform: scale(2.9);
    -webkit-transform: scale(2.9);
    -moz-transform: scale(2.9);
    -ms-transform: scale(2.9);
    -o-transform: scale(2.9);
  }
`;

export default PostDetail;
