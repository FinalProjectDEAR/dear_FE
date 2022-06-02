import React from "react";
//스타일
import styled from "styled-components";
import { Text } from "../elements";

function ReviewCard({ reviewInfo }) {
  function dateFormat(date) {
    let year = date.substring(0, 4);
    let month = date.substring(5, 7);
    let day = date.substring(8, 10);

    return year + "년" + " " + month + "월" + " " + day + "일";
  }

  const hideName = (n) => {
    let result = n.substring(0, 1) + "*".repeat(n.length - 1);
    return result;
  };

  return (
    <React.Fragment>
      <CardWrapper>
        <Text sub6 color="#948A9E" textAlign="left">
          [{dateFormat(reviewInfo.createdAt)} 상담]{" "}
          {hideName(reviewInfo.nickname)}님
        </Text>
        <Ellipsis>
          <Text title textAlign="left">
            {reviewInfo.comment}
          </Text>
        </Ellipsis>
      </CardWrapper>
    </React.Fragment>
  );
}

export default ReviewCard;

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 504px;
  height: 160px;
  box-sizing: border-box;
  padding: 36px 40px;
  margin: 20px;
  background: #fafafa;
  @media ${({ theme }) => theme.device.mobile} {
    width: 300px;
    margin: 10px;
    margin-top: 20px;
  }
`;

const Ellipsis = styled.div`
  display: -webkit-box;
  margin-top: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const ButtonBox = styled.div`
  ${({ theme }) => theme.common.flexCenter};
  height: 20px;
  margin-top: 10px;
`;

const IconBox = styled.div`
  ${({ theme }) => theme.common.flexCenter};
  margin: 0px 5px;
`;
