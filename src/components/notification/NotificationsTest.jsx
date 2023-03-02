import React, { useEffect, useState } from "react";
import { EventSourcePolyfill } from "event-source-polyfill";
import mentionIcon from "../../img/mention.png";
import followIcon from "../../img/follow.png";

const NotificationsListV2 = () => {
  //notifications는 최대 20개까지 알림을 담는 배열이다. [{id:34523452345, message:'안녕하세요'},{...},...]이런구조
  const [notifications, setNotifications] = useState([]);
  //   eventSource.onmessage 핸들러 내부에서 JSON.parse를 사용해 data.content를 추출하고,
  // 새로운 알림 객체를 생성한 후 setNotifications 함수를 호출하는 부분

  //onmessage와 addEventListener 차이: onmessage는 eventSource객체가 이벤트를 받을 때마다 호출되는 이벤트핸들러.
  //   onmessage이벤트핸들러는 데이터를 처리하거나 다른 액션을 수행하는데 사용됨
  //onmessage는 모든 이벤트를 처리하고, addEventListener는 특정 이벤트에 대한 이벤트 핸들러를 등록하여 처리합니다.
  useEffect(() => {
    let eventSource;
    const fetchSse = async () => {
      try {
        eventSource = new EventSourcePolyfill(
          `https://eb.jxxhxxx.shop/connect`,
          {
            headers: {
              Authorization: sessionStorage.getItem("accessToken"),
            },
            withCredentials: true,
          }
        );
        eventSource.onopen = () => {
          console.log("SSE 연결완료");
        };
        eventSource.onmessage = async (event) => {
          const data = await JSON.parse(event.data);
          console.log("알림이 도착했습니다onmessage", data);

          const newNotification = {
            id: Date.now(),
            message: data.content,
          };

          setNotifications([newNotification, ...notifications.slice(0, 19)]);
        };

        eventSource.addEventListener("connect", (event) => {
          const data = JSON.parse(event.data);
          console.log("알림이 도착했습니다connect", data);
          const newNotification = {
            id: Date.now(),
            message: data.content,
          };

          setNotifications([newNotification, ...notifications.slice(0, 19)]);
        });
        eventSource.addEventListener("invite", (event) => {
          const data = JSON.parse(event.data);
          console.log("알림이 도착했습니다invite", data);
          const newNotification = {
            id: Date.now(),
            message: data.content,
          };

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
    <div className="bg-[#FFFFFF] h-screen pt-[50px]">
      <div>
        {notifications.map((notification) => (
          <div
            className="pl-[20px] pr-[20px] pt-[20px]  h-[86px] bg-[#F4F4F4] text-right text-[#121213] border-solid border-[rgb(219,219,219)] border-b-[1px]"
            key={notification.id}
          >
            {notification.message.includes("팔로우") ? (
              <img
                src={followIcon}
                alt="followIcon"
                className="h-[26px] w-[26px] flex "
              />
            ) : (
              <img
                src={mentionIcon}
                alt="mentionIcon"
                className="h-[26px] w-[26px] "
              />
            )}
            <div className="mt-[-20px]">{notification.message}</div>
            <br />
            <span className="text-[#6F6F6F] text-[14px]">날짜</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationsListV2;
