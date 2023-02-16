import React from "react";
import TopNavBar from "../components/layout/TopNavBar";
import NotificationList from "../components/notification/NotificationList";

const NotificationsPage = () => {
  return (
    <>
      <div className="h-[734px] width-[375px]">
        <TopNavBar />
        <NotificationList />
      </div>
    </>
  );
};

export default NotificationsPage;
