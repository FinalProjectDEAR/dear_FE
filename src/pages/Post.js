import React from "react";
import styled from "styled-components";
import { TextB, Text } from "../elements";
import { useHistory } from "react-router-dom";
//시간알려주는패키지
import TimeCounting from "time-counting";

function Post(props) {
  const postId = props.item.postId;
  const history = useHistory();
  //시간을 알아보자!
  const option = {
    lang: "ko",
    calculate: {
      justNow: 60,
    },
  };
  const createdAt = TimeCounting(props.item.created_at, option);

  const gotoDetail = () => {
    if (props.item.category === "투표") {
      history.push(`/voteDetail/${postId}`);
    } else {
      history.push(`/PostDetail/${postId}`);
    }
  };

  return (
    <React.Fragment>
      <PostWrapper
        onClick={() => {
          gotoDetail();
        }}
      >
        <Title>
          <TextB body weight="500" textAlign="left">
            {props.item.title}
          </TextB>
        </Title>
        <Date>
          <Text sub7 textAlign="left">
            {createdAt}
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
  vertical-align: middle;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  border-bottom: 1px solid #cccccc;
  @media ${({ theme }) => theme.device.isMobile} {
    border-bottom: 1px solid #948a9e;
    display: flex;
    flex-direction: column;
    height: 74px;
    justify-content: left;
    /* background: yellow; */
  }
`;
const Title = styled.div`
  padding-left: 40px;
  @media ${({ theme }) => theme.device.isMobile} {
    height: 38px;
    /* border: 1px solid red; */
    width: 90%;
    box-sizing: border-box;
    display: block;
    /* word-wrap: normal; */
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
const Date = styled.div`
  padding-right: 40px;
  /* border: 1px solid blue; */
  @media ${({ theme }) => theme.device.isMobile} {
    width: 90%;
    padding: 10px 0px 0px 35px;
    /* border: 1px solid blue; */
    box-sizing: border-box;
  }
`;

export default Post;
