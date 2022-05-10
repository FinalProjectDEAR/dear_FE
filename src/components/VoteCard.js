import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { Text, Button, Input, ColorBadge } from "../elements";
import image01 from "../assets/image01.png";
import image02 from "../assets/image02.png";

function VoteCard(props) {
  const totalCount =
    props.vote[0].selectionList.length + props.vote[1].selectionList.length;

  return (
    <React.Fragment>
      <CardWrapper>
        <LineBox>
          <ProgressBar>
            <Highlight
              width={
                // (props.vote[0].selectionList.length / totalCount) * 100 + "%"
                (60 / 165) * 100 + "%"
              }
            />
          </ProgressBar>
        </LineBox>
        <LineBox>
          <Text weight="400" size="18px" color="#2E2A32">
            {props.vote[0].imageTitle} vs {props.vote[1].imageTitle}
          </Text>
        </LineBox>
        <LineBox>
          <Text
            wordBreak
            batang
            margin="12px"
            weigh="300"
            size="14px"
            color="#666666"
          >
            {props.title}
          </Text>
        </LineBox>
        <BottomBox>
          <Text color="#2E2A32" weight="300" size="14px">
            {/* {totalCount}명 참여중 */}
            165명 참여중
          </Text>
          <div style={{ display: "flex", alignItems: "center" }}>
            <ColorBadge bg="#40D39C" size="12" border="1px solid #2E2A32" />
            <Text color="#2E2A32" weight="300" size="14px" margin="0px 5px">
              {props.nickname}
            </Text>
          </div>
        </BottomBox>
      </CardWrapper>
    </React.Fragment>
  );
}

export default VoteCard;

VoteCard.defaultProps = {
  nickname: "럭키세븐호",
  vote: [
    {
      imageUrl: image01,
      imageTitle: "양떼목장",
      selectionList: ["스파르타", "항해99"],
      selected: true,
    },
    {
      imageUrl: image02,
      imageTitle: "바닷가",
      selectionList: ["스파르타", "항해99", "럭키세븐호"],
      selected: false,
    },
  ],
  createdAt: "22-05-01 10:00:00",
  title: "다음주 데이트 어디로 갈지 고민이에요. 골라주세요!",
  contents: "생일선물 뭐고를지 모르겠어요 투표 부탁드려요!",
};

const CardWrapper = styled.div`
  width: 278px;
  height: 200px;
  padding: 0px 30px;
  box-sizing: border-box;
  background: #fafafa;
  border-radius: 10px;
  cursor: pointer;
`;

const LineBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const BottomBox = styled.div`
  margin: 8px 0px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const ProgressBar = styled.div`
  display: flex;
  align-items: center;
  background-color: #d53253;
  width: 80%;
  height: 10px;
  margin: 25px auto;
  border-radius: 3px;
`;

const Highlight = styled.div`
  background-color: #ffd05b;
  transition: 1s;
  width: ${(props) => props.width};
  height: 10px;
  border-radius: 3px;
`;
