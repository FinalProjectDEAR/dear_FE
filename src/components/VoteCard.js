import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { Text, Button, Input, ColorBadge } from "../elements";
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";
import image01 from "../assets/image01.png";
import image02 from "../assets/image02.png";

function VoteCard(props) {
  const totalCount =
    props.vote[0].selectionList.length + props.vote[1].selectionList.length;

  return (
    <React.Fragment>
      <CardWrapper>
        <LineBox>
          <Text wordBreak weigh="500" size="16px" color="#999999">
            {props.title}
          </Text>
        </LineBox>
        <LineBox>
          <VoteTitle> {props.vote[0].imageTitle}</VoteTitle>
          <ProgressBar>
            <Highlight
              width={
                // (props.vote[0].selectionList.length / totalCount) * 100 + "%"
                (60 / 165) * 100 + "%"
              }
            />
          </ProgressBar>
          <VoteTitle> {props.vote[1].imageTitle}</VoteTitle>
        </LineBox>
        <LineBox>
          <PeopleRoundedIcon style={{ width: "16.5px", color: "#999999" }} />
          <Text color="#61586A" weight="300" size="12px" margin="0px 5px">
            {/* {totalCount}명 참여중 */}
            165명 참여중
          </Text>
        </LineBox>
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
  width: 588px;
  height: 180px;
  margin: 12px;
  padding: 10px 30px;
  box-sizing: border-box;
  display: block;

  background: #fafafa;
  border-radius: 10px;
  cursor: pointer;
  filter: drop-shadow(0px 0px 20px rgba(172, 151, 197, 0.25));
`;

const LineBox = styled.div`
  margin: 5px 0px;
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

const VoteTitle = styled.div`
  width: 120px;
  height: 47px;
  display: flex;
  box-sizing: border-box;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px 14px;
  background: #7a37be;
  color: #fff;
  font-size: 16px;
  font-weight: 300;
  border-radius: 25px;
`;

const ProgressBar = styled.div`
  display: flex;
  align-items: center;
  background-color: #bb9ed8;
  width: 80%;
  height: 10px;
  margin: 25px auto;
`;

const Highlight = styled.div`
  background-color: #eee7f5;
  transition: 1s;
  width: ${(props) => props.width};
  height: 10px;
`;
