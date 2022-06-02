import React from "react";
//스타일
import styled from "styled-components";
import { Text, TextB, ColorBadge } from "../elements";
import { useMediaQuery } from "react-responsive";
//컴포넌트
import ChatTag from "../elements/ChatTag";
//시간알려주는패키지
import TimeCounting from "time-counting";

const CounselHistory = (props) => {
  const Mobile = useMediaQuery({
    query: "(max-width:425px)",
  });
  //시간을 알아보자!
  const option = {
    lang: "ko",
    calculate: {
      justNow: 60,
    },
  };

  const createdAt = TimeCounting(props.item.createdAt, option);

  return (
    <CounselHistoryWrapper>
      {Mobile ? (
        <MobileVer>
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
          <div className="tagM">
            {props.item.myRole ? <ChatTag Tag={props.item.myRole} /> : null}
          </div>
        </MobileVer>
      ) : null}
      {Mobile ? null : (
        <div className="tag">
          {props.item.myRole ? <ChatTag Tag={props.item.myRole} /> : null}
        </div>
      )}
      <div className="content">
        <TextB sub color="#2E2A32" textAlign="left">
          {props?.item.reqComment}
        </TextB>
      </div>
      {Mobile ? null : (
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
      )}
    </CounselHistoryWrapper>
  );
};

const CounselHistoryWrapper = styled.div`
  width: 328px;
  height: 120px;
  padding-top: 0.1px;
  box-sizing: border-box;
  background-color: #fafafa;
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
    width: 200px;
    margin-left: 30px;
  }
  @media ${({ theme }) => theme.device.mobile} {
    width: 320px;
    padding-top: 0.1px;
    box-sizing: border-box;
    background-color: #fafafa;
    .content {
      display: block;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      flex-direction: row;
      width: 250px;
      margin-left: 30px;
      padding: 0px;
      box-sizing: border-box;
    }
  }
`;

const MobileVer = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 12px;
  .tagM {
    display: flex;
    margin: 0px 12px 0px 0px;
  }
`;
export default CounselHistory;
