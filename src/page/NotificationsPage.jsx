import React from "react";
import BottomNavi from "../components/layout/BottomNavi";
import TopNavTitleBar from "../components/layout/TopNavTitleBar";
import NotificationsList from "../components/notification/NotificationsList";

const NotificationsPage = () => {
  return (
    <>
      <div className="h-screen width-[375px]">
        <TopNavTitleBar />
        <NotificationsList />
        <BottomNavi />
      </div>
    </>
  );
};

export default NotificationsPage;
