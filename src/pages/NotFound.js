import React from "react";

//리덕스
import { history } from "../redux/configureStore";
//스타일
import styled from "styled-components";
import { Text } from "../elements";
import { ReactComponent as ErrorImg } from "../assets/notFound/error_img.svg";
import { ReactComponent as ErrorTxt } from "../assets/notFound/error_txt.svg";

function NotFound() {
  return (
    <React.Fragment>
      <Wrapper>
        <AlertBox>
          <ErrorTxt style={{ width: "283px", margin: "20px" }} />
          <Text
            sub3
            color="#6422A7"
            deco="underLine"
            cursor="pointer"
            _onClick={() => {
              history.replace("/");
            }}
          >
            메인페이지로 돌아가기
          </Text>
          <ErrorImg style={{ width: "224px", margin: "20px" }} />
        </AlertBox>
      </Wrapper>
    </React.Fragment>
  );
}

export default NotFound;

const Wrapper = styled.div`
  ${({ theme }) => theme.common.flexCenter};
  width: 100%;
  height: 100vh;
  background-color: #fff;
`;

const AlertBox = styled.div`
  ${({ theme }) => theme.common.flexCenterColumn};
  width: 300px;
  height: 100%;
`;
