import React from "react";
//라우터
import { useHistory } from "react-router-dom";
//스타일
import styled from "styled-components";
import { TextB, Text } from "../elements";
import { ReactComponent as Vote } from "../assets/postList/vote.svg";
import { ReactComponent as Hot } from "../assets/postList/tag_hot.svg";
//시간알려주는패키지
import TimeCounting from "time-counting";

function Post(props) {
  const postId = props.item.postId;
  const likes = props.item.comments;
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
      {props.item.category === "투표" ? (
        <PostWrapper
          onClick={() => {
            gotoDetail();
          }}
        >
          <Title>
            <TextB body weight="500" textAlign="left" cursor="pointer">
              {props.item.title} <Vote style={{ margin: "-4px 5px" }} />
            </TextB>
          </Title>
          <Date>
            <Text sub7 textAlign="left" cursor="pointer">
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
                  &nbsp;({props.item.comments})
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
  display: flex;
  vertical-align: middle;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 45px;
  font-size: 12px;
  border-bottom: 1px solid #cccccc;
  color: #333333;
  @media ${({ theme }) => theme.device.mobile} {
    border-bottom: 1px solid #948a9e;
    display: flex;
    justify-content: left;
    flex-direction: column;
    height: 74px;
  }
`;

const Title = styled.div`
  padding-left: 40px;
  cursor: pointer;
  @media ${({ theme }) => theme.device.mobile} {
    display: block;
    height: 38px;
    width: 90%;
    box-sizing: border-box;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const Date = styled.div`
  padding-right: 40px;
  @media ${({ theme }) => theme.device.mobile} {
    width: 90%;
    padding: 10px 0px 0px 35px;
    box-sizing: border-box;
  }
`;

export default Post;
