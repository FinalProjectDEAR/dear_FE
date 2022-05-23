import React from "react";
import styled from "styled-components";
import { Text, TextB, Tag, ColorBadge } from "../elements";
//시간알려주는패키지
import TimeCounting from "time-counting";

const CounselHistory = (props) => {
  // console.log(props.item);
  //시간을 알아보자!
  const option = {
    lang: "ko",
    calculate: {
      justNow: 60,
    },
  };
  const createdAt = TimeCounting(props.item.createdAt, option);
  return (
    // <HistoryWrapper>
    //   <HistoryList>
    <CounselHistoryWrapper>
      <div className="tag">
        <Tag counselRes2>
          <Text sub7 margin="3px 8px">
            {props?.item.myRole}
          </Text>
        </Tag>
      </div>
      <div className="content">
        <TextB sub color="#2E2A32">
          {props?.item.reqComment}
        </TextB>
      </div>

      <div className="nick">
        <ColorBadge
          border="2px solid #F8F8F8"
          size="14"
          bg={props?.item.color}
          cursor="pointer"
        />
        <Text sub4 color="#66666">
          {props?.item.nickname} ({createdAt})
        </Text>
      </div>
    </CounselHistoryWrapper>
    //   </HistoryList>
    // </HistoryWrapper>
  );
};

CounselHistory.defaultProps = {
  role: "request",
  color: "ddd",
  chatTitle: "고백을 어떻게 할까요?",
  nickName: "내연애는못하는사람",
  createdAt: "2",
};

const HistoryWrapper = styled.div`
  width: 1032px;
  height: 270px;
  box-sizing: border-box;
`;
const HistoryList = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 20px;
  gap: 24px;
`;
const CounselHistoryWrapper = styled.div`
  background-color: #fafafa;
  width: 328px;
  height: 120px;
  padding-top: 0.1px;
  box-sizing: border-box;
  .content {
    display: flex;
    flex-direction: row;
    margin-left: 30px;
  }
  .tag {
    display: flex;
    justify-content: right;
    margin: 12px 12px 0px 0px;
  }
  .nick {
    display: flex;
    flex-direction: row;
    margin-left: 30px;
  }
`;
export default CounselHistory;
