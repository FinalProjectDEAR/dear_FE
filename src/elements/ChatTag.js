import React from "react";
import { ReactComponent as Tag } from "../assets/tag/태그 (1).svg";
import { ReactComponent as OpenTag } from "../assets/tag/태그.svg";

const ChatTag = (props) => {
  return (
    <React.Fragment>
      {props?.Tag === "오픈한 상담" ? <OpenTag /> : null}

      {props?.Tag === "참여한 상담" ? <Tag /> : null}
    </React.Fragment>
  );
};

export default ChatTag;
