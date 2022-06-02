import React from "react";

import { useHistory } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { actionCreators } from "../redux/modules/noti";
import { actionCreators as userActions } from "../redux/modules/user";

import styled from "styled-components";
import { FixedModal } from "../elements";
import Swal from "sweetalert2";
import { Badge } from "@material-ui/core";
import { ReactComponent as X } from "../assets/etc/Vector (10).svg";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PersonIcon from "@mui/icons-material/Person";
import InfoIcon from "@mui/icons-material/Info";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";

const MobileFixedBtn = ({ close }) => {
  React.useEffect(() => {
    dispatch(userActions.loginCheckDB());
  }, []);

  const dispatch = useDispatch();
  const history = useHistory();
  //모달
  const [modalOpen, setModalOpen] = React.useState(true);
  const closeModal = () => {
    setModalOpen(false);
  };
  const [isRead, setIsRead] = React.useState(false);
  const isUser = useSelector((state) => state.user.isLogin);
  const user_id = useSelector((state) => state.user.user);
  const Token = localStorage.getItem("accessToken");

  //알람 버튼 눌렀을 때 가져오기
  const notiCheck = () => {
    if (!isUser) {
      Swal.fire("로그인 후 이용해주세요.");
      history.push("/login");
    } else {
      history.push("/notification");
      dispatch(actionCreators.getNotiDB());
      setIsRead(true);
      // props._onClick();
    }
  };

  //알람 갯수 가져오기
  React.useEffect(() => {
    dispatch(actionCreators.getNotiCntDB());
  }, []);
  const alarmNum = useSelector((state) => state.noti.notiCnt);

  const gotoMypage = () => {
    if (!isUser) {
      Swal.fire("로그인 후 이용해주세요.");
      history.push("/login");
      return;
    } else {
      history.push("/myPage");
    }
  };

  return (
    <>
      {modalOpen && (
        <FixedModal closeModal={closeModal}>
          <React.Fragment>
            <div
              style={{
                minHeight: "667px",
                height: "100vh",
                paddingRight: "100px",
                display: "flex",
                alignItems: "flex-end",
              }}
            >
              <Mver>
                <Desc
                  onClick={() => {
                    history.push("/intro");
                  }}
                >
                  <InfoIcon />
                  <FontBox>
                    <Font>서비스소개</Font>
                  </FontBox>
                </Desc>
                <Desc
                  onClick={() => {
                    history.push("/postList/전체");
                  }}
                >
                  <QuestionAnswerIcon />
                  <FontBox>
                    <Font>디어상담소</Font>
                  </FontBox>
                </Desc>
                <Desc onClick={gotoMypage}>
                  <PersonIcon />
                  <FontBox>
                    <Font>마이페이지</Font>
                  </FontBox>
                </Desc>
                <Badge
                  color="secondary"
                  badgeContent={alarmNum}
                  overlap="circular"
                  invisible={isRead}
                >
                  <Desc onClick={notiCheck}>
                    <NotificationsIcon />
                    <FontBox>
                      <Font>알림</Font>
                    </FontBox>
                  </Desc>
                </Badge>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "right",
                    paddingBottom: "90px",
                  }}
                >
                  <MBtn closeModal={closeModal}>
                    <X />
                  </MBtn>
                </div>
              </Mver>
            </div>
          </React.Fragment>
        </FixedModal>
      )}
    </>
  );
};
const Mver = styled.div`
  @media ${({ theme }) => theme.device.web} {
    display: none;
  }
  @media ${({ theme }) => theme.device.mobile} {
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
  ${({ theme }) => theme.common.flexCenter};
  width: 160px;
  height: 54px;
  padding: 0px;
  margin: 10px 0px;
  flex: none;
  background-color: #61586a;
  color: white;
  background-color: white;
  border-radius: 26px;
  box-shadow: 0px 0px 20px rgba(172, 151, 197, 0.25);
  border: none;
  color: #61586a;
  cursor: pointer;
`;

const MBtn = styled.div`
  ${({ theme }) => theme.common.flexCenterColumn};
  width: 54px;
  height: 54px;
  padding: 0px;
  flex: none;
  flex-grow: 0;
  border-radius: 50%;
  background-color: #fafafa;
  color: white;
  border: none;
  cursor: pointer;
`;
export default MobileFixedBtn;
