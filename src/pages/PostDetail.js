import React from "react";
import { useParams, useHistory } from "react-router-dom";
import styled from "styled-components";
import { Text, Button } from "../elements/index";
//페이지 관련
import CommentList from "../components/CommentList";
import CommentWrite from "../components/CommentWrite";
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
  const [count, setCount] = React.useState(0);
  //포스트 상세 조회 가져오기, 댓글리스트가져오기
  React.useEffect(() => {
    dispatch(actionCreators.getDetailDB(postId));
    dispatch(commentActions.getCommentDB(postId));
  }, []);
  //상세페이지 가져오기
  const post = useSelector((state) => state.post.detailPost);
  // console.log(post);
  const image = post?.imgUrl;
  const memberId = post?.memberId;

  const loginUser = localStorage.getItem("memberId");
  console.log(memberId, loginUser);

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

  //optionalChaining ?. 과 같음 , useEffect는 리턴 후 실행
  // if (post === undefined) {
  //   return <React.Fragment />;
  // }
  return (
    <React.Fragment>
      <Wrap>
        <ReviewTitle>익명 상담 작성하기</ReviewTitle>
        <WriteWrap>
          <CategoryWrap>
            <CommentTitle>카테고리</CommentTitle>
            <CommentTitleBorder1>{post?.category}</CommentTitleBorder1>
          </CategoryWrap>
          <TitleWrap>
            <CommentTitle>제목</CommentTitle>
            <CommentTitleBorder1>
              <CommentTitleDiv>{post?.title}</CommentTitleDiv>
            </CommentTitleBorder1>
          </TitleWrap>

          <CommentTextWrap>
            <CommentTextTitle style={{ height: "210px" }}>
              후기작성
            </CommentTextTitle>
            <CommentTitleBorder2>
              <CommentText>{post?.contents}</CommentText>
            </CommentTitleBorder2>
            <CommentTitleBorder3 />
          </CommentTextWrap>
          <CommentPhotoWrap>
            <CommentPhotoTitle style={{ height: "150px" }}>
              사진파일
            </CommentPhotoTitle>
            <PhotoDivWrap>
              <PhotoDiv>
                <PhotoUpload1>
                  {/* <Img src={post?.imgUrl} /> */}
                  <PhotoWrap>
                    {image &&
                      image.map((image, id) => {
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
        </WriteWrap>
        {memberId === loginUser ? (
          <div style={{ display: "flex" }}>
            <Button
              _onClick={() => {
                history.push(`/PostEdit/${postId}`);
              }}
            >
              <Text color="#ffffff" size="16.5px" margin="1px 0 0 0">
                수정하기
              </Text>
            </Button>
            <Button _onClick={onRemove} cursor="pointer">
              <Text color="#ffffff" size="16.5px" margin="1px 0 0 0">
                삭제하기
              </Text>
            </Button>
          </div>
        ) : (
          <div style={{ margin: "20px" }}>
            <Button
              _onClick={() => {
                {
                  setCount(+1);
                }
              }}
            >
              <Text color="#ffffff" size="16.5px" margin="1px 0 0 0">
                공감해요 {count}
              </Text>
            </Button>
          </div>
        )}
        <CommentWrite postId={postId} />
        <CommentList />
      </Wrap>
    </React.Fragment>
  );
}
const Wrap = styled.div`
  max-width: 820px;
  display: inline-block;
`;
const ReviewTitle = styled.div`
  height: 50px;
  font-weight: 700;
  font-size: 24px;
  color: #333;
  display: flex;
  margin-left: 28px;
`;
const TitleWrap = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
  align-content: center;
`;
const CategoryWrap = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
  align-content: center;
  margin-top: 5px;
`;
const WriteWrap = styled.div`
  width: 820px;
`;
const CommentTitleBorder1 = styled.div`
  padding: 10px 0px 1px 10px;
  width: 550px;
  display: flex;
`;
const CommentTitleBorder2 = styled.div`
  padding: 10px 0px 10px 10px;
  width: 550px;
  display: flex;
  margin-top: 130px;
`;
const CommentTitleBorder3 = styled.div`
  padding: 10px 0px 10px 10px;
  width: 550px;
  display: flex;
  margin-top: 331px;
  margin-left: -670px;
`;
const CommentTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 165px;
  height: 100%;
  border-top: 1px solid #dddfe1;
  background-color: #f7f7f7;
  font-size: 12px;
  color: #666;
`;
const CommentTitleDiv = styled.div`
  display: flex;
  width: 96%;
  height: 34px;
  padding: 10px 10px;
  border: 1px solid #dddfe1;
  font-size: 12px;
  color: #000;
  line-height: 18px;
  outline: none;
  margin-top: -4px;
  box-sizing: border-box;
`;
const CommentTextWrap = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: -16%;
`;
const CommentTextTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 39px;
  padding: 0 10px;
  width: 148px;
  height: 100%;
  border-top: 1px solid #dddfe1;
  background-color: #f7f7f7;
  font-size: 12px;
  color: #666;
  text-overflow: hidden;
  text-align: center;
`;
const CommentText = styled.div`
  display: flex;
  width: 96%;
  height: 200px;
  padding: 10px 10px;
  border: 1px solid #dddfe1;
  font-size: 12px;
  color: #000;
  line-height: 18px;
  outline: none;
  margin-top: 1px;
  margin-bottom: 100px;
  resize: none;
  text-align: left;
  box-sizing: border-box;
`;
const CommentPhotoWrap = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: -133px;
`;
const PhotoDivWrap = styled.div`
  display: flex;
  flex-direction: column;
`;
const CommentPhotoTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 41px;
  padding: 0 10px;
  width: 150px;
  height: 100%;
  border-top: 1px solid #dddfe1;
  border-bottom: 1px solid #dddfe1;
  background-color: #f7f7f7;
  font-size: 12px;
  color: #666;
  text-overflow: hidden;
  text-align: center;
`;
const PhotoDiv = styled.div`
  display: flex;
  flex-direction: row;
  margin: -42px 0px 0px 10px;
`;
const PhotoWrap = styled.div`
  display: flex;
  flex-direction: row;
`;
const PhotoUpload1 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 80px;
  height: 80px;
  margin: 10px 0;
  border: none;
  margin: 10px;
  margin-top: 40px;
  padding-bottom: 10px;
  display: block;
`;
const Img = styled.img`
  width: 100%;
  margin-top: 10px;
  margin-left: 10px;
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
