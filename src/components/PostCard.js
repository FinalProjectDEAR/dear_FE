import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { history } from "../redux/configureStore";

import styled from "styled-components";
import { Text, TextB } from "../elements";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import ChatBubbleRoundedIcon from "@mui/icons-material/ChatBubbleRounded";

function PostCard(props) {
  return (
    <React.Fragment>
      <CardWrapper>
        {/* <Text sub4>{props.category}</Text> */}
        <Text sub4 color="#999999" textAlign="center">
          연애중
        </Text>
        <Ellipsis>
          {/* <Text subTitle>{props.content}</Text> */}
          <Text subTitle>
            게시글제목게시물제목게시물제목게시물제목게시물제목게시글제목
          </Text>
        </Ellipsis>
        <ButtonBox>
          <IconBox>
            <FavoriteRoundedIcon style={{ width: "16px", color: "#948A9E" }} />
            <Text body4 margin="0px 5px">
              {/* {props.likeCount} */}
              22
            </Text>
          </IconBox>
          <IconBox>
            <ChatBubbleRoundedIcon
              style={{ width: "16px", color: "#948A9E" }}
            />
            <Text body4 margin="0px 5px">
              {/* {props.commentCount} */}
              12
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
  padding: 40px 20px;

  box-sizing: border-box;
  width: 220px;
  height: 198px;

  background: #fafafa;
  border-radius: 10px;
  @media ${({ theme }) => theme.device.mobile} {
    margin: 5px 0px;
    width: 300px;
    height: 170px;
    padding: 26px;
  }
`;

const Ellipsis = styled.div`
  margin: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20px;
  margin-top: 10px;
`;

const IconBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0px 5px;
`;
