import React from "react";
import { Text } from "../elements/index";

//max 5개
function UserRanking() {
  return (
    <React.Fragment>
      <div style={{ margin: "auto", backgroundColor: "#F9EBDE" }}>
        <img
          src="https://velog.velcdn.com/images/gagyeong/post/4ff528c8-5ff5-481d-a472-ca3b815fc3a9/image.png"
          alt="userPic"
        />
        <Text>memberId</Text>
      </div>
    </React.Fragment>
  );
}

export default UserRanking;
