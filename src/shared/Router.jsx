import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "../components/layout/Layout";
import styled from "styled-components";
import LoginPage from "../page/LoginPage";
import SignupPage from "../page/SingupPage";
import KakaoLogin from "../components/login/KakaoLogin";
import KakaoLoginLoding from "../components/login/KakaoLoginLoding";
import NaverLoginPage from "../page/NaverLoginPage";
import NaverLoginLoding from "../components/login/NaverLoginLoding";
import FollowPage from "../page/FollowPage";
import Profile from "../components/mypage/Profile";
import ScheduleRegisterPage from "../page/ScheduleRegisterPage";
import ScheduleDetailPage from "../page/ScheduleDetailPage";
import MainPage from "../page/MainPage";
import SetProfileNamePage from "../page/SetProfileNamePage";
import SetProfileImgPage from "../page/SetProfileImgPage";
import NotificationsPage from "../page/NotificationsPage";
import ScheduleInvitation from "../components/mypage/ScheduleInvitation";
import ProfileEditPage from "../page/ProfileEditPage";

import InfiniteScroll from "../components/main/InfiniteScroll";
import PastEventsPage from "../page/PastEventsPage";
import UserSearchPage from "../page/UserSearchPage";

const Router = () => {
  return (
    <Container>
      <Layout>
        <Routes>
          {/* 메인과 디테일 페이지 */}
          <Route path="/main" element={<MainPage />} />
          {/* <Route path="/main" element={<InfiniteScroll />} /> */}
          {localStorage.getItem("nickname") ? (
            <Route path="/" element={<MainPage />} />
          ) : (
            <Route path="/" element={<LoginPage />} />
          )}
          <Route path="/detail/:id" element={<ScheduleDetailPage />} />
          <Route path="/schedule" element={<ScheduleRegisterPage />} />

          {/* 무한스크롤 */}
          <Route path="/mainInfinite" element={<InfiniteScroll />} />

          {/* 회원가입 */}
          <Route path="/signup" element={<SignupPage />} />
          <Route
            path="/signup/setProfileName"
            element={<SetProfileNamePage />}
          />
          <Route path="/signup/setProfileImg" element={<SetProfileImgPage />} />

          {/* 로그인 */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/kakaoLogin" element={<KakaoLogin />} />
          <Route path="auth/kakao/callback" element={<KakaoLoginLoding />} />
          <Route path="/naver/login" element={<NaverLoginPage />} />
          <Route path="/auth/naver/callback" element={<NaverLoginLoding />} />

          {/* 마이페이지 */}
          <Route path="/profile" element={<Profile />} />
          <Route path="/scheduleinvitation" element={<ScheduleInvitation />} />
          <Route path="/follow" element={<FollowPage />} />
          <Route path="/pastEvents" element={<PastEventsPage />} />
          <Route path="/editProfile" element={<ProfileEditPage />} />
          {/* 알람 */}
          <Route path="/notification" element={<NotificationsPage />} />

          {/* 찾기 */}
          <Route path="/userSearch" element={<UserSearchPage />}></Route>
        </Routes>
      </Layout>
    </Container>
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
