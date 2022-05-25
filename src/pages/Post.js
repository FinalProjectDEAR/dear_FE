import React from "react";
import styled from "styled-components";
import { TextB, Text } from "../elements";
import { useHistory } from "react-router-dom";

import { ReactComponent as Vote } from "../assets/postList/vote.svg";
import { ReactComponent as Hot } from "../assets/postList/tag_hot.svg";
import { ReactComponent as New } from "../assets/postList/tag_new.svg";
//시간알려주는패키지
import TimeCounting from "time-counting";

function Post(props) {
  // console.log(props);
  const postId = props.item.postId;
  const comments = props.item.comments;
  const likes = props.item.comments;
  // console.log("코멘트:", comments, "공감:", likes);
  const history = useHistory();
  //시간을 알아보자!
  const option = {
    lang: "ko",
    calculate: {
      justNow: 60,
    },
  };
  const createdAt = TimeCounting(props.item.created_at, option);
  // const newD = props.item.created_at.replace("T", " ").substring(0, 10);
  // // console.log(newD);
  // const icon = window.Date();
  // console.log(icon);
  // const year = icon.getFullYear();
  // const month = ("0" + (icon.getMonth() + 1)).slice(-2);
  // const day = ("0" + icon.getDay()).slice(-2);
  // const dateStr = year + "-" + month + "-" + day;

  // console.log(dateStr, newD);

  const gotoDetail = () => {
    if (props.item.category === "투표") {
      history.push(`/voteDetail/${postId}`);
    } else {
      history.push(`/PostDetail/${postId}`);
    }
  };

  return (
    <React.Fragment>
      {props.item.category === "투표" ? (
        <PostWrapper
          onClick={() => {
            gotoDetail();
          }}
        >
          <Title>
            <TextB body weight="500" textAlign="left" cursor="pointer">
              {props.item.title} <Vote />
            </TextB>
          </Title>
          <Date>
            <Text sub7 textAlign="left">
              {createdAt}
            </Text>
          </Date>
        </PostWrapper>
      ) : (
        <PostWrapper
          onClick={() => {
            gotoDetail();
          }}
        >
          <Title>
            <TextB body weight="500" textAlign="left" cursor="pointer">
              {props.item.title}
              {props?.item.comments ? (
                <span style={{ color: "#7A37BE", size: "14px" }}>
                  {" "}
                  ({comments})
                </span>
              ) : null}
              {likes > 5 ? <Hot style={{ margin: "-2px 5px" }} /> : null}
            </TextB>
          </Title>
          <Date>
            <Text sub7 textAlign="left">
              {createdAt}
            </Text>
          </Date>
        </PostWrapper>
      )}
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
