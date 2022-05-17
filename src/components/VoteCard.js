import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { history } from "../redux/configureStore";

import styled from "styled-components";
import theme from "../styles/theme";
import { Text, Button, Input, ColorBadge } from "../elements";
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";
import image01 from "../assets/image01.png";
import image02 from "../assets/image02.png";

function VoteCard(props) {
  const totalCount =
    props.vote[0].selectionList.length + props.vote[1].selectionList.length;

  const leftScore = props.vote[0].selectionList.length;
  const rightScore = props.vote[1].selectionList.length;

  return (
    <React.Fragment>
      <CardWrapper
        onClick={() => {
          history.push(`/voteDetail/${props.postId}`);
        }}
      >
        <Font>
          <Question>Q. </Question>
          {props.title}
        </Font>
        <VoteContainer>
          <LineBox>
            <VoteLine>
              <VoteTitle color={props.leftSelected ? "#7A37BE" : "#61586A"}>
                {/* {props.vote[0].imageTitle} */}
                친구가애인새우우우우
              </VoteTitle>
            </VoteLine>
            <ProgressBar>
              <Highlight
                width={
                  // (props.vote[0].selectionList.length / totalCount) * 100 + "%"
                  (60 / 165) * 100 + "%"
                }
                color={leftScore >= rightScore ? "#7A37BE" : "#BB9ED8"}
              />
            </ProgressBar>
          </LineBox>
          <LineBox>
            <VoteLine>
              <VoteTitle color={props.rightSelected ? "#7A37BE" : "#61586A"}>
                {/* {props.vote[1].imageTitle} */}
                강원도
              </VoteTitle>
            </VoteLine>
            <ProgressBar>
              <Highlight
                width={
                  // (props.vote[0].selectionList.length / totalCount) * 100 + "%"
                  (105 / 165) * 100 + "%"
                }
                color={rightScore >= leftScore ? "#7A37BE" : "#BB9ED8"}
              />
            </ProgressBar>
          </LineBox>
        </VoteContainer>
        <LineBox>
          <PeopleRoundedIcon style={{ width: "16.5px", color: "#999999" }} />
          <Text sub5 margin="0px 5px">
            {/* {totalCount}명 참여중 */}
            165
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
      imageTitle: "친구가애인새우우우",
      selectionList: ["스파르타", "항해99"],
      selected: true,
    },
    {
      imageUrl: image02,
      imageTitle: "애인이친구새우",
      selectionList: ["스파르타", "항해99", "럭키세븐호"],
      selected: false,
    },
  ],
  createdAt: "22-05-01 10:00:00",
  title: "누가 누구의 새우를 까줄때..!",
  contents: "생일선물 뭐고를지 모르겠어요 투표 부탁드려요!",
};

const CardWrapper = styled.div`
  width: 328px;
  height: 158px;
  margin: 12px;
  padding: 30px 40px;
  box-sizing: border-box;

  background: #fafafa;
  border-radius: 10px;
  cursor: pointer;
  filter: drop-shadow(0px 0px 20px rgba(172, 151, 197, 0.25));
`;

const LineBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4px 0px;
`;

const Question = styled.span`
  font-family: ${({ theme }) => theme.fonts.family.batang};
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  padding: 0px;
  color: #7a37be;
`;

const Font = styled.p`
  font-family: ${({ theme }) => theme.fonts.family.batang};
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  margin: 0px;
  margin-bottom: 10px;
  word-break: keep-all;
  color: #333333;
`;

const BottomBox = styled.div`
  margin: 8px 0px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const VoteContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 248px;
  padding: 10px 0px 4px;
`;

const VoteLine = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

const VoteTitle = styled.div`
  font-family: ${({ theme }) => theme.fonts.family.base};
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 14px;
  margin-right: 10px;
  text-align: left;
  color: #333333;
`;

const ProgressBar = styled.div`
  display: flex;
  align-items: center;
  background-color: #fafafa;
  width: 100%;
  height: 14px;
`;

const Highlight = styled.div`
  background-color: ${(props) => props.color};
  transition: 1s;
  width: ${(props) => props.width};
  height: 14px;
`;
