import React from "react";
import styled from "styled-components";
import { Text } from "../elements";
import { useHistory } from "react-router-dom";

function Post(props) {
  const postId = props.item.boardPostId;
  const history = useHistory();

  return (
    <React.Fragment>
      <PostWrapper
        onClick={() => {
          history.push(`/PostDetail/${postId}`);
        }}
      >
        <Title>
          <Text batang size="12px" color="#333333" weight="500">
            {props.item.title}
          </Text>
        </Title>
        <Date>
          <Text batang size="12px" color="#333333" weight="500">
            {props.item.createAt}
          </Text>
        </Date>
      </PostWrapper>
    </React.Fragment>
  );
}
const PostWrapper = styled.div`
  color: #333333;
  display: flex;
  width: 100%;
  height: 45px;
  display: flex;
  vertical-align: middle;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  border-bottom: 1px solid #cccccc;
`;
const Title = styled.div`
  padding-left: 60px;
`;
const Date = styled.div`
  padding-right: 60px;
`;

export default Post;
