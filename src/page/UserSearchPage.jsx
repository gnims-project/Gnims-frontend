import React from "react";
import UserSearch from "../components/follow/UserSearch";
import BottomNavi from "../components/layout/BottomNavi";
import TopNavTitleBar from "../components/layout/TopNavTitleBar";

const UserSearchPage = () => {
  return (
    <>
      <TopNavTitleBar>유저 검색</TopNavTitleBar>
      <UserSearch />
      <BottomNavi />
    </>
  );
};

export default UserSearchPage;
