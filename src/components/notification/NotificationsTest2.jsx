import React, { useEffect, useState } from "react";
import { EventSourcePolyfill } from "event-source-polyfill";
import axios from "axios";

const Notifications_Test = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    let eventSource;
    const fetchSse = async () => {
      try {
        eventSource = new EventSourcePolyfill(
          `https://eb.jxxhxxx.shop/connect`,
          {
            headers: {
              Authorization: localStorage.getItem("accessToken"),
            },
            withCredentials: true,
          }
        );
        // SSE 연결 성공 시 호출되는 이벤트 핸들러
        eventSource.onopen = () => {
          console.log("SSE 연결완료");
        };
        eventSource.onmessage = async (event) => {
          const data = await JSON.parse(event.data);
          console.log("알림이 도착했습니다", data);
          alert("알림이 도착했습니다", data);
        };
        eventSource.addEventListener("connect", (event) => {
          const newNotification = { id: Date.now(), message: event.data };
          console.log("연결 짠짠짠.");

          //20개까지만 notifications에 저장해서 리스트로 보여주기위한 코드
          setNotifications([newNotification, ...notifications.slice(0, 19)]);
        });
      } catch (error) {
        console.log("에러발생:", error);
      }
    };
    fetchSse();
    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <div>
      <ul>
        {notifications.map((notification) => (
          <li key={notification.id}>
            {notification.id}:{notification.message}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications_Test;
