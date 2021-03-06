import React from "react";

//리덕스
import { history } from "../redux/configureStore";
//스타일
import styled from "styled-components";
import { Text, TextB } from "../elements";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import ChatBubbleRoundedIcon from "@mui/icons-material/ChatBubbleRounded";

function PostCard({ postInfo }) {
  return (
    <React.Fragment>
      <CardWrapper
        onClick={() => {
          history.push(`/postDetail/${postInfo.postId}`);
        }}
      >
        <Text sub4>{postInfo.category}</Text>
        {/* <Text sub4 color="#999999" textAlign="center">
          연애중
        </Text> */}
        <Ellipsis>
          <Text subTitle>{postInfo.title}</Text>
          {/* <Text subTitle>
            게시글제목게시물제목게시물제목게시물제목게시물제목게시글제목
          </Text> */}
        </Ellipsis>
        <ButtonBox>
          <IconBox>
            <FavoriteRoundedIcon style={{ width: "16px", color: "#948A9E" }} />
            <Text body4 margin="0px 5px">
              {postInfo.likes}
              {/* 22 */}
            </Text>
          </IconBox>
          <IconBox>
            <ChatBubbleRoundedIcon
              style={{ width: "16px", color: "#948A9E" }}
            />
            <Text body4 margin="0px 5px">
              {postInfo.comments}
              {/* 12 */}
            </Text>
          </IconBox>
        </ButtonBox>
      </CardWrapper>
    </React.Fragment>
  );
}

export default PostCard;

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 220px;
  height: 198px;
  padding: 40px 20px;
  box-sizing: border-box;
  background: #fafafa;
  border-radius: 10px;
  cursor: pointer;
  @media ${({ theme }) => theme.device.mobile} {
    width: 300px;
    height: 150px;
    margin: 5px 0px;
    padding: 26px;
  }
`;

const Ellipsis = styled.div`
  display: -webkit-box;
  margin: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const ButtonBox = styled.div`
  ${({ theme }) => theme.common.flexCenter};
  height: 20px;
  margin-top: 10px;
`;

const IconBox = styled.div`
  ${({ theme }) => theme.common.flexCenter};
  margin: 0px 5px;
`;
