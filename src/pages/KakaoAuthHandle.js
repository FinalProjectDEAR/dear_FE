import { useEffect } from "react";
//리덕스
import { actionCreators as userActions } from "../redux/modules/user";
import { useDispatch } from "react-redux";
//스타일
import styled from "styled-components";
import { CircularProgress } from "@mui/material";

const KakaoAuthHandle = (props) => {
  const dispatch = useDispatch();
  let code = new URL(window.location.href).searchParams.get("code");

  useEffect(() => {
    dispatch(userActions.kakaoLogin(code));
  }, []);

  return (
    <>
      <KaKaoContainer>
        <CircularProgress />
      </KaKaoContainer>
    </>
  );
};

export default KakaoAuthHandle;

const KaKaoContainer = styled.div`
  ${({ theme }) => theme.common.flexCenter};
  width: 100vw;
  height: 100vh;
`;
