import { cookies } from "../cookie";

// 로그인 여부 확인
const isLogin = () => !!cookies.get("accessToken");
export default isLogin;
