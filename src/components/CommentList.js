import React from "react";
import styled from "styled-components";

import CommentItem from "./CommentItem";
import { useSelector } from "react-redux";

const CommentList = (props) => {
  const commentList = useSelector((state) => state.comment.comments);
  // console.log(commentList);

  return (
    <React.Fragment>
      <CommentContainer>
        <CommentBox>댓글 (댓글 수)</CommentBox>
      </CommentContainer>
      {commentList &&
        commentList.map((comment, idx) => {
          return <CommentItem key={idx} {...comment} />;
        })}
    </React.Fragment>
  );
};
const CommentContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  margin: auto;
  width: 1032px;
  height: 45px;
  border-width: 0px 1px;
  border-bottom: 1px solid #666666;
`;

const CommentBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  gap: 10px;
  box-sizing: border-box;
  margin: 13.5px 40px;
  height: 18px;
  flex: none;
  order: 0;
  flex-grow: 0;
  /* colorL #333333; */
  line-height: 18px;
  size: 14px;
  font-family: "Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', sans-serif";
`;

export default CommentList;
