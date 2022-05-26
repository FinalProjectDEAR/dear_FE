import React from "react";
import styled from "styled-components";
import { Text } from "../elements";

import { useSelector } from "react-redux";

import CommentItem from "./CommentItem";

const CommentList = (props) => {
  const commentList = useSelector((state) => state.comment.comments);
  // console.log(commentList);
  const comment = commentList[0]?.totalComments;
  return (
    <React.Fragment>
      <CommentWrapper>
        <CommentContainer>
          <CommentBox>
            <div style={{ color: "#7A37BE", fontWeight: "500" }}>
              {commentList[0]?.totalComments ? (
                <div style={{ display: "flex" }}>
                  {" "}
                  <Text body4>댓글</Text> &nbsp;&nbsp;({comment})
                </div>
              ) : (
                <>첫번째 댓글을 작성해주세요!</>
              )}
            </div>
          </CommentBox>
        </CommentContainer>
        <Comment>
          {commentList?.slice(0, 2).map((comment, idx) => {
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
  /* background-color: yellow; */
  max-width: 1032px;
  width: 100%;
  box-sizing: border-box;
  @media ${({ theme }) => theme.device.isMobile} {
    /* width: 328px; */
    /* height: 300px; */
    /* border: 1px solid yellow; */
    /* margin-left: 500px; */
  }
`;
const CommentContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  margin: auto;
  height: 45px;
  max-width: 1032px;
  width: 100%;
  border-width: 0px 1px;
  border-bottom: 1px solid #666666;
  @media ${({ theme }) => theme.device.isMobile} {
    /* width: 328px; */
    /* border: 1px solid blue; */
    /* margin: auto; */
  }
`;
const CommentBox = styled.div`
  display: flex;
  flex-direction: row;
  /* align-items: flex-start; */
  padding: 0px;
  gap: 10px;
  box-sizing: border-box;
  margin: 13.5px 40px;
  /* height: 88px; */
  /* max-width: 100px; */
  /* width: 100%; */
  flex: none;
  order: 0;
  flex-grow: 0;
  line-height: 18px;
  size: 14px;
  font-family: "Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', sans-serif";
  @media ${({ theme }) => theme.device.isMobile} {
    /* width: 328px; */
    /* border: 1px solid red; */
    gap: 0px;
    /* margin: 0px; */
  }
`;
const Comment = styled.div`
  display: flex;
  flex-direction: column;
  /* height: 128px; */
  /* background-color: red; */
`;
export default CommentList;
