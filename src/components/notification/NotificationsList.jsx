import React, { useEffect, useState } from "react";
import { EventSourcePolyfill } from "event-source-polyfill";
import mentionIcon from "../../img/mention.png";
import followIcon from "../../img/follow.png";

const NotificationsList = () => {
  //notifications는 최대 20개까지 알림을 담는 배열이다. [{id:34523452345, message:'안녕하세요'},{...},...]이런구조
  const [notifications, setNotifications] = useState([]);
  const [recieveAt, setRecieveAt] = useState("");
  useEffect(() => {
    let eventSource;

    const fetchSse = async () => {
      try {
        //EventSource생성.
        eventSource = new EventSourcePolyfill(
          `https://eb.jxxhxxx.shop/connect`,
          // "http://shinjeong.shop:8080/subscribe",
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
          console.log("알림이 도착했습니다", data);
          console.log("data.content만 출력하면 이렇게", data.content);
          console.log(data);
          const newNotification = {
            id: Date.now(),
            message: event.data,
          };
          setNotifications((prevNotifications) => [
            newNotification,
            ...prevNotifications,
          ]);
        };
        // eventSource.addEventListener("connect")이벤트핸들러는 새로운 알림을 notifications배열에 추가한다.
        eventSource.addEventListener("connect", (event) => {
          const newNotification = {
            id: Date.now(),
            message: event.data,
          };
          console.log("connect 타입으로 연결.");
          console.log(
            "newNotification의 메세지만출력:",
            newNotification.message
          );
          console.log("connect 데이터의 전체구조는:", event);

          //20개까지만 notifications배열에 저장해서 리턴문에 보여주기위한 코드
          setNotifications((prevNotifications) => [
            newNotification,
            ...prevNotifications,
          ]);
          console.log("notifications 배열은 이렇게 생겼어요", notifications);
        });
        eventSource.addEventListener("invite", (event) => {
          const data = JSON.parse(event.data);
          console.log("parsing한거", data);
          const newNotification = {
            id: Date.now(),
            message: data.message,
          };
          const time = data.createAt;
          setRecieveAt(time);
          console.log(time);
          console.log("newNotification 구조???????", newNotification);
          console.log(
            "invite newNotification message?????",
            newNotification.message
          );
          console.log("파싱한 data", data);
          console.log("data메세지만", data.message);

          setNotifications((prevNotifications) => [
            newNotification,
            ...prevNotifications,
          ]);
          console.log(
            "notifications 전체 배열은 이렇게 생겼어요",
            notifications
          );
        });

        eventSource.addEventListener("follow", (event) => {
          const data = JSON.parse(event.data);
          console.log("parsing한거", data);
          const newNotification = {
            id: Date.now(),
            message: data.message,
          };
          const time = data.createAt;
          setRecieveAt(time);
          console.log(time);
          console.log("newNotification follow 구조???????", newNotification);
          console.log(
            "follow newNotification message?????",
            newNotification.message
          );
          console.log("파싱한 data", data);
          console.log("data메세지만", data.message);

          setNotifications((prevNotifications) => [
            newNotification,
            ...prevNotifications,
          ]);
          console.log(
            "notifications 전체 배열은 이렇게 생겼어요",
            notifications
          );
        });
      } catch (error) {
        console.log("에러발생:", error);
      }
    };
    fetchSse();
    return () => {
      eventSource.close();
      console.log("notifications 배열은 이렇게 생겼어요", notifications);
    };
  }, []);

  return (
    <div className="bg-[#FFFFFF] h-full">
      <div>
        {notifications.map((notification) => (
          <div key={notification.id}>
            <div>
              {notification.message.includes("안녕하세요") ? null : (
                <div className="pl-[20px] pr-[20px] pt-[20px]  h-[86px] bg-[#F4F4F4] text-right text-[#121213] border-solid border-[rgb(219,219,219)] border-b-[1px]">
                  <div>
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
                    <div className="mt-[-20px] text-[14px] mr-[-5px]">
                      {notification.message}
                    </div>
                    <br />
                    <span className="text-[#6F6F6F] text-[13px]">
                      {recieveAt}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationsList;
