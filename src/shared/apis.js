import axios from "axios";
import { history } from "../redux/configureStore";

export const api = axios.create({
  baseURL: process.env.REACT_APP_URL,
  headers: {
    "content-type": "application/json;charset=UTF-8",
    accept: "application/json,",
  },
});

// request interceptors
api.interceptors.request.use(function (config) {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");

  config.headers.common["authorization"] = `Bearer ${accessToken}`;
  config.headers.common["reauthorization"] = `Bearer ${refreshToken}`;

  return config;
});

// response interceptors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const {
      config,
      response: { status },
      response,
    } = error;
    const originalRequest = config;

    // 401 에러 발생시 토큰 만료되었을 때,
    if (status === 401) {
      if (response.data.accessToken) {
        // access token이 재발급 된 상태,
        localStorage.setItem("access_token", response.data.accessToken);
        originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
        return axios(originalRequest);
      }
      if (response.data.reason === "refreshtoken expired") {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        history.replace("/login");
      }
    }
  }
);

export const apis = {
  // post
  get: () => api.get("/anonypost"),
  getDetail: (postId) => api.get(`/anonypost/board/${postId}`),
  post: (payload) => api.post("/anonypost/board", payload),
  edit: (postId, payload) => api.put(`/anonypost/board/${postId}`, payload),
  delete: (postId) => api.delete(`/anonypost/board/${postId}`),
  like: (postId, likes) =>
    api.post(`/anonypost/board/${postId}/postLikes?likes=${likes}`),

  // comment
  getComment: (postId) => api.get(`/anonypost/${postId}/comment`),
  postComment: (postId, payload) =>
    api.post(`anonypost/board/${postId}/comment`, payload),
  putComment: (postId, commentId, comment) =>
    api.put(`anonypost/board/${postId}/comment/${commentId}`, { comment }),
  deleteComment: (postId, commentId) =>
    api.delete(`anonypost/board/${postId}/comment/${commentId}`),
  commentLike: (postId, commentId) =>
    api.post(`anonypost/board/${postId}/commentLikes/${commentId}`),

  //vote
  getVote: (type) => api.get(`/anonypost?type=${type}`),
  addVote: (data) => api.post("/anonypost/vote", data),
  detailVote: (postId) => api.get(`/anonypost/vote/${postId}`),
  delVote: (postId) => api.delete(`/anonypost/vote/${postId}`),
  putVote: (postId, vote) =>
    api.post(`/anonypost/vote/${postId}/voteSelect?selectionNum=${vote}`),

  // user
  nickCheck: (nickname) => api.post("/user/nicknameCheck", { nickname }),
  sendInfo: (memberInfo) => api.post("/user/info", memberInfo),

  //chat
  getChat: (sessionId) => api.get(`/chat/info/${sessionId}`),
  reqChat: (formData) => api.post("/chat/request", formData),
  resChat: (category) => api.post("/chat/response", category),
  closeChat: (sessionId, time) => api.post(`/chat/info/${sessionId}/${time}`),
  disConnect: (sessionId) => api.delete(`/chat/info/${sessionId}/disconnect`),

  //main
  getTape: () => api.get(`/user/info/reward`),

  //message
  getMsg: (page) => api.get(`/user/info/message/${page}`),
  getDetailMsg: (messageId) => api.get(`/message/detail/${messageId}`),
  addMsg: (message, resUserId) =>
    api.post(`/message/request`, { message, resUserId }),

  //myPage
  getPost: (page) => api.get(`/user/info/board/${page}`),
  getFollow: (page) => api.get(`/user/info/follow/${page}`),
  getChatList: () => api.get("/user/info/chatHistory"),
  getMember: () => api.get("/user/info/profile"),
  putInfo: (memberInfo) => api.post("/user/info", memberInfo),

  //noti
  getAlarm: () => api.get("/alarm/all"),
  getAlarmCnt: () => api.get("/alarm"),
};
