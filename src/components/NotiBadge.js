import React from "react";
import { Badge } from "@material-ui/core";
import NotificationsIcon from "@material-ui/icons/Notifications";

import { useSelector } from "react-redux";

const NotiBadge = (props) => {
  const [isRead, setIsRead] = React.useState(false);
  const user_id = useSelector((state) => state.user.user);

  const notiCheck = () => {
    setIsRead(true);
    props._onClick();
  };

  //   React.useEffect(() => {
  //     const notiDB = ref(realtime, `noti/${user_id}`);
  //     let subscribe = onValue(notiDB, (snapshot) => {
  //       console.log(snapshot.val());
  //       setIsRead(snapshot.val().read);
  //     });

  //     return () => subscribe();
  //   }, []);

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
