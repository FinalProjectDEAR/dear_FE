import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { history } from "../redux/configureStore";

import { actionCreators as mainActions } from "../redux/modules/main";

import { Text, TextB } from "../elements";
import styled from "styled-components";

//페이지
import VoteCard from "../components/VoteCard";
import PostCard from "../components/PostCard";

//assets
import serviceInfo from "../assets/main/service_info_img.png";

function MainHotPost() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(mainActions.getHotVoteDB());
  }, []);

  React.useEffect(() => {
    dispatch(mainActions.getHotBoardDB());
  }, []);

  const hotVoteList = useSelector((state) => state.main.hotVoteList);
  const topVote = hotVoteList.slice(0, 3);
  console.log(topVote);
  const hotBoardList = useSelector((state) => state.main.hotBoardList);
  const topBoard = hotBoardList.slice(0, 4);
  console.log(topBoard);

  return (
    <React.Fragment>
      <Background>
        <HotPostWrapper>
          <Text title color="#2E2A32" textAlign="left">
            디어상담소 인기게시물
          </Text>
          <VoteBox>
            {topVote.map((vote, idx) => {
              return <VoteCard key={idx} voteInfo={vote} />;
            })}
            {/* <VoteCard />
            <VoteCard />
            <VoteCard /> */}
          </VoteBox>
          <BoardBox>
            {topBoard.map((post, idx) => {
              return <PostCard key={idx} postInfo={post} />;
            })}
            {/* <PostCard />
            <PostCard />
            <PostCard />
            <PostCard /> */}
          </BoardBox>
          <Text
            sub2
            margin="20px 0px"
            textAlign="left"
            color="#948A9E"
            deco="underLine"
            cursor="pointer"
            _onClick={() => {
              history.push("/postList/전체");
            }}
          >
            디어상담소 바로가기 {">"}
          </Text>
        </HotPostWrapper>
      </Background>
    </React.Fragment>
  );
}

export default MainHotPost;

const Background = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  scroll-snap-align: start;
`;

const HotPostWrapper = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  width: 960px;
  height: 500px;
  margin: 0px auto;
  @media ${({ theme }) => theme.device.mobile} {
    padding: 25px 25px;
    width: 360px;
    height: 640px;
  }
`;

const VoteBox = styled.div`
  height: 160px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
  @media ${({ theme }) => theme.device.mobile} {
    flex-direction: column;
    height: 300px;
    overflow: hidden;
  }
`;

const BoardBox = styled.div`
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
  @media ${({ theme }) => theme.device.mobile} {
    margin-top: 5px;
    flex-direction: column;
    height: 650px;
    overflow: hidden;
  }
`;
