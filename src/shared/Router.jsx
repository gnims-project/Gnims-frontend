import React, { useEffect, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Layout from "../components/layout/Layout";
import KakaoLogin from "../components/login/KakaoLogin";
import KakaoLoginLoding from "../components/login/KakaoLoginLoding";
import NaverLoginLoding from "../components/login/NaverLoginLoding";
import Profile from "../components/mypage/Profile";
import ScheduleInvitation from "../components/mypage/ScheduleInvitation";
import InfiniteScroll from "../components/main/InfiniteScroll";
import FriendsMain from "../components/main/FriendsMain";
import {
  ChangePasswordPage,
  InputEmailPage,
  UserSearchPage,
  PastEventsPage,
  ProfileEditPage,
  NotificationsPage,
  SetProfileImgPage,
  SetProfileNamePage,
  MainPage,
  ScheduleDetailPage,
  ScheduleRegisterPage,
  FollowPage,
  NaverLoginPage,
  SignupPage,
  LoginPage,
  DevelopIng,
} from "../page/index";

const Router = () => {
  const [userId, setUserId] = useState(null);
  console.log(userId);
  console.log(userId ? "참" : "거짓");

  useEffect(() => {
    const getUserId = sessionStorage.getItem("userId");
    setUserId(() => getUserId);
    console.log(userId);
  }, [userId]);

  return (
    <Layout>
      <Routes>
        {/* 메인과 디테일 페이지 */}
        {/* <Route path="/main" element={<InfiniteScroll />} /> */}
        {userId ? (
          <Route path="/" element={<MainPage />} />
        ) : (
          <Route path="/" element={<LoginPage />} />
        )}

        <Route
          path="/main"
          element={userId ? <MainPage /> : <Navigate replace to="/login" />}
        />
        <Route
          path="/detail/:id"
          element={
            userId ? <ScheduleDetailPage /> : <Navigate replace to="/login" />
          }
        />
        <Route
          path="/friends/:id"
          element={userId ? <FriendsMain /> : <Navigate replace to="/login" />}
        />
        <Route
          path="/friendsdetail/:id"
          element={
            userId ? <ScheduleDetailPage /> : <Navigate replace to="/login" />
          }
        />
        <Route
          path="/schedule"
          element={
            userId ? <ScheduleRegisterPage /> : <Navigate replace to="/login" />
          }
        />
        <Route
          path="/schedule/edit"
          element={
            userId ? <ScheduleRegisterPage /> : <Navigate replace to="/login" />
          }
        />

        {/* 무한스크롤 */}
        <Route
          path="/mainInfinite"
          element={
            userId ? <InfiniteScroll /> : <Navigate replace to="/login" />
          }
        />

        {/* 회원가입 */}
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/signup/setProfileName" element={<SetProfileNamePage />} />
        <Route path="/signup/setProfileImg" element={<SetProfileImgPage />} />

        {/* 로그인 */}
        <Route
          path="/login"
          element={userId ? <Navigate replace to="/main" /> : <LoginPage />}
        />
        <Route path="/kakaoLogin" element={<KakaoLogin />} />
        <Route path="auth/kakao/callback" element={<KakaoLoginLoding />} />
        <Route path="/naver/login" element={<NaverLoginPage />} />
        <Route path="/social/naver-login" element={<NaverLoginLoding />} />
        <Route path="/login/auth/InputEmail" element={<InputEmailPage />} />

        {/* 마이페이지 */}
        <Route
          path="/profile"
          element={userId ? <Profile /> : <Navigate replace to="/login" />}
        />
        <Route
          path="/scheduleinvitation"
          element={
            userId ? <ScheduleInvitation /> : <Navigate replace to="/login" />
          }
        />
        <Route
          path="/follow"
          element={userId ? <FollowPage /> : <Navigate replace to="/login" />}
        />
        <Route
          path="/pastEvents"
          element={
            userId ? <PastEventsPage /> : <Navigate replace to="/login" />
          }
        />
        <Route
          path="/editProfile"
          element={
            userId ? <ProfileEditPage /> : <Navigate replace to="/login" />
          }
        />
        <Route path="/ChangePassword" element={<ChangePasswordPage />} />

        {/* 알람 */}
        <Route
          path="/notification"
          element={
            userId ? <NotificationsPage /> : <Navigate replace to="/login" />
          }
        />

        {/* 찾기 */}
        <Route
          path="/userSearch"
          element={
            userId ? <UserSearchPage /> : <Navigate replace to="/login" />
          }
        />

        {/* 개발중 */}
        <Route path="/developing" element={<DevelopIng />} />
      </Routes>
    </Layout>
  );
};

export default Router;
