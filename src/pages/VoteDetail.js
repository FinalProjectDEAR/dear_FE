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

  const date = voteInfo.createdAt.replace("T", " ").substring(0, 16);
  // let month = date.getMonth() + 1;
  // let day = date.getDate();
  // let hour = date.getHours();
  // let minute = date.getMinutes();

  // month = month >= 10 ? month : "0" + month;
  // day = day >= 10 ? day : "0" + day;
  // hour = hour >= 10 ? hour : "0" + hour;
  // minute = minute >= 10 ? minute : "0" + minute;

  // return (
  //   date.getFullYear() + "-" + month + "-" + day + " " + hour + ":" + minute
  // );

  return (
    <React.Fragment>
      <BtnContainer></BtnContainer>
      <DetailWrapper>
        <CategoryBox>
          <Title>
            <Text body4 color="#7A37BE">
              투표
            </Text>
          </Title>
          <TitleContent>
            <TextB subTitle margin="0px">
              {voteInfo?.title}
            </TextB>
            <img
              src={vote}
              alt={vote}
              style={{
                width: "18px",
              }}
            />
          </TitleContent>
          <TimeBox>
            <Text sub7 margin="0px">
              {date}
            </Text>
          </TimeBox>
        </CategoryBox>
        {/* {voteInfo?.memberId === loginUser ? ( */}
        <LineBox>
          <MTimeBox>
            <Text sub7 margin="0px">
              {date}
            </Text>
          </MTimeBox>
          <Text
            sub7
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
        {voteInfo.vote[0].imageUrl ? (
          <ImageVote voteInfo={voteInfo} />
        ) : (
          <LetterVote voteInfo={voteInfo} />
        )}
      </DetailWrapper>
    </React.Fragment>
  );
}

const DetailWrapper = styled.div`
  margin: auto;
  width: 1032px;
  height: 450px;
  /* border: 1px solid red; */
  @media ${({ theme }) => theme.device.mobile} {
    width: 328px;
    height: 100%;
    /* height: 990px; */
    border-radius: 0px;
  }
`;

const TimeBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-right: 36px;
  gap: 2px;
  width: 120px;
  height: 45px;
`;

const CategoryBox = styled.div`
  box-sizing: border-box;
  display: flex;
  padding: 0px;
  width: 1032px;
  height: 45px;
  border-top: 1px solid #666666;
  border-bottom: 1px solid #cccccc;
  @media ${({ theme }) => theme.device.mobile} {
    ${TimeBox} {
      display: none;
    }
    flex-direction: column;
    justify-content: flex-start;
    width: 328px;
    height: 80px;
    margin-top: 80px;
    border-top: none;
    border-bottom: 1px solid #666666;
    border-radius: 0px;
  }
`;

const MTimeBox = styled.div`
  display: none;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  width: 120px;
  height: 14px;
  @media ${({ theme }) => theme.device.mobile} {
    display: block;
  }
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
  @media ${({ theme }) => theme.device.mobile} {
    padding: 0px;
    height: 40px;
  }
`;

const TitleContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  box-sizing: border-box;
  gap: 10px;
  width: 782px;
  height: 45px;
  img {
    width: 5px;
  }
  @media ${({ theme }) => theme.device.mobile} {
    height: 36px;
  }
`;

const LineBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  box-sizing: border-box;
  padding-right: 40px;
  width: 1032px;
  height: 45px;
  @media ${({ theme }) => theme.device.mobile} {
    width: 328px;
    justify-content: space-between;
    height: 24px;
    margin-top: 12px;
    padding-right: 0px;
  }
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
  @media ${({ theme }) => theme.device.mobile} {
    width: 328px;
    padding: 12px 20px;
  }
`;

const BtnContainer = styled.div`
  display: flex;
  width: 1032px;
  /* border: 1px solid pink; */
  margin: 40px auto 15px auto;
  align-items: flex-start;
  justify-content: space-between;
`;

export default VoteDetail;
