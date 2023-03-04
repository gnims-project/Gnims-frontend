import React, { useEffect, useState } from "react";
import { EventSourcePolyfill } from "event-source-polyfill";
import mentionIcon from "../../img/mention.png";
import followIcon from "../../img/follow.png";
import { useNavigate } from "react-router-dom";
import { instance } from "../../shared/AxiosInstance";
import { useDispatch } from "react-redux";

const NotificationsList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //notifications는 최대 20개까지 알림을 담는 배열이다. [{id:34523452345, message:'안녕하세요'},{...},...]이런구조
  const [notifications, setNotifications] = useState([]);
  const [notification, setNotification] = useState([]);

  const getNoti = async () => {
    await instance.get("/notifications").then((res) => {
      console.log(res);
      const newNotifications = res.data.data.map((data) => ({
        id: data.notificationId,
        message: data.message,
        notificationType: data.notificationType,
        date: data.dateTime.toString().split("T")[0],
        isChecked: data.isChecked,
        time: data.dateTime.toString().split("T")[1].split(".")[0].slice(0, 5),
      }));
      console.log(newNotifications);
      setNotifications((prevNotifications) => [
        ...newNotifications,
        ...prevNotifications,
      ]);
    });
  };

  useEffect(() => {
    getNoti();
  }, []);

  useEffect(() => {
    const newNotification = [...new Set(notifications.map(JSON.stringify))].map(
      JSON.parse
    );
    setNotification(newNotification);
  }, [notifications]);

  useEffect(() => {
    let eventSource;
    const fetchSse = async () => {
      try {
        //EventSource생성.
        eventSource = new EventSourcePolyfill(
          "https://eb.jxxhxxx.shop/connect",
          {
            //headers에 토큰을 꼭 담아줘야 500이 안뜬다.
            headers: {
              Authorization: sessionStorage.getItem("accessToken"),
            },
            withCredentials: true,
          }
        );
        // SSE 연결 성공 시 호출되는 이벤트 핸들러
        eventSource.onopen = () => {
          console.log("SSE onopen");
        };
        //알림이 왔을 때 취할 액션은 이 아래에.
        eventSource.onmessage = async (event) => {
          const data = await JSON.parse(event.data);
          console.log("data.content만 출력하면 이렇게", data.content);
          console.log(data);
        };
        // 연결시에 콘솔이 찍힌다.
        eventSource.addEventListener("connect", (event) => {
          console.log(event.data);
        });

        eventSource.addEventListener("invite", (event) => {
          const data = JSON.parse(event.data);
          console.log("invite메세지 도착! parsing한거", data);
          const newNotification = {
            id: data.notificationId,
            message: data.message,
            notificationType: data.notificationType,
            date: data.dateTime.toString().split("T")[0],
            isChecked: data.isChecked,
          };
          alert("invite메세지 도착! parsing한거", data);
          setNotifications((prevNotifications) => [
            newNotification,
            ...prevNotifications,
          ]);
          setNotification(
            [...new Set(notifications.map(JSON.stringify))].map(JSON.parse)
          );
        });

        eventSource.addEventListener("follow", (event) => {
          const data = JSON.parse(event.data);
          console.log("follow메세지 도착! parsing한거", data);
          const newNotification = {
            id: data.notificationId,
            message: data.message,
            notificationType: data.notificationType,
            date: data.dateTime.toString().split("T")[0],
            isChecked: data.isChecked,
          };

          console.log("follow알림도착!", data.message);
          setNotifications((prevNotifications) => [
            newNotification,
            ...prevNotifications,
          ]);
          setNotification(
            [...new Set(notifications.map(JSON.stringify))].map(JSON.parse)
          );
        });
      } catch (error) {
        console.log("에러발생:", error);
      }
    };
    fetchSse();
    console.log(notification);
    return () => {
      eventSource.close();
    };
  }, [notification]);

  return (
    <div className="bg-[#FFFFFF] h-full">
      <div>
        {notification.map((notification) => (
          <div key={notification.id}>
            <div>
              <div
                style={
                  notification.isChecked === true
                    ? { backgroundColor: "#F4F4F4", fontWeight: "light" }
                    : { fontWeight: "bold", backgroundColor: "white" }
                }
                onClick={() => {
                  instance.get(`/notifications/${notification.id}`);
                  notification.notificationType === "SCHEDULE"
                    ? navigate("/scheduleinvitation")
                    : navigate("/follow");
                }}
                className="pl-[20px] pr-[20px] pt-[20px] h-[86px]  text-left text-[#121213] border-solid border-[rgb(219,219,219)] border-b-[1px]"
              >
                <div>
                  {notification.notificationType === "FRIENDSHIP" ? (
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
                  <div className="mt-[-30px] text-[14px] ml-[50px]">
                    {notification.message}
                  </div>
                  <br />
                  <span className="text-[#6F6F6F] text-[13px] ml-[50px]">
                    {notification.date}
                    <span className="ml-[5px]">{notification.time}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationsList;
