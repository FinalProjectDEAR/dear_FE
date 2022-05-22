import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators } from "../redux/modules/noti";
import { useHistory } from "react-router-dom";

//id값으로 스크롤
import { Link } from "react-scroll";

import styled from "styled-components";
import Notification from "./Notification";
//아이콘
import { Badge } from "@material-ui/core";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PersonIcon from "@mui/icons-material/Person";
import InfoIcon from "@mui/icons-material/Info";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";

function FixedBtn(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [isRead, setIsRead] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const user_id = useSelector((state) => state.user.user);
  //알람 버튼 눌렀을 때 가져오기
  const notiCheck = () => {
    // history.push("/notification");
    dispatch(actionCreators.getNotiDB());
    setOpen(!open);
    setIsRead(true);
    props._onClick();
  };
  //알람 갯수 가져오기
  React.useEffect(() => {
    dispatch(actionCreators.getNotiCntDB());
  }, []);
  const alarmNum = useSelector((state) => state.noti.notiCnt);
  return (
    <React.Fragment>
      <BtnWrap>
        <Link to="1" smooth={true}>
          <Up>
            <ArrowUpwardIcon fontSize="medium" />
          </Up>
        </Link>
        <Desc>
          <FontBox>
            <Font>서비스소개</Font>
          </FontBox>
          <InfoIcon />
        </Desc>
        <Board
          onClick={() => {
            history.push("/postList");
          }}
        >
          <FontBox>
            <Font>익명상담소</Font>
          </FontBox>

          <QuestionAnswerIcon />
        </Board>
        <Follow
          onClick={() => {
            history.push("/myPage");
          }}
        >
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
            {open ? <Notification /> : null}
          </Noti>
        </Badge>
      </BtnWrap>
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
  ${({ theme }) => theme.device.mobile} {
    display: none;
    /* background: orange; */
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

export default FixedBtn;

FixedBtn.defaultProps = {
  _onClick: () => {},
};
