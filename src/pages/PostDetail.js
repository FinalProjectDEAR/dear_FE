import React from "react";
import { useParams, useHistory } from "react-router-dom";
import { ReactComponent as ThumbUp } from "../assets/post-select.svg";
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
  const [like, setLike] = React.useState(false);
  //포스트 상세 조회,댓글리스트가져오기
  React.useEffect(() => {
    dispatch(actionCreators.getDetailDB(postId));
    dispatch(commentActions.getCommentDB(postId));
  }, []);
  //상세페이지 가져오기
  const post = useSelector((state) => state.post.detailPost);
  console.log(post);

  const likesList = post?.likesList; //길이 로직

  const loginUser = localStorage.getItem("memberId");
  // console.log(memberId, loginUser);

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
      <DetailWrapper>
        <CategoryBox>
          <Title>카테고리</Title>
          <TitleContent>{post?.category}</TitleContent>
        </CategoryBox>
        <TitleBox>
          <Title>제목</Title>
          <TitleContent>{post?.title}</TitleContent>
        </TitleBox>
        <ContentBox>{post?.contents}</ContentBox>
        <CommentPhotoWrap>
          <PhotoDivWrap>
            <PhotoDiv>
              <PhotoUpload1>
                {/* <Img src={post?.imgUrl} /> */}
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
            <ThumbUp />
          </Thumb>
          <Text size="14px" weight="500" color="#333333">
            공감해요
          </Text>
          <Text weight="700" color="#333333" cursor="pointer">
            {/* <span style={{ color: "#7A37BE" }}>{likesList}</span> */}
          </Text>
        </IsLike>
      </DetailWrapper>
      <BtnContainer>
        <Button
          text="목록"
          bg="#948A9E"
          color="white"
          width="140px"
          _onClick={() => {
            history.push("/postList");
          }}
          cursor="pointer"
        />
        {post?.memberId === loginUser ? (
          <div>
            <Button
              text="수정하기"
              bg="#948A9E"
              color="white"
              width="140px"
              cursor="pointer"
              _onClick={() => {
                history.push(`/PostEdit/${postId}`);
              }}
            />
            <Button
              text="삭제하기"
              bg="#61586A"
              color="white"
              width="140px"
              _onClick={onRemove}
              cursor="pointer"
            />
          </div>
        ) : null}
      </BtnContainer>
      <CommentWrapper>
        <CommentList />
        <CommentWrite postId={postId} />
      </CommentWrapper>
    </React.Fragment>
  );
}
const CommentWrapper = styled.div`
  /* border: 1px solid red; */
  margin: 200px auto 0px auto;
  width: 1032px;
`;
const BtnContainer = styled.div`
  display: flex;
  width: 1032px;
  border-top: 1px solid #666666;
  margin: 40px auto 15px auto;
  padding-top: 20px;
  align-items: flex-start;
  justify-content: space-between;
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
  border-bottom: 1px solid #666666;
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
`;
const TitleContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px 0px 0px 40px;
  gap: 10px;
  width: 782px;
  height: 45px;
  flex: none;
  order: 1;
  flex-grow: 0;
  font-family: "KoPub Batang";
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
  /* border: 1px solid red; */
`;

const Thumb = styled.button`
  background-color: ${(props) => (props.likes ? "#7A37BE" : "#ddddd")};
  border: none;
  border-radius: 4px;
  padding: 4px 8px;
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
