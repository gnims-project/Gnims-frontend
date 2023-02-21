import React from "react";
import NotificationsTest from "./NotificationsTest";

const NotificationList = () => {
  return (
    <>
      {/* 확인안한 것은 볼드처리, 확인한 것은 라이트  */}
      <div className="pt-[50px]">NotificationList</div>
      <NotificationsTest />
    </>
  );
};

export default NotificationList;
