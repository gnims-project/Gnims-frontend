import React from "react";
import SetProfileName from "../components/signup/SetProfileName";
import TopNavTitleBar from "../components/layout/TopNavTitleBar";

const SetProfileNamePage = () => {
  return (
    <>
      <TopNavTitleBar>프로필 설정</TopNavTitleBar>
      <SetProfileName />
    </>
  );
};

export default SetProfileNamePage;
