import React from "react";
import { Text } from "../elements";
import styled from "styled-components";

import Message from "./Message";
import CounselHistory from "./CounselHistory";

const MyPage = () => {
  return (
    <React.Fragment>
      <MyPageWrapper></MyPageWrapper>
      <MsgWrapper>
        <Text>내가 받은 쪽지</Text>
        <Text>쪽지는 최대 30일까지 보관돼요.</Text>
        <MsgContainer>
          <Message />
          <Message />
          <Message />
        </MsgContainer>
      </MsgWrapper>
      <CounselWrapper>
        <Text>상담 히스토리</Text>
        <Text>히스토리는 최대 6개까지 볼 수 있어요</Text>
        <CounselHistory />
      </CounselWrapper>
      <FollowWrapper>
        <Text>찜한 리스너</Text>
      </FollowWrapper>
      <PostWrapper>
        <Text>나의 디어상담소 게시물</Text>
      </PostWrapper>
    </React.Fragment>
  );
};

const MyPageWrapper = styled.div`
  background-color: #ffffff;
  box-shadow: 0px 0px 20px rgba(172, 151, 197, 0.25);
  border-radius: 20px;
  width: 1032px;
  height: 200px;
  margin: auto;
`;
const MsgWrapper = styled.div`
  width: 1032px;
  height: 402px;
  border: 1px solid red;
  margin: auto;
  margin-top: 60px;
  box-sizing: border-box;
`;
const MsgContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin: auto;
`;
const CounselWrapper = styled.div`
  margin: auto;
  width: 1032px;
  height: 342px;
  border: 1px solid red;
  margin-top: 100px;
`;
const FollowWrapper = styled.div`
  margin: auto;
  width: 1034px;
  height: 236px;
  border: 1px solid red;
  margin-top: 100px;
`;
const PostWrapper = styled.div`
  margin: auto;
  width: 1032px;
  height: 369px;
  border: 1px solid red;
  margin-top: 100px;
`;
export default MyPage;
