import React from "react";
import Notifications_Test from "./NotificationsTest2";

const NotificationList = () => {
  return (
    <>
      {/* 확인안한 것은 볼드처리, 확인한 것은 라이트  */}
      <div className="pt-[50px]">NotificationList</div>
      <Notifications_Test />
    </>
  );
};

export default NotificationList;
