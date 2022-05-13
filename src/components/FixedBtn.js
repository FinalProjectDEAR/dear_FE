import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import { useHistory } from "react-router-dom";

//id값으로 스크롤
import { Link } from "react-scroll";
//아이콘
import { Badge } from "@material-ui/core";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PersonIcon from "@mui/icons-material/Person";
import InfoIcon from "@mui/icons-material/Info";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";

function FixedBtn(props) {
  const history = useHistory();
  const [isRead, setIsRead] = React.useState(false);
  const user_id = useSelector((state) => state.user.user);

  const notiCheck = () => {
    setIsRead(true);
    props._onClick();
  };

  return (
    <React.Fragment>
      <BtnWrap>
        <Link to="1" smooth={true}>
          <Up>
            <ArrowUpwardIcon />
          </Up>
        </Link>
        <Desc>
          <InfoIcon />
          <span>서비스소개</span>
        </Desc>
        <Message
          onClick={() => {
            history.push("/postList");
          }}
        >
          <QuestionAnswerIcon />
          <span>익명상담소</span>
        </Message>
        <Follow>
          <PersonIcon />
          <span>마이페이지</span>
        </Follow>
        <Badge
          color="secondary"
          badgeContent={0}
          overlap="circular"
          invisible={isRead}
        >
          <Noti onClick={notiCheck}>
            <NotificationsIcon />
            <span>알림</span>
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
  left: 1760px;
  position: fixed;
`;

const Desc = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0px;
  position: static;
  width: 60px;
  height: 60px;
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
  transition: 0.4s;
  span {
    display: none;
  }
  &: hover {
    background-color: #61586a;
    color: white;
    width: 160px;
    border-radius: 30px;

    span {
      display: block;
    }
  }
`;

const Message = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0px;
  position: static;
  width: 60px;
  height: 60px;
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
  span {
    display: none;
  }
  &: hover {
    background-color: #61586a;
    color: white;
    width: 160px;
    border-radius: 30px;
    span {
      display: block;
    }
  }
`;

const Follow = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0px;
  position: static;
  width: 60px;
  height: 60px;
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
  span {
    display: none;
  }
  &: hover {
    background-color: #61586a;
    color: white;
    width: 160px;
    border-radius: 30px;
    span {
      display: block;
    }
  }
`;

const Noti = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0px;
  position: static;
  width: 60px;
  height: 60px;
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
  span {
    display: none;
  }
  &: hover {
    background-color: #61586a;
    color: white;
    width: 160px;
    border-radius: 30px;
    span {
      display: block;
    }
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
  width: 60px;
  height: 60px;
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
