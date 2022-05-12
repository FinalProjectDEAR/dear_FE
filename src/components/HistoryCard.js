import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as voteActions } from "../redux/modules/vote";

import { Text, Button, Input, ColorBadge } from "../elements";
import styled from "styled-components";

function HistoryCard(props) {
  return (
    <React.Fragment>
      <CardWrapper>
        <TitleBox>
          <Text weight="500" color="#2E2A32" size="16px">
            {props.chatTitle}
          </Text>
          {props.role === "request" ? (
            <RoleTag type="button"> 오픈한 상담 </RoleTag>
          ) : (
            <RoleTag type="button"> 참여한 상담 </RoleTag>
          )}
        </TitleBox>
        <NameTag>
          <ColorBadge size="24" bg="#40D39C" />
          <Text margin="8px" weight="300" color="#61586A" size="14px">
            우린 한배야 ({props.createdAt}일 전)
          </Text>
        </NameTag>
      </CardWrapper>
    </React.Fragment>
  );
}

export default HistoryCard;

HistoryCard.defaultProps = {
  role: "request",
  category: "썸",
  chatTitle: "고백을 어떻게 할까요?",
  createdAt: "2",
  chatTime: "10분",
};

const CardWrapper = styled.div`
  width: 380px;
  height: 120px;
  padding: 30px;
  box-sizing: border-box;
  background-color: #fafafa;
`;

const TitleBox = styled.div`
  display: flex;
  justify-content: space-between;
`;

const RoleTag = styled.div`
  width: 84px;
  height: 30px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background: #f4f4f4;
  border-radius: 4px;
`;

const NameTag = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;
