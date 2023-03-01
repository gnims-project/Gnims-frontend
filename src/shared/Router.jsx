import React from "react";
import { Route, Routes, Navigate} from "react-router-dom";
import Layout from "../components/layout/Layout";
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
import InputEmailPage from "../page/InputEmailPage";
import FriendsMain from "../components/main/FriendsMain";
import ChangePasswordPage from "../page/ChangePasswordPage";


const Router = () => {
  const userId = sessionStorage.getItem("userId");
  console.log(userId)
  return (
      <Layout>
        <Routes>
          {/* 메인과 디테일 페이지 */}
          {/* <Route path="/main" element={<InfiniteScroll />} /> */}
          <Route path="/" element={userId? <MainPage /> : <Navigate replace to='/login' />} />
          <Route path="/main" element= {userId? <MainPage /> : <Navigate replace to='/login' />} />
          <Route path="/detail/:id" element={userId? <ScheduleDetailPage /> : <Navigate replace to='/login' />} />
          <Route path="/friends/:id" element={userId? <FriendsMain /> : <Navigate replace to='/login' />} />  
          <Route path="/friendsdetail/:id" element={userId? <ScheduleDetailPage /> : <Navigate replace to='/login' />} />
          <Route path="/schedule" element={userId? <ScheduleRegisterPage /> : <Navigate replace to='/login' />} />
          <Route path="/schedule/edit" element={userId? <ScheduleRegisterPage /> : <Navigate replace to='/login' />} />

          {/* 무한스크롤 */}
          <Route path="/mainInfinite" element={userId? <InfiniteScroll /> : <Navigate replace to='/login' />} />

          {/* 회원가입 */}
          <Route path="/signup" element={userId? <SignupPage /> : <Navigate replace to='/login' />} />
          <Route path="/signup/setProfileName" element={userId? <SetProfileNamePage /> : <Navigate replace to='/login' />}/>
          <Route path="/signup/setProfileImg" element={userId? <SetProfileImgPage /> : <Navigate replace to='/login' />} />

          {/* 로그인 */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/kakaoLogin" element={<KakaoLogin />} />
          <Route path="auth/kakao/callback" element={<KakaoLoginLoding />} />
          <Route path="/naver/login" element={<NaverLoginPage />} />
          <Route path="/auth/naver/callback" element={<NaverLoginLoding />} />
          <Route path="/login/auth/InputEmail" element={<InputEmailPage />} />

          {/* 마이페이지 */}
          <Route path="/profile" element={userId? <Profile /> : <Navigate replace to='/login' />} />
          <Route path="/scheduleinvitation" element={userId? <ScheduleInvitation /> : <Navigate replace to='/login' />} />
          <Route path="/follow" element={userId? <FollowPage /> : <Navigate replace to='/login' />} />
          <Route path="/pastEvents" element={userId? <PastEventsPage /> : <Navigate replace to='/login' />} />
          <Route path="/editProfile" element={userId? <ProfileEditPage /> : <Navigate replace to='/login' />} />
          <Route path="/ChangePassword" element={userId? <ChangePasswordPage /> : <Navigate replace to='/login' />} />

          {/* 알람 */}
          <Route path="/notification" element={userId? <NotificationsPage /> : <Navigate replace to='/login' />} />

          {/* 찾기 */}
          <Route path="/userSearch" element={userId? <UserSearchPage /> : <Navigate replace to='/login' />} />

        </Routes>
      </Layout>
   
  );
};

export default Router;

