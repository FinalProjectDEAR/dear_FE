import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators } from "../redux/modules/noti";
import { useHistory } from "react-router-dom";

import styled from "styled-components";
import { Modal } from "../elements";
//아이콘
import { Badge } from "@material-ui/core";
import { ReactComponent as X } from "../assets/Vector (10).svg";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PersonIcon from "@mui/icons-material/Person";
import InfoIcon from "@mui/icons-material/Info";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import { flexbox } from "@mui/system";

const MobileFixedBtn = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  //모달
  const [modalOpen, setModalOpen] = React.useState(true);
  const closeModal = () => {
    setModalOpen(false);
    history.push("/myPage");
  };
  const [isRead, setIsRead] = React.useState(false);
  const user_id = useSelector((state) => state.user.user);
  //알람 버튼 눌렀을 때 가져오기
  const notiCheck = () => {
    history.push("/notification");
    dispatch(actionCreators.getNotiDB());
    setIsRead(true);
    // props._onClick();
  };
  //알람 갯수 가져오기
  React.useEffect(() => {
    dispatch(actionCreators.getNotiCntDB());
  }, []);
  const alarmNum = useSelector((state) => state.noti.notiCnt);
  return (
    <>
      {modalOpen && (
        <Modal closeModal={closeModal}>
          <React.Fragment>
            <div
              style={{
                // background: "yellow",
                paddingRight: "80px",
                paddingTop: "220px",
              }}
            >
              <Mver>
                <Desc>
                  <InfoIcon />
                  <FontBox>
                    <Font>서비스소개</Font>
                  </FontBox>
                </Desc>
                <Board
                  onClick={() => {
                    history.push("/postList");
                  }}
                >
                  <QuestionAnswerIcon />
                  <FontBox>
                    <Font>디어상담소</Font>
                  </FontBox>
                </Board>
                <Follow
                  onClick={() => {
                    history.push("/myPage");
                  }}
                >
                  <PersonIcon />
                  <FontBox>
                    <Font>마이페이지</Font>
                  </FontBox>
                </Follow>
                <Badge
                  color="secondary"
                  badgeContent={alarmNum}
                  overlap="circular"
                  invisible={isRead}
                >
                  <Noti onClick={notiCheck}>
                    <NotificationsIcon />
                    <FontBox>
                      <Font>알림</Font>
                    </FontBox>
                    {/* {open ? <Notification /> : null} */}
                  </Noti>
                </Badge>
                <div style={{ display: "flex", justifyContent: "right" }}>
                  <MBtn closeModal={closeModal}>
                    <X />
                  </MBtn>
                </div>
              </Mver>
            </div>
          </React.Fragment>
        </Modal>
      )}
    </>
  );
};
const Mver = styled.div`
  @media ${({ theme }) => theme.device.web} {
    display: none;
  }
  @media ${({ theme }) => theme.device.isMobile} {
    /* position: absolute; */
    /* width: 52px;
    bottom: 60px;
    left: 87%;
    position: fixed; */
    /* border: 1px solid red; */
    box-sizing: border-box;
  }
`;
const FontBox = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100px;
  height: 24px;
`;

const Font = styled.p`
  align-items: center;
  font-family: ${({ theme }) => theme.fonts.family.base};
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  margin: auto;
  color: #61586a;
`;

const Desc = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px;
  /* position: static; */
  background-color: #61586a;
  justify-content: center;
  color: white;
  width: 160px;
  border-radius: 26px;
  box-shadow: 0px 0px 20px rgba(172, 151, 197, 0.25);
  height: 54px;
  /* left: 0px;
  top: 0px; */
  flex: none;
  /* order: 0;
  flex-grow: 0; */
  margin: 10px 0px;
  /* border-radius: 50%; */
  background-color: white;
  border: none;
  color: #61586a;
  cursor: pointer;
`;

const Board = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px;
  position: static;
  width: 160px;
  border-radius: 26px;
  box-shadow: 0px 0px 20px rgba(172, 151, 197, 0.25);
  height: 54px;
  left: 0px;
  top: 92px;
  flex: none;
  order: 1;
  flex-grow: 0;
  margin: 10px 0px;

  background-color: white;
  border: none;
  color: #61586a;
  cursor: pointer;
  transition: 0.4s;
`;

const Follow = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px;
  position: static;
  width: 160px;
  border-radius: 26px;
  box-shadow: 0px 0px 20px rgba(172, 151, 197, 0.25);
  height: 54px;
  left: 0px;
  top: 184px;
  flex: none;
  order: 2;
  flex-grow: 0;
  margin: 10px 0px;
  background-color: white;
  border: none;
  color: #61586a;
    transition: 0.3s;
  }
`;

const Noti = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px;
  position: static;
  width: 160px;
    border-radius: 26px;
    box-shadow: 0px 0px 20px rgba(172, 151, 197, 0.25);
  height: 54px;
  left: 0px;
  top: 276px;
  flex: none;
  order: 3;
  flex-grow: 0;
  margin: 10px 0px;
  background-color: white;
  border: none;
  color: #61586a;
  cursor: pointer;
  transition: 0.4s;
    transition: 0.3s;
  }
`;
const MBtn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0px;
  width: 54px;
  height: 54px;
  flex: none;
  flex-grow: 0;
  border-radius: 50%;
  background-color: #fafafa;
  color: white;
  border: none;
  cursor: pointer;
`;
export default MobileFixedBtn;
