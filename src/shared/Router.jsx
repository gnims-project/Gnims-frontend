import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "../components/layout/Layout";
import styled from "styled-components";
import LoginPage from "../page/LoginPage";
import SignupPage from "../page/SingupPage";
import KakaoLogin from "../components/login/KakaoLogin";
import KakaoLoginLoding from "../components/login/KakaoLoginLoding";
import FollowList from "../components/follow/FollowList";
import ScheduleRegisterPage from "../page/ScheduleRegisterPage";
import NaverLoginPage from "../page/NaverLoginPage";
import Callback from "../page/callback";
import ScheduleDetailPage from "../page/ScheduleDetailPage";

const Router = () => {
  return (
    <BrowserRouter>
      <Container>
        <Layout>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/kakaoLogin" element={<KakaoLogin />} />
            <Route path="auth/kakao/callback" element={<KakaoLoginLoding />} />
            <Route path="/follow" element={<FollowList />} />
            <Route path="/schedule" element={<ScheduleRegisterPage />} />
            <Route path="/naver/login" element={<NaverLoginPage />} />
            <Route path="/callback" element={<Callback />} />
            <Route path="/detail" element={<ScheduleDetailPage />} />
          </Routes>
        </Layout>
      </Container>
    </BrowserRouter>
  );
};

export default Router;
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  box-sizing: border-box;
`;
