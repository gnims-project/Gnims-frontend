import React from "react";
import PastEvents from "../components/mypage/PastEvents";
import TopNavTitleBar from "../components/layout/TopNavTitleBar";
const PastEventsPage = () => {
  return (
    <>
      <TopNavTitleBar>나의 지난 일정</TopNavTitleBar>
      <PastEvents />
    </>
  );
};

export default PastEventsPage;
