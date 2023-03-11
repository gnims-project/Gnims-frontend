import React, { useEffect, useState } from "react";
import mentionIcon from "../../img/mention.svg";
import followIcon from "../../img/follow.svg";
import responseIcon from "../../img/response.svg";
import rejectIcon from "../../img/reject.svg";
import { useNavigate } from "react-router-dom";
import { instance } from "../../shared/AxiosInstance";

const NotificationsList = () => {
  const navigate = useNavigate();
  //notifications는 알림을 담는 배열이다.
  const [notifications, setNotifications] = useState([]);
  const [notification, setNotification] = useState([]);
  const icon = (props) => {
    if (props.notificationType === "FRIENDSHIP") {
      return <img src={followIcon} alt="followIcon" className="h-[26px] w-[26px] flex " />;
    } else if (props.notificationType === "SCHEDULE") {
      return <img src={mentionIcon} alt="mentionIcon" className="h-[26px] w-[26px] flex " />;
    } else if (props.notificationType === "INVITE_RESPONSE") {
      if (props.message.includes("거절")) {
        return <img src={rejectIcon} alt="rejectIcon" />;
      } else return <img src={responseIcon} alt="responseIcon" className="h-[22px] w-[22px] flex" />;
    }
  };
  const path = (props) => {
    if (props === "FRIENDSHIP") {
      return navigate("/follow");
    } else if (props === "SCHEDULE") {
      return navigate("/scheduleinvitation");
    } else if (props === "INVITE_RESPONSE") {
      return navigate("/main");
    }
  };
  const readAll = async () => {
    await instance.put("/notifications");
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
                  path(notification.notificationType);
                }}
                className="pl-[20px] pr-[20px] pt-[20px] h-[86px]  text-left text-[#121213] border-solid border-[rgb(219,219,219)] border-b-[1px]"
              >
                <div>
                  <div>{icon(notification)}</div>
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
