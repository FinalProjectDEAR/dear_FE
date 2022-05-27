import axios from "axios";
import { useEffect } from "react";
import { CircularProgress } from "@mui/material";
import styled from "styled-components";
import { actionCreators as userActions } from "../redux/modules/user";
import { useDispatch } from "react-redux";

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
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;
