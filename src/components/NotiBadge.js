import React from "react";
//리덕스
import { useSelector } from "react-redux";
//스타일
import { Badge } from "@material-ui/core";
import NotificationsIcon from "@material-ui/icons/Notifications";

const NotiBadge = (props) => {
  const [isRead, setIsRead] = React.useState(false);
  const user_id = useSelector((state) => state.user.user);

  const notiCheck = () => {
    setIsRead(true);
    props._onClick();
  };

  return (
    <React.Fragment>
      <Badge
        color="secondary"
        badgeContent={0}
        overlap="circular"
        invisible={isRead}
      >
        <NotificationsIcon onClick={notiCheck} style={{ cursor: "pointer" }} />
      </Badge>
    </React.Fragment>
  );
};

NotiBadge.defaultProps = {
  _onClick: () => {},
};

export default NotiBadge;
