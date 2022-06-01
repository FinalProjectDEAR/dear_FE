import React from "react";

//스타일
import styled from "styled-components";
import { Text, TextB, ColorBadge, ResTag } from "../elements";

function RankingCard({ rankInfo }) {
  return (
    <React.Fragment>
      <UserRankingWrapper>
        <BadgeBox>
          <ColorBadge bg={rankInfo.color} size="40" />
          {/* <ColorBadge bg="#40D39C" size="40" /> */}
        </BadgeBox>
        <LineBox>
          <Text body3> {rankInfo.nickname}</Text>
          {/* <Text body3>닉네임은최대열자에용</Text> */}
        </LineBox>
        <LineBox>
          <Text sub color="#7A37BE">
            {rankInfo.score} °C
          </Text>
          <TemperatureBar>
            <ProgressBar>
              <ColorBadge
                size="10"
                bg="#7A37BE"
                border="none"
                position="absolute"
              />
              <Highlight width={rankInfo.score + "%"} />
              {/* <Highlight width="60%" /> */}
            </ProgressBar>
          </TemperatureBar>
        </LineBox>
        <TagBox>
          {rankInfo ? <ResTag resTag1={rankInfo?.resTag1} /> : null}
        </TagBox>
      </UserRankingWrapper>
    </React.Fragment>
  );
}

export default RankingCard;

const UserRankingWrapper = styled.div`
  ${({ theme }) => theme.common.flexCenterColumn};
  width: 186px;
  height: 218px;
  box-sizing: border-box;
  padding: 40px 0px;
  margin-top: 20px;
  margin-right: 25px;
  background: #fafafa;
  box-shadow: 0px 0px 20px rgba(172, 151, 197, 0.25);

  @media ${({ theme }) => theme.device.mobile} {
    width: 180px;
    margin-left: 15px;
  }
`;

const BadgeBox = styled.div`
  ${({ theme }) => theme.common.flexCenter};
  margin-bottom: 10px;
`;

const LineBox = styled.div`
  ${({ theme }) => theme.common.flexCenter};
  margin: 5px 0px;
`;

const TemperatureBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: 0px 5px;
`;

const ProgressBar = styled.div`
  display: flex;
  align-items: center;
  width: 69px;
  height: 6px;
  box-sizing: border-box;
  background-color: #fff;
  border: 1px solid #bb9ed8;
  border-radius: 10px;
`;

const Highlight = styled.div`
  width: ${(props) => props.width};
  height: 6px;
  border-radius: 10px;
  background-color: #7a37be;
  transition: 1s;
`;

const TagBox = styled.div`
  width: 120px;
  margin-top: 15px;
`;
