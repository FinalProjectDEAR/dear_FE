import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { history } from "../redux/configureStore";

import styled from "styled-components";
import { Text, TextB } from "../elements";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import ChatBubbleRoundedIcon from "@mui/icons-material/ChatBubbleRounded";

function ReviewCard(props) {
  const nickname = "낭만고양이";
  const hideName = (n) => {
    let result = n.substring(0, 1) + "*".repeat(n.length - 1);
    return result;
  };

  return (
    <React.Fragment>
      <CardWrapper>
        <Text sub6 color="#948A9E" textAlign="left">
          {/* [{date} 상담] {hideName(props.nickname)}님 */}
          [2022년 5월 20일 상담] {hideName(nickname)}님
        </Text>
        <Ellipsis>
          {/* <Text title>{props.content}</Text> */}
          <Text title margin="0px">
            어디가서 말하기 어려웠는데, 고마워요 디어! 어디가서말하기 어려웠는데
            고마워요 디어! 어디가서 말하기 어려웠는데 고마워요 디어!
          </Text>
        </Ellipsis>
      </CardWrapper>
    </React.Fragment>
  );
}

export default ReviewCard;

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 36px 40px;
  margin: 20px;

  box-sizing: border-box;
  width: 504px;
  height: 160px;

  background: #fafafa;
`;

const Ellipsis = styled.div`
  margin-top: 10px;
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
