import React from "react";
import { useParams, useHistory } from "react-router-dom";
import { ReactComponent as ThumbUp } from "../assets/post-select.svg";
import styled from "styled-components";
import { Text, Button } from "../elements/index";
//페이지 관련
import ImageVote from "../components/ImageVote";
import LetterVote from "../components/LetterVote";

// 리덕스 관련
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as voteActions } from "../redux/modules/vote";
import { actionCreators as commentActions } from "../redux/modules/comment";

function VoteDetail(props) {
  const params = useParams();
  const postId = params.postId;
  const history = useHistory();
  const dispatch = useDispatch();

  //공감해요 버튼
  const [like, setLike] = React.useState(false);

  //포스트 상세 조회,댓글리스트가져오기
  React.useEffect(() => {
    dispatch(voteActions.detailVoteDB(postId));
  }, []);

  //상세페이지 가져오기
  const voteInfo = useSelector((state) => state.vote.voteInfo);
  console.log(voteInfo);

  const loginUser = localStorage.getItem("memberId");
  // console.log(memberId, loginUser);

  const delVote = () => {
    dispatch(voteActions.delVoteDB(postId));
  };
  const onRemove = () => {
    if (window.confirm("정말 삭제합니까?")) {
      delVote();
    } else {
      alert("취소합니다.");
    }
  };

  return (
    <React.Fragment>
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
        {voteInfo?.memberId === loginUser ? (
          <div>
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
      <DetailWrapper>
        <CategoryBox>
          <Title>주제</Title>
          <TitleContent>{voteInfo?.title}</TitleContent>
        </CategoryBox>

        <ContentBox>{voteInfo?.contents}</ContentBox>
        {voteInfo.vote[0].imageUrl ? <ImageVote /> : <LetterVote />}
      </DetailWrapper>
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
  /* border: 1px solid pink; */
  margin: 40px auto 15px auto;
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
  box-sizing: border-box;
  padding: 30px 40px;
  gap: 10px;
  width: 1032px;
  height: 108px;
`;
const IsLike = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 30px;
  gap: 10px;
  margin: auto;
  width: 130px;
  height: 24px;
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
  /* margin-top: -133px; */
`;
const PhotoDivWrap = styled.div`
  display: flex;
  flex-direction: column;
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
  /* border: 1px solid red; */
  padding-bottom: 10px;
  display: block;
  border: 1px solid red;
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

export default VoteDetail;
