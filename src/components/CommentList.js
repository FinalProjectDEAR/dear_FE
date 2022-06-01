import React from "react";

import { useSelector } from "react-redux";

import styled from "styled-components";
import { Text } from "../elements";

import CommentItem from "./CommentItem";

const CommentList = (props) => {
  const commentList = useSelector((state) => state.comment.comments);
  const comment = commentList[0]?.totalComments;

  return (
    <React.Fragment>
      <CommentWrapper>
        <CommentContainer>
          <CommentBox>
            <div style={{ color: "#7A37BE", fontWeight: "500" }}>
              {commentList[0]?.totalComments ? (
                <div style={{ display: "flex" }}>
                  <Text body4>댓글</Text> &nbsp;&nbsp;({comment})
                </div>
              ) : (
                <>
                  <div style={{ display: "flex" }}>
                    <Text body4>댓글</Text> &nbsp;&nbsp;(0) &nbsp;&nbsp;첫번째로
                    댓글을 남겨보세요!
                  </div>
                </>
              )}
            </div>
          </CommentBox>
        </CommentContainer>
        <Comment>
          {commentList?.slice(0, 8).map((comment, idx) => {
            return (
              <CommentItem key={idx} {...comment} setPage={props.setPage} />
            );
          })}
        </Comment>
      </CommentWrapper>
    </React.Fragment>
  );
};

const CommentWrapper = styled.div`
  max-width: 1032px;
  width: 100%;
  box-sizing: border-box;
`;

const CommentContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  height: 45px;
  max-width: 1032px;
  width: 100%;
  padding: 0px;
  margin: auto;
  box-sizing: border-box;
  border-width: 0px 1px;
  border-bottom: 1px solid #666666;
`;

const CommentBox = styled.div`
  display: flex;
  flex-direction: row;
  margin: 13.5px 40px;
  padding: 0px;
  gap: 10px;
  box-sizing: border-box;
  flex: none;
  order: 0;
  flex-grow: 0;
  line-height: 18px;
  size: 14px;
  font-family: "Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', sans-serif";
  @media ${({ theme }) => theme.device.mobile} {
    gap: 0px;
  }
`;

const Comment = styled.div`
  display: flex;
  flex-direction: column;
`;

export default CommentList;
