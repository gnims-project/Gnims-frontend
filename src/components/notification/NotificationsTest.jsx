// import React, { useEffect, useState } from "react";
// import { EventSourcePolyfill } from "event-source-polyfill";
// import {
//   addNotification,
//   clearNotifications,
// } from "../../redux/modules/notificationSlice";
// import { useDispatch, useSelector } from "react-redux";

// const NotificationsTest = () => {
//   const dispatch = useDispatch();
//   //notifications 를 가져와 notifications 변수에 할당
//   const notifications = useSelector(
//     (state) => state.notification.notifications
//   );

//   useEffect(() => {
//     const accessToken = localStorage.getItem("accessToken");
//     // SSE 연결을 위해 EventSource 객체를 생성
//     const eventSource = new EventSourcePolyfill(
//       `https://eb.jxxhxxx.shop/connect`
//       // "shinjeong.shop:8080/connect"
//     );
//     // ?token=${accessToken}
//     // const eventSource = new EventSourcePolyfill(`/pushs`);

//     // SSE 연결 성공 시 호출되는 이벤트 핸들러
//     eventSource.onopen = () => {
//       console.log("SSE 연결완료");
//     };
//     // SSE 메시지 수신 시 호출되는 이벤트 핸들러 함수를 등록하여 SSE 메시지가 도착했을 때의 동작을 정의
//     eventSource.onmessage = (event) => {
//       const data = JSON.parse(event.data);
//       console.log("알림이 도착했습니다", data);
//       alert("알림이 도착했습니다", data);
//       //addNotification액션 dispatch
//       dispatch(addNotification(data));
//     };

//     // SSE 연결 오류 발생 시 호출되는 이벤트 핸들러
//     eventSource.onerror = (error) => {
//       console.error("SSE 에러발생!", error);
//     };

//     return () => {
//       eventSource.close();
//       dispatch(clearNotifications());
//     };
//   }, [dispatch]);
//   return (
//     <div>
//       <h2> Notifications List </h2>
//       {notifications.map((notification) => (
//         <div key={notification.id}>
//           <span>{notification.message}</span>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default NotificationsTest;
