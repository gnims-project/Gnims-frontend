import React from "react";
import Signup from "../components/signup/Signup";
import TopNavTitleBar from "../components/layout/TopNavTitleBar";
const SignupPage = () => {
  return (
    <>
      <TopNavTitleBar>회원가입</TopNavTitleBar>
      <Signup />
    </>
  );
};

export default SignupPage;
