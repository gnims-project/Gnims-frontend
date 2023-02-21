import React from "react";
import FollowList from "../components/follow/FollowList";
import BottomNavi from "../components/layout/BottomNavi";
import TopNavBar from "../components/layout/TopNavBar";

const Follow = () => {
  return (
    <div>
      <TopNavBar />
      <FollowList />
      <BottomNavi />
    </div>
  );
};

export default Follow;
