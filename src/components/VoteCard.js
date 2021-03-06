import React from "react";
//리덕스
import { useDispatch, useSelector } from "react-redux";
import { history } from "../redux/configureStore";
//스타일
import styled from "styled-components";
import { Text, TextB } from "../elements";
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";

function VoteCard(props) {
  const leftScore = props.voteInfo?.vote[0].selectionList.length;
  const rightScore = props.voteInfo?.vote[1].selectionList.length;

  const totalCount = leftScore + rightScore;

  return (
    <React.Fragment>
      <CardWrapper
        onClick={() => {
          history.push(`/voteDetail/${props.voteInfo.postId}`);
        }}
      >
        <Ellipsis>
          <TextB subTitle margin="0px">
            <Question>Q. </Question>
            {props.voteInfo.title}
          </TextB>
        </Ellipsis>

        <VoteContainer>
          <LineBox>
            <VoteLine>
              <Text sub4 margin="0px 4px">
                {props.voteInfo.vote[0].imageTitle}
              </Text>
            </VoteLine>
            <ProgressBar>
              <Highlight
                width={(leftScore / totalCount) * 100 + "%"}
                color={leftScore >= rightScore ? "#7A37BE" : "#BB9ED8"}
              />
            </ProgressBar>
          </LineBox>
          <LineBox>
            <VoteLine>
              <Text sub4 margin="0px 4px">
                {props.voteInfo.vote[1].imageTitle}
              </Text>
            </VoteLine>
            <ProgressBar>
              <Highlight
                width={(rightScore / totalCount) * 100 + "%"}
                color={rightScore >= leftScore ? "#7A37BE" : "#BB9ED8"}
              />
            </ProgressBar>
          </LineBox>
        </VoteContainer>
        <LineBox>
          <PeopleRoundedIcon style={{ width: "16.5px", color: "#999999" }} />
          <Text sub5 margin="0px 5px">
            {totalCount}
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
      imageUrl: "",
      imageTitle: "친구가애인새우우우",
      selectionList: ["스파르타", "항해99"],
      selected: true,
    },
    {
      imageUrl: "",
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
  width: 300px;
  height: 158px;
  box-sizing: border-box;
  margin: 15px;
  padding: 30px 40px;
  background: #fafafa;
  border-radius: 10px;
  cursor: pointer;
  filter: drop-shadow(0px 0px 20px rgba(172, 151, 197, 0.25));
  @media ${({ theme }) => theme.device.mobile} {
    margin: 5px;
    padding: 20px 40px;
    height: 150px;
  }
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

const Ellipsis = styled.div`
  display: -webkit-box;
  width: 230px;
  height: 24px;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
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
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 8px 0px;
`;

const VoteContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 248px;
  padding: 10px 0px 4px;
`;

const VoteLine = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 250px;
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
  width: 100%;
  height: 14px;
  background-color: #fafafa;
`;

const Highlight = styled.div`
  width: ${(props) => props.width};
  height: 14px;
  background-color: ${(props) => props.color};
  transition: 1s;
`;
