import React from "react";

import { useDispatch } from "react-redux";
import { history } from "../redux/configureStore";
import { actionCreators } from "../redux/modules/mypage";

import styled from "styled-components";
import { Text, ColorBadge, Modal } from "../elements";
import { ReactComponent as UnFollower } from "../assets/mypage/찜해제.svg";
import { ReactComponent as Msg } from "../assets/mypage/Group 493.svg";
import { useMediaQuery } from "react-responsive";
//시간알려주는패키지
import TimeCounting from "time-counting";

import UnFollow from "../components/alert/UnFollow";

const Follow = (props) => {
  const Mobile = useMediaQuery({
    query: "(max-width:425px)",
  });

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(actionCreators.followPage(props.item.totalPages));
  }, []);

  //모달
  const [modalOpen, setModalOpen] = React.useState(false);
  const closeModal = () => {
    setModalOpen(false);
  };

  //시간을 알아보자!
  const option = {
    lang: "ko",
    calculate: {
      justNow: 60,
    },
  };

  const createdAt = TimeCounting(props?.item.createdAt, option);

  const sendFollower = () => {
    dispatch(actionCreators.getFollower(props?.item));
    history.push("/sendMsg");
  };

  const Follower = props?.item.followMemberId;
  const nickname = props?.item.nickname;

  return (
    <FollowWrapper>
      <FollowContainer>
        {Mobile ? (
          <ColorBox>
            <ColorBadge
              border="2px solid #F8F8F8"
              size="30"
              bg={props?.item.color}
              cursor="pointer"
            />
          </ColorBox>
        ) : (
          <ColorBox>
            <ColorBadge
              border="2px solid #F8F8F8"
              size="40"
              bg={props?.item.color}
              cursor="pointer"
            />
          </ColorBox>
        )}
        <Text body4 color="#333333">
          {props?.item.nickname}
        </Text>
        {Mobile ? null : (
          <Text sub color="#999999">
            {createdAt}
          </Text>
        )}
        <BtnBox>
          <UnFollower
            style={{ cursor: "pointer" }}
            onClick={() => {
              setModalOpen(true);
            }}
          />
          {modalOpen && (
            <Modal closModal={closeModal}>
              <UnFollow
                closeModal={closeModal}
                Follower={Follower}
                nickname={nickname}
              />
            </Modal>
          )}
          <Msg style={{ cursor: "pointer" }} onClick={sendFollower} />
        </BtnBox>
      </FollowContainer>
    </FollowWrapper>
  );
};

const FollowWrapper = styled.div`
  width: 186px;
  height: 186px;
  background-color: #fafafa;
  @media ${({ theme }) => theme.device.mobile} {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 320px;
    height: 58px;
  }
`;

const FollowContainer = styled.div`
  ${({ theme }) => theme.common.flexCenterColumn};
  margin-top: 20px;
  @media ${({ theme }) => theme.device.mobile} {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 320px;
    height: 40px;
    padding-bottom: 13px;
  }
`;

const ColorBox = styled.div`
  ${({ theme }) => theme.common.flexCenter};
  margin: 5px auto;
  @media ${({ theme }) => theme.device.mobile} {
    display: flex;
    flex-direction: row;
    justify-content: left;
    padding-bottom: 5px;
  }
`;

const BtnBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 70px;
  height: 30px;
  margin: 14px auto;
  @media ${({ theme }) => theme.device.mobile} {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
`;

export default Follow;
