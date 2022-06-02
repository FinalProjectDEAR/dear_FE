import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { actionCreators as userActions } from "../../redux/modules/user";
import isLogin from "./isLogin";
import { cookies } from "../cookie";

/**
 * PublickRoute
 *
 * restricted === false : 로그인 여부와 상관없이 접근 가능 (/intro)
 * restricted === true : 로그인한 상태에서는 접근 불가 (/login, /register)
 *
 *
 */

const PublicRoute = ({ Component, restricted, ...rest }) => {
  const dispatch = useDispatch();

  const nickname = cookies.get("nickname", { path: "/" });

  useEffect(() => {
    dispatch(userActions.loginCheckDB()); // 토큰 유효성 체크
  }, []);

  return (
    <Route
      {...rest}
      render={(props) =>
        isLogin() && nickname && restricted ? (
          <Redirect to="/" /> // restricted === false 일때, redirect 할 경로
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PublicRoute;
