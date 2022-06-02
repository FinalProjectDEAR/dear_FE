import React from "react";

//라우트
import { useParams, useHistory } from "react-router-dom";
//리덕스
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as voteActions } from "../redux/modules/vote";
import { actionCreators as commentActions } from "../redux/modules/comment";
//스타일
import styled from "styled-components";
import { Text, TextB, Modal } from "../elements/index";
import { ReactComponent as VoteIcon } from "../assets/vote/vote.svg";
import { ReactComponent as ThumbUp } from "../assets/vote/post-select.svg";
//컴포넌트
import ImageVote from "../components/ImageVote";
import LetterVote from "../components/LetterVote";
import VoteDel from "../components/alert/VoteDel";
import Layout from "../components/Layout";

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

  const loginUser = localStorage.getItem("memberId");

  const date = voteInfo.createdAt.replace("T", " ").substring(0, 16);

  return (
    <React.Fragment>
      <Layout>
        <Background>
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
                <VoteIcon
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

            <LineBox>
              <MobileTimeBox>
                <Text sub7 margin="0px" textAlign="left">
                  {date}
                </Text>
              </MobileTimeBox>
              {voteInfo?.memberId === loginUser ? (
                <Text
                  sub7
                  cursor="pointer"
                  _onClick={() => {
                    setModalOpen(true);
                  }}
                >
                  삭제
                </Text>
              ) : null}
            </LineBox>

            {modalOpen && (
              <Modal closeModal={closeModal}>
                <VoteDel closeModal={closeModal} postId={postId} />
              </Modal>
            )}

            <ContentBox>
              <Text body3 textAlign="left">
                {voteInfo?.contents}
              </Text>
            </ContentBox>
            {voteInfo.vote[0].imageUrl ? (
              <ImageVote voteInfo={voteInfo} />
            ) : (
              <LetterVote voteInfo={voteInfo} />
            )}
          </DetailWrapper>
        </Background>
      </Layout>
    </React.Fragment>
  );
}

const Background = styled.div`
  width: 100%;
  height: 100%;
  @media ${({ theme }) => theme.device.mobile} {
    padding-top: 80px;
    height: auto;
  }
`;

const DetailWrapper = styled.div`
  width: 1032px;
  min-height: 490px;
  margin: auto;
  margin-top: 80px;
  margin-bottom: 40px;
  @media ${({ theme }) => theme.device.mobile} {
    min-height: 0px;
    width: 328px;
    box-sizing: border-box;
    margin-top: 0px;
    border-radius: 0px;
  }
`;

const TimeBox = styled.div`
  ${({ theme }) => theme.common.flexCenter};
  width: 120px;
  height: 45px;
  margin-right: 36px;
  gap: 2px;
`;

const CategoryBox = styled.div`
  display: flex;
  width: 1032px;
  height: 45px;
  box-sizing: border-box;
  padding: 0px;
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
    border-top: none;
    border-bottom: 1px solid #666666;
    border-radius: 0px;
  }
`;

const MobileTimeBox = styled.div`
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
  flex: none;
  width: 130px;
  height: 45px;
  gap: 10px;
  padding: 0px 40px;
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
  width: 782px;
  height: 45px;
  gap: 10px;
  img {
    width: 5px;
  }
  @media ${({ theme }) => theme.device.mobile} {
    width: 340px;
    height: 36px;
  }
`;

const LineBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  box-sizing: border-box;
  width: 1032px;
  height: 45px;
  padding-right: 40px;
  @media ${({ theme }) => theme.device.mobile} {
    justify-content: space-between;
    width: 328px;
    height: 24px;
    margin-top: 10px;
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
  justify-content: flex-start;
  width: 1032px;
  box-sizing: border-box;
  gap: 10px;
  padding: 30px 40px;
  word-break: keep-all;
  @media ${({ theme }) => theme.device.mobile} {
    width: 328px;
    padding: 12px 20px;
  }
`;

const BtnContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  width: 1032px;
  margin: 40px auto 15px auto;
`;

export default VoteDetail;
