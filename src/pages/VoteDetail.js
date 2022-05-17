import React from "react";
import { useParams, useHistory } from "react-router-dom";
import { ReactComponent as ThumbUp } from "../assets/post-select.svg";

import styled from "styled-components";
import { Text, TextB, Modal } from "../elements/index";
import vote from "../assets/vote/vote.png";

//페이지 관련
import ImageVote from "../components/ImageVote";
import LetterVote from "../components/LetterVote";
import VoteDel from "../components/alert/VoteDel";

// 리덕스 관련
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as voteActions } from "../redux/modules/vote";
import { actionCreators as commentActions } from "../redux/modules/comment";

function VoteDetail(props) {
  const params = useParams();
  const postId = params.postId;
  const history = useHistory();
  const dispatch = useDispatch();

  //모달
  const [modalOpen, setModalOpen] = React.useState(false);

  const closeModal = () => {
    setModalOpen(false);
  };

  React.useEffect(() => {
    dispatch(voteActions.detailVoteDB(postId));
  }, []);

  const voteInfo = useSelector((state) => state.vote.voteInfo);
  console.log(voteInfo);

  const loginUser = localStorage.getItem("memberId");

  return (
    <React.Fragment>
      <BtnContainer></BtnContainer>
      <DetailWrapper>
        <CategoryBox>
          <Title>주제</Title>
          <TitleContent>
            <TextB subTitle>
              {voteInfo?.title}
              <img
                src={vote}
                alt={vote}
                style={{
                  width: "18px",
                  margin: "auto 10px",
                  alignItems: "center",
                }}
              />
            </TextB>
          </TitleContent>
          <TimeBox>
            <Text sub7>{voteInfo.createdAt}</Text>
          </TimeBox>
        </CategoryBox>
        {/* {voteInfo?.memberId === loginUser ? ( */}
        <LineBox>
          <Text
            sub7
            margin="18.5px 45px"
            cursor="pointer"
            _onClick={() => {
              setModalOpen(true);
            }}
          >
            삭제
          </Text>
        </LineBox>
        {/* ) : null} */}

        {modalOpen && (
          <Modal closeModal={closeModal}>
            <VoteDel closeModal={closeModal} postId={postId} />
          </Modal>
        )}

        <ContentBox>
          <Text body3>{voteInfo?.contents}</Text>
        </ContentBox>
        {voteInfo.vote[0].imageUrl ? <ImageVote /> : <LetterVote />}
      </DetailWrapper>
    </React.Fragment>
  );
}

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
  padding: 0px;
  width: 1032px;
  height: 45px;
  border-top: 1px solid #666666;
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
`;

const TitleContent = styled.div`
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding: 0px 0px 0px 40px;
  gap: 10px;
  width: 782px;
  height: 45px;
`;

const LineBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-start;
  padding: 0px;
  width: 1032px;
  height: 45px;
`;

const DelText = styled.p`
  font-family: "Pretendard";
  font-weight: 300;
  font-size: 12px;
  line-height: 14px;

  color: #666666;
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

const TimeBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-right: 45px;
  gap: 2px;

  width: 120px;
  height: 45px;
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
