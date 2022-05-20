import React from "react";
import styled from "styled-components";
import { Text, TextB, Tag, ColorBadge } from "../elements";

const CounselHistory = () => {
  return (
    // <HistoryWrapper>
    //   <HistoryList>
    <CounselHistoryWrapper>
      <div className="tag">
        <Tag counselRes2>참여한 상담</Tag>
      </div>
      <div className="content">
        <TextB sub color="#2E2A32">
          고민은최대20자입력고민은최대20자입력
        </TextB>
      </div>

      <div className="nick">
        <ColorBadge
          border="2px solid #F8F8F8"
          size="14"
          bg="#43BDE3"
          cursor="pointer"
        />
        <Text sub4 color="#66666">
          내연애는못하는사람 (2일 전)
        </Text>
      </div>
    </CounselHistoryWrapper>
    //   </HistoryList>
    // </HistoryWrapper>
  );
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
