import React from "react";
import { useSelector } from "react-redux";
import { Text, TextB, ColorBadge } from "../elements";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

//max 5개
function UserRanking(props) {
  return (
    <React.Fragment>
      <UserRankingWrapper>
        <BadgeBox>
          {/* <ColorBadge color={props.color} size="40" /> */}
          <ColorBadge bg="#40D39C" size="40" />
        </BadgeBox>
        <LineBox>
          {/* <Text body3> {props.nickname}</Text> */}
          <Text body3>닉네임은최대열자에용</Text>
        </LineBox>
        <LineBox>
          <Text sub color="#7A37BE">
            60.4 °C
          </Text>
          <TemperatureBar>
            <ProgressBar>
              <ColorBadge
                size="10"
                bg="#7A37BE"
                border="none"
                position="absolute"
              />
              {/* <Highlight width={props.rate + "%"} /> */}
              <Highlight width="60%" />
            </ProgressBar>
          </TemperatureBar>
        </LineBox>
        <LineBox>Tag</LineBox>
      </UserRankingWrapper>
    </React.Fragment>
  );
}

export default UserRanking;

const UserRankingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  width: 186px;
  height: 218px;
  padding: 40px 0px;
  margin-top: 20px;
  margin-right: 25px;
  background: #fafafa;
  box-shadow: 0px 0px 20px rgba(172, 151, 197, 0.25);
`;

const BadgeBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`;

const LineBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
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
  box-sizing: border-box;
  background-color: #fff;
  width: 69px;
  height: 6px;
  border: 1px solid #bb9ed8;
  border-radius: 10px;
  @media ${({ theme }) => theme.device.mobile} {
    height: 24px;
  }
`;

const Highlight = styled.div`
  background-color: #7a37be;
  transition: 1s;
  width: ${(props) => props.width};
  height: 6px;
  border-radius: 10px;
  @media ${({ theme }) => theme.device.mobile} {
    height: 24px;
  }
`;
