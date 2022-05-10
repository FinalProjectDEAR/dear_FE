import React from "react";
import styled from "styled-components";
import { Text } from "../elements";
import { useHistory } from "react-router-dom";

function Post(props) {
  const postId = props.item.boardPostId;
  const history = useHistory();

  return (
    <React.Fragment>
      <OnePost
        onClick={() => {
          history.push(`/PostDetail/${postId}`);
        }}
      >
        <PostData
          style={{
            textAlign: "left",
            marginLeft: "3%",
            width: "100%",
          }}
        >
          <Text batang>{props.item.title}</Text>
        </PostData>

        <PostData
          style={{
            width: "100%",
            marginRight: "8%",
            textAlign: "right",
          }}
        >
          {props.item.createAt}
        </PostData>
      </OnePost>
    </React.Fragment>
  );
}
const OnePost = styled.div`
  color: #4c4c4c;
  display: flex;
  border-top: 1px solid #e2e2e2;
  font-weight: 400;
  font-size: 12px;
`;

const PostData = styled.div`
  padding: 25px 0px 23px 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export default Post;
