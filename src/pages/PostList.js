import React from "react";
import { Button, Text, TextB } from "../elements";
import styled from "styled-components";
import { ReactComponent as All } from "../assets/board-cate1.svg";
import { ReactComponent as Vote } from "../assets/board-cate2.svg";
import { ReactComponent as Some } from "../assets/board-cate3.svg";
import { ReactComponent as Love } from "../assets/board-cate4.svg";
import { ReactComponent as Broken } from "../assets/board-cate5.svg";
import { ReactComponent as Again } from "../assets/board-cate6.svg";
import { ReactComponent as Solo } from "../assets/board-cate3 (1).svg";
import { ReactComponent as Etc } from "../assets/board-cate8.svg";

import { useHistory } from "react-router-dom";
import { actionCreators } from "../redux/modules/post";
import { useDispatch, useSelector } from "react-redux";

import Post from "../pages/Post";

function PostList(props) {
  const mytoken = localStorage.getItem("accessToken");
  const dispatch = useDispatch();
  const history = useHistory();

  //게시글 전체 조회
  React.useEffect(() => {
    dispatch(actionCreators.getPostDB());
  }, []);
  const postList = useSelector((state) => state.post.post);

  return (
    <React.Fragment>
      <InfoWrapper id="1">
        <InfoContainer>
          <Text title textAlign="left">
            디어상담소
          </Text>
          <TextB color="#61586A" size="16px" lineheight="30px" textAlign="left">
            간단한 연애 질문부터 채팅으로 말하지 못한 긴 고민까지,
          </TextB>
          <TextB color="#61586A" size="16px" lineheight="30px" textAlign="left">
            언제든 고민을 남기면 리스너들이 답장을 남깁니다.
          </TextB>
          <TextB color="#61586A" size="16px" lineheight="30px" textAlign="left">
            못다한 이야기를 디어상담소에 남겨보세요!
          </TextB>
        </InfoContainer>
        <InfoBox></InfoBox>
      </InfoWrapper>
      <VoteWrapper>
        <Text color="#2E2A32" weight="700">
          지금 뜨거운 투표
        </Text>
        <MoreVote>진행중인 투표 더보기 ></MoreVote>
      </VoteWrapper>

      <BoardWrapper>
        <CateGoryWrapper>
          <CategoryBtn
            onClick={() => {
              history.push("/전체");
            }}
          >
            <AllBtn>
              <All />
            </AllBtn>
            전체
          </CategoryBtn>
          <CategoryBtn
            onClick={() => {
              history.push("/투표");
            }}
          >
            <Vote />
            투표
          </CategoryBtn>
          <CategoryBtn
            onClick={() => {
              history.push("/솔로");
            }}
          >
            <Solo />
            솔로
          </CategoryBtn>
          <CategoryBtn
            onClick={() => {
              history.push("/짝사랑");
            }}
          >
            <Love />
            짝사랑
          </CategoryBtn>
          <CategoryBtn
            onClick={() => {
              history.push("/썸");
            }}
          >
            <Some />썸
          </CategoryBtn>
          <CategoryBtn
            onClick={() => {
              history.push("/연애");
            }}
          >
            <Again />
            연애
          </CategoryBtn>
          <CategoryBtn
            onClick={() => {
              history.push("/이별");
            }}
          >
            <Broken />
            이별
          </CategoryBtn>
          <CategoryBtn
            onClick={() => {
              history.push("/기타");
            }}
          >
            <Etc />
            기타
          </CategoryBtn>
        </CateGoryWrapper>
        <TitleWrapper>
          <Text color="#2E2A32" weight="700" size="18px">
            익명상담소
          </Text>
        </TitleWrapper>
        <PostTable>
          <TableInfo>
            <InfoItem style={{ marginLeft: "100px" }}>제목</InfoItem>
            <InfoItem style={{ marginRight: "110px" }}>작성일</InfoItem>
          </TableInfo>
          {postList &&
            postList.map((item, idx) => {
              // PostDetail 페이지에 item값을 props로 넘겨준다.
              return <Post key={idx} item={item} />;
            })}
        </PostTable>
        <BtnWrapper>
          <BtnContainer>
            <Button text="투표만들기" bg="#948A9E" />
            <Button
              text="상담신청하기"
              bg="#61586A"
              _onClick={() => {
                history.push("/postWrite");
              }}
            />
          </BtnContainer>
        </BtnWrapper>
      </BoardWrapper>
    </React.Fragment>
  );
}

const InfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: auto;
  width: 1032px;
  height: 150px;
  border: 1px solid red;
`;
const InfoContainer = styled.div`
  width: 385px;
  height: 150px;
  border: 1px solid red;
`;
const InfoBox = styled.div`
  width: 592px;
  height: 200px;
  border: 1px solid red;
`;
const VoteWrapper = styled.div`
  width: 1032px;
  height: 408px;
  margin: 155px auto 200px;
  border: 1px solid red;
  cursor: pointer;
  text-align: left;
`;
const MoreVote = styled.span`
  color: #948a9e;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  text-decoration-line: underline;
  width: 129px;
  height: 18px;
  border: 1px solid red;
  line-height: 720px;
`;
const BoardWrapper = styled.div`
  margin: auto;
  max-width: 1032px;
  height: 547px;
  /* border: 1px solid green; */
`;
const TitleWrapper = styled.div`
  display: flex;
  width: 1032px;
  /* background: pink; */
  justify-content: space-between;
  padding-top: 36px;
`;
const CateGoryWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin: auto;
  gap: 20px;
  max-width: 600px;
  height: 82px;
  left: 204px;
  top: 1178px;
  /* background: yellow; */
`;
const BtnWrapper = styled.div`
  padding-top: 10px;
  padding-left: 727px;
  display: flex;
`;
const BtnContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  width: 290px;
  height: 40px;
`;
const CategoryBtn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0px;
  gap: 10px;
  width: 54px;
  height: 82px;
  flex: none;
  order: 0;
  flex-grow: 0;
  cursor: pointer;
  /* border: 1px solid red; */
`;
const AllBtn = styled.div`
  background-color: #fafafa;
  border-radius: 10px;
  box-shadow: 0px 0px 20px rgba(172, 151, 197, 0.25);
  width: 76px;
  height: 76px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 18px;
  box-sizing: border-box;
`;

const PostTable = styled.div`
  margin-top: 15px;
  border-top: 1px solid #522772;
`;

const TableInfo = styled.div`
  width: 100%;
  height: 45px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #666666;
`;

const InfoItem = styled.div`
  padding: 25px 0px 23px 0;
  color: #61586A
  font-size: 14px;
  line-height: 18px;
  font-weight: 500;
  vertical-align: middle;
`;

export default PostList;
