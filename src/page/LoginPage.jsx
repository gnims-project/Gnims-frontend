import React from "react";
import TopNavBar from "../components/layout/TopNavBar";
import EmailLogin from "../components/login/EmailLogin";
//네비바 테스트 후 지워야합니다
const LoginPage = () => {
  return (
    <div>
      <TopNavBar></TopNavBar>
      <EmailLogin />
    </div>
  );
};

export default LoginPage;
