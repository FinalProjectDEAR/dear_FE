import React from "react";
import styled from "styled-components";
import { Text, ColorBadge, Modal } from "../elements";
import { ReactComponent as UnFollower } from "../assets/찜해제.svg";
import { ReactComponent as Msg } from "../assets/Group 493.svg";
import { useMediaQuery } from "react-responsive";
//리덕스관련
import { useDispatch, useSelector } from "react-redux";
import { history } from "../redux/configureStore";
import { actionCreators } from "../redux/modules/mypage";
//시간알려주는패키지
import TimeCounting from "time-counting";
//페이지
import UnFollow from "../components/alert/UnFollow";

const Follow = (props) => {
  // console.log(props);
  const Mobile = useMediaQuery({
    query: "(max-width:767px)",
  });
  // console.log(props.item.totalPages);
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(actionCreators.followPage(props.item.totalPages));
  }, []);
  //모달
  const [modalOpen, setModalOpen] = React.useState(false);
  const openModal = () => {
    setModalOpen(true);
  };
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
    dispatch(actionCreators.getFollower(props?.item.nickname));
    history.push("/sendMsg");
  };
  const Follower = props?.item.followMemberId;
  const nickname = props?.item.nickname;
  // console.log(nickname);
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
  @media ${({ theme }) => theme.device.isMobile} {
    width: 320px;
    height: 58px;
    display: flex;
    flex-direction: row;

    align-items: center;
    /* background-color: blue; */
  }
`;
const FollowContainer = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media ${({ theme }) => theme.device.isMobile} {
    display: flex;
    width: 320px;
    height: 40px;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding-bottom: 13px;
    /* background-color: red; */
  }
`;
const ColorBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px auto;
  @media ${({ theme }) => theme.device.isMobile} {
    display: flex;
    flex-direction: row;
    justify-content: left;
    /* background-color: blue; */
    /* width: 30px;
    height: 30px; */
    padding-bottom: 5px;
  }
`;
const BtnBox = styled.div`
  width: 70px;
  height: 30px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 14px auto;
  @media ${({ theme }) => theme.device.isMobile} {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    /* background-color: blue;
    width: 30px;
    height: 30px; */
  }
`;
export default Follow;
