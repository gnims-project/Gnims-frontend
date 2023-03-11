import React, { useEffect, useState } from "react";
import { EventSourcePolyfill } from "event-source-polyfill";
import mentionIcon from "../../img/mention.svg";
import followIcon from "../../img/follow.svg";
import { useNavigate } from "react-router-dom";
import { instance } from "../../shared/AxiosInstance";

const NotificationsList = () => {
  const navigate = useNavigate();
  //notifications는 알림을 담는 배열이다.
  const [notifications, setNotifications] = useState([]);
  const [notification, setNotification] = useState([]);

  const readAll = async () => {
    await instance.put("/notifications");
    // const promises = notification.map((noti) =>
    //   instance.get(`/notifications/${noti.id}`)
    // );
    // await Promise.all(promises);
    // 여기서 responses 배열을 처리한다.
    window.location.reload();
  };

  const getNoti = async () => {
    await instance.get("/notifications").then((res) => {
      const newNotifications = res.data.data.map((data) => ({
        id: data.notificationId,
        message: data.message,
        notificationType: data.notificationType,
        date: data.dateTime.toString().split("T")[0],
        isChecked: data.isChecked,
        time: data.dateTime.toString().split("T")[1].split(".")[0].slice(0, 5),
      }));
      setNotifications((prevNotifications) => [...newNotifications, ...prevNotifications]);
    });
  };

  useEffect(() => {
    getNoti();
  }, []);

  useEffect(() => {
    const newNotification = [...new Set(notifications.map(JSON.stringify))].map(JSON.parse);
    setNotification(newNotification);
  }, [notifications]);

  useEffect(() => {
    let eventSource;
    const fetchSse = async () => {
      try {
        //EventSource생성.
        eventSource = new EventSourcePolyfill("https://eb.jxxhxxx.shop/connection", {
          //headers에 토큰을 꼭 담아줘야 401이 안뜬다.
          headers: {
            Authorization: sessionStorage.getItem("accessToken"),
          },
          withCredentials: true,
        });
        // SSE 연결 성공 시 호출되는 이벤트 핸들러
        eventSource.onopen = () => {
          // console.log("SSE onopen");
        };
        //알림이 왔을 때 취할 액션은 이 아래에.
        eventSource.onmessage = async (event) => {
          const data = await JSON.parse(event.data);
        };
        // 연결시에 콘솔이 찍힌다.
        eventSource.addEventListener("connect", (event) => {
          // console.log(event.data);
        });

        eventSource.addEventListener("invite", (event) => {
          const data = JSON.parse(event.data);
          // alert("초대가 도착했습니다", data.message);
          const newNotification = {
            id: data.notificationId,
            message: data.message,
            notificationType: data.notificationType,
            date: data.dateTime.toString().split("T")[0],
            isChecked: data.isChecked,
          };
          // alert("invite메세지 도착! parsing한거", data);
          setNotifications((prevNotifications) => [newNotification, ...prevNotifications]);
          setNotification([...new Set(notifications.map(JSON.stringify))].map(JSON.parse));
        });

        eventSource.addEventListener("follow", (event) => {
          const data = JSON.parse(event.data);
          const newNotification = {
            id: data.notificationId,
            message: data.message,
            notificationType: data.notificationType,
            date: data.dateTime.toString().split("T")[0],
            isChecked: data.isChecked,
          };

          setNotifications((prevNotifications) => [newNotification, ...prevNotifications]);
          setNotification([...new Set(notifications.map(JSON.stringify))].map(JSON.parse));
        });
      } catch (error) {
        // console.log("에러발생:", error);
      }
    };
    // @0307 14:20 현재페이지에서 CORS에러생기고 4번씩 요청보내는 문제가 있음. 알림페이지에서는 SSE연결 하지않는걸로.
    // fetchSse();
  }, [notification]);

  return (
    <div className="bg-[#FFFFFF] w-[375px] h-full">
      <div className="flex flex-row-reverse">
        <div
          onClick={readAll}
          className=" text-[14px] font-extralight items-center w-[100px] flex h-[40px] justify-center  rounded-[4px] text-[#002C51]  cursor-pointer"
        >
          모두 읽음표시
        </div>
      </div>
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
                  notification.notificationType === "SCHEDULE" ? navigate("/scheduleinvitation") : navigate("/follow");
                }}
                className="pl-[20px] pr-[20px] pt-[20px] h-[86px]  text-left text-[#121213] border-solid border-[rgb(219,219,219)] border-b-[1px]"
              >
                <div>
                  {notification.notificationType === "FRIENDSHIP" ? (
                    <img src={followIcon} alt="followIcon" className="h-[26px] w-[26px] flex " />
                  ) : (
                    <img src={mentionIcon} alt="mentionIcon" className="h-[26px] w-[26px] " />
                  )}
                  <div className="mt-[-30px] text-[14px] ml-[50px]">{notification.message}</div>
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
