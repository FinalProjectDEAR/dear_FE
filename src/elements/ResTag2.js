import React from "react";
import { ReactComponent as Sympathy1 } from "../assets/tag/Sub.svg";
import { ReactComponent as Solver1 } from "../assets/tag/Property 1=Sub.svg";
import { ReactComponent as Enjoy1 } from "../assets/tag/Property 1=Sub (1).svg";
import { ReactComponent as Fact1 } from "../assets/tag/Property 1=Sub (2).svg";
import { ReactComponent as Sensitivity1 } from "../assets/tag/Property 1=Sub (3).svg";

const ResTag2 = (props) => {
  return (
    <React.Fragment>
      {props?.resTag2 === "공감을 잘해줬어요" ? <Sympathy1 /> : null}

      {props?.resTag2 === "명쾌한 해결책을 알려줘요" ? <Solver1 /> : null}

      {props?.resTag2 === "대화가 즐거웠어요" ? <Enjoy1 /> : null}

      {props?.resTag2 === "시원하게 팩트폭격을 해줘요" ? <Fact1 /> : null}

      {props?.resTag2 === "감수성이 풍부했어요" ? <Sensitivity1 /> : null}
    </React.Fragment>
  );
};

export default ResTag2;
