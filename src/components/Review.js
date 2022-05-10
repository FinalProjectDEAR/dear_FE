import React from "react";
import { Text } from "../elements/index";

//max20개
function Review() {
  return (
    <React.Fragment>
      <div style={{ margin: "auto", backgroundColor: "violet" }}>
        <Text>memberId</Text>
        <Text>ServiceComment</Text>
      </div>
    </React.Fragment>
  );
}

export default Review;
