import React from "react";
import CommentItem from "./CommentItem";
import { useSelector } from "react-redux";

const CommentList = (props) => {
  const commentList = useSelector((state) => state.comment.comments);

  return (
    <React.Fragment>
      <div style={{ padding: "16px" }}>
        {commentList &&
          commentList.map((comment, idx) => {
            return <CommentItem key={idx} {...comment} />;
          })}
      </div>
    </React.Fragment>
  );
};

//디폴트프롭스
export default CommentList;
