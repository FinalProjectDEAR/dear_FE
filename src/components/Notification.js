import React from "react";
import { app, vapidKey } from "../firebase";
import { getMessaging, getToken } from "firebase/messaging";
// 허가요청하기
// const messaging = app.messaging();

// messaging
//   .requestPermission()
//   .then(function () {
//     console.log("허가!");
//     return messaging.getToken(); //토큰을 받는 함수를 추가!
//   })
//   .then(function (token) {
//     console.log(token); //토큰을 출력!
//   })
//   //사용자가 거절했을 때
//   .catch(function (err) {
//     console.log("fcm에러 : ", err);
//   });

// messaging.onMessage(function (payload) {
//   console.log(payload.notification.title);
//   console.log(payload.notification.body);
// });
// Get registration token. Initially this makes a network call, once retrieved
// subsequent calls to getToken will return from cache.

const Notification = () => {
  return <div>Notification</div>;
};

export default Notification;
