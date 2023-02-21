import React, { useEffect, useState } from "react";
import { EventSourcePolyfill } from "event-source-polyfill";
import mentionIcon from "../../img/mention.png";
import followIcon from "../../img/follow.png";

const NotificationsList = () => {
  //notifications는 최대 20개까지 알림을 담는 배열이다. [{id:34523452345, message:'안녕하세요'},{...},...]이런구조
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    let eventSource;
    const fetchSse = async () => {
      try {
        //EventSource생성.
        eventSource = new EventSourcePolyfill(
          `https://eb.jxxhxxx.shop/connect`,
          {
            //headers에 토큰을 꼭 담아줘야 500이 안뜬다.
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
        //알림이 왔을 때 취할 액션은 이 아래에.
        eventSource.onmessage = async (event) => {
          const data = await JSON.parse(event.data);
          const datata = await event.data;
          console.log("알림이 도착했습니다", data);
          console.log("data.content만 출력하면 이렇게", data.content);
          console.log("JSON.parse없으면이렇게", datata);
          //   alert("알림이 도착했습니다", data.content);
        };
        eventSource.addEventListener("connect", (event) => {
          const newNotification = {
            id: Date.now(),
            message: event.data,
          };
          console.log("connect라는 타입으로 연결.");
          console.log(
            "newNotification의 메세지만출력:",
            newNotification.message
          );
          console.log("데이터의 전체구조는:", event);
          //20개까지만 notifications배열에 저장해서 리턴문에 보여주기위한 코드
          setNotifications([newNotification, ...notifications.slice(0, 19)]);
          console.log("notifications 배열은 이렇게 생겼어요", notifications);
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

export default NotificationsList;