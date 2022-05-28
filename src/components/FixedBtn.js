import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators } from "../redux/modules/noti";
import { actionCreators as userActions } from "../redux/modules/user";
import { useHistory, useLocation } from "react-router-dom";

//id값으로 스크롤
import { Link } from "react-scroll";
import Swal from "sweetalert2";
import "../styles/libraryStyle/style.css";

import styled from "styled-components";
import { Text, Modal } from "../elements";
import MobileFixedBtn from "./MobileFixedBtn";
import Survey from "./Survey";
//아이콘
import { Badge } from "@material-ui/core";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PersonIcon from "@mui/icons-material/Person";
import InfoIcon from "@mui/icons-material/Info";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import { ReactComponent as Hamburger } from "../assets/Vector (5).svg";
import { ReactComponent as Cancel } from "../assets/Vector (6).svg";

import { cookies } from "../shared/cookie";
import isLogin from "../shared/auth/isLogin";

function FixedBtn(props) {
  React.useEffect(() => {
    dispatch(userActions.loginCheckDB());
  }, []);

  let location = useLocation();

  const path = location.pathname;
  let pathname = path.split("/");
  console.log("패스", pathname[1]);

  // const isCookies = cookies.get("accessToken", { path: "/" }) ? true : false;
  const isUser = useSelector((state) => state.user.isLogin);

  const dispatch = useDispatch();
  const history = useHistory();
  const [isRead, setIsRead] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [eventOpen, setEvenOpen] = React.useState(false);
  const user_id = useSelector((state) => state.user.user);

  const openModal = () => {
    setEvenOpen(true);
  };
  const closeModal = () => {
    setEvenOpen(false);
  };

  //알람 버튼 눌렀을 때 가져오기
  const notiCheck = () => {
    if (pathname[1] == "AudioRoom") {
      Swal.fire("채팅을 종료해주세요.");
      return;
    }
    if (!isUser) {
      Swal.fire("로그인 후 이용해주세요.");
      history.push("/login");
    } else {
      history.push("/notification");
      dispatch(actionCreators.getNotiDB());
      // setOpen(!open);
      setIsRead(true);
      props._onClick();
    }
  };

  //알람 갯수 가져오기
  React.useEffect(() => {
    dispatch(actionCreators.getNotiCntDB());
  }, []);
  const alarmNum = useSelector((state) => state.noti.notiCnt);

  const gotoMypage = () => {
    if (pathname[1] == "AudioRoom") {
      Swal.fire("채팅을 종료해주세요.");
      return;
    }
    if (!isUser) {
      Swal.fire("로그인 후 이용해주세요.");
      history.push("/login");
    } else {
      history.replace("/myPage");
    }
  };

  const gotoPost = () => {
    if (pathname[1] == "AudioRoom") {
      Swal.fire("채팅을 종료해주세요.");
    } else {
      history.push("/postList/전체");
    }
  };

  const gotoIntro = () => {
    if (pathname[1] == "AudioRoom") {
      Swal.fire("채팅을 종료해주세요.");
    } else {
      history.push("/intro");
    }
  };

  return (
    <React.Fragment>
      <BtnWrap>
        <Link to="1" smooth={true}>
          <Up>
            <ArrowUpwardIcon fontSize="medium" />
          </Up>
        </Link>

        <Desc onClick={gotoIntro}>
          <FontBox>
            <Font>서비스소개</Font>
          </FontBox>
          <InfoIcon />
        </Desc>
        <Board onClick={gotoPost}>
          <FontBox>
            <Font>디어상담소</Font>
          </FontBox>

          <QuestionAnswerIcon />
        </Board>
        <Follow onClick={gotoMypage}>
          <FontBox>
            <Font>마이페이지</Font>
          </FontBox>

          <PersonIcon />
        </Follow>
        <Badge
          color="secondary"
          badgeContent={alarmNum}
          overlap="circular"
          invisible={isRead}
        >
          <Noti onClick={notiCheck}>
            <FontBox>
              <Font>알림</Font>
            </FontBox>
            <NotificationsIcon />
            {/* {open ? <Notification /> : null} */}
          </Noti>
        </Badge>
        <Event onClick={openModal}>
          <Text body4 color="#fff" textAlign="center" cursor="pointer">
            이벤트
          </Text>
        </Event>
      </BtnWrap>
      {eventOpen ? (
        <Modal>
          <Survey close={closeModal} />
        </Modal>
      ) : null}

      <Mver>
        {/* <MuiBtn>
          <Box
            sx={{
              height: 320,
              transform: "translateZ(0px)",
              flexGrow: 1,
            }}
            primary="Project Overview"
            primaryTypographyProps={{
              color: "red",
            }}
          >
            <SpeedDial
              ariaLabel="SpeedDial openIcon example"
              // sx={{ color: "red" }}
              icon={<Hamburger openIcon={<Cancel />} />}
            >
              <SpeedDialAction icon={<InfoIcon />} tooltipTitle="서비스 소개" />
              <SpeedDialAction
                icon={<QuestionAnswerIcon />}
                tooltipTitle="디어상담소"
                onClick={() => {
                  history.push("/postList");
                }}
              />{" "}
              <SpeedDialAction
                icon={<PersonIcon />}
                tooltipTitle="마이페이지"
                onClick={() => {
                  history.push("/myPage");
                }}
              />
              <SpeedDialAction
                icon={<NotificationsIcon />}
                tooltipTitle="알림"
                onClick={notiCheck}
              />
              {open ? <Notification /> : null}
            </SpeedDial>
          </Box>
        </MuiBtn> */}
        <Link to="1" smooth={true}>
          <MBtn>
            <ArrowUpwardIcon fontSize="medium" />
          </MBtn>
        </Link>

        <MBtn
          onClick={() => {
            setOpen(!open);
          }}
        >
          <Hamburger />
          {open ? <MobileFixedBtn /> : null}
        </MBtn>
        <MEvent onClick={openModal}>
          <Text body4 color="#fff" textAlign="center" cursor="pointer">
            이벤트
          </Text>
        </MEvent>
      </Mver>
    </React.Fragment>
  );
}

const BtnWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px;
  position: absolute;
  width: 52px;
  bottom: 30px;
  left: 90%;
  position: fixed;
  @media ${({ theme }) => theme.device.isMobile} {
    display: none;
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
  margin: auto 13px;
  color: #fafafa;
`;

const Desc = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px;
  position: static;
  width: 54px;
  height: 54px;
  left: 0px;
  top: 0px;
  flex: none;
  order: 0;
  flex-grow: 0;
  margin: 10px 0px;
  border-radius: 50%;
  background-color: white;
  border: none;
  color: #61586a;
  cursor: pointer;
  overflow: hidden;

  ${FontBox} {
    display: none;
  }
  &: hover {
    ${FontBox} {
      display: block;
      transition: 0.5s;
    }
    background-color: #61586a;
    justify-content: center;
    color: white;
    width: 160px;
    border-radius: 26px;
    box-shadow: 0px 0px 20px rgba(172, 151, 197, 0.25);
    transition: 0.3s;
  }
`;

const Board = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px;
  position: static;
  width: 54px;
  height: 54px;
  left: 0px;
  top: 92px;
  flex: none;
  order: 1;
  flex-grow: 0;
  margin: 10px 0px;
  border-radius: 50%;
  background-color: white;
  border: none;
  color: #61586a;
  cursor: pointer;
  transition: 0.4s;
  ${FontBox} {
    display: none;
  }
  &: hover {
    ${FontBox} {
      display: block;
      transition: 0.5s;
    }
    background-color: #61586a;
    color: white;
    width: 160px;
    border-radius: 26px;
    box-shadow: 0px 0px 20px rgba(172, 151, 197, 0.25);
    transition: 0.3s;
  }
`;

const Follow = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px;
  position: static;
  width: 54px;
  height: 54px;
  left: 0px;
  top: 184px;
  flex: none;
  order: 2;
  flex-grow: 0;
  margin: 10px 0px;
  border-radius: 50%;
  background-color: white;
  border: none;
  color: #61586a;
  cursor: pointer;
  transition: 0.4s;
  ${FontBox} {
    display: none;
  }
  &: hover {
    ${FontBox} {
      display: block;
      transition: 0.5s;
    }
    background-color: #61586a;
    color: white;
    width: 160px;
    border-radius: 26px;
    box-shadow: 0px 0px 20px rgba(172, 151, 197, 0.25);
    transition: 0.3s;
  }
`;

const Event = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px;
  position: static;
  width: 54px;
  height: 54px;
  left: 0px;
  top: 184px;
  flex: none;
  order: 2;
  flex-grow: 0;
  margin: 10px 0px;
  border-radius: 50%;
  background-color: #7a37be;
  border: none;
  cursor: pointer;
`;

const Noti = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px;
  position: static;
  width: 54px;
  height: 54px;
  left: 0px;
  top: 276px;
  flex: none;
  order: 3;
  flex-grow: 0;
  margin: 10px 0px;
  border-radius: 50%;
  background-color: white;
  border: none;
  color: #61586a;
  cursor: pointer;
  transition: 0.4s;
  ${FontBox} {
    display: none;
  }
  &: hover {
    ${FontBox} {
      display: block;
      transition: 0.5s;
    }
    background-color: #61586a;
    color: white;
    width: 160px;
    border-radius: 26px;
    box-shadow: 0px 0px 20px rgba(172, 151, 197, 0.25);
    transition: 0.3s;
  }
`;
const Up = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0px;
  position: static;
  width: 54px;
  height: 54px;
  left: 0px;
  top: 368px;
  flex: none;
  order: 4;
  flex-grow: 0;
  margin: 10px 0px;
  border-radius: 50%;
  background-color: #61586a;
  color: white;
  border: none;
  cursor: pointer;
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
  background-color: #61586a;
  color: white;
  border: none;
  cursor: pointer;
  margin: 10px;
`;
const MuiBtn = styled.div`
  .MuiSpeedDial-fab {
    background: #61586a;

    :hover {
      background: #61586a;
    }
  }
`;

const MEvent = styled.div`
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
  background-color: #7a37be;
  color: white;
  border: none;
  cursor: pointer;
`;

//모바일 버전 임시 위치 설정
const Mver = styled.div`
  display: none;
  @media ${({ theme }) => theme.device.isMobile} {
    position: absolute;
    width: 52px;
    bottom: 60px;
    left: 83%;
    box-sizing: border-box;
    position: fixed;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;
export default FixedBtn;

FixedBtn.defaultProps = {
  _onClick: () => {},
};
