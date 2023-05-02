import React from "react";
import TopNavBar from "./TopNavBar";
import BottomNavi from "./BottomNavi";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import TopNavTitleBar from "./TopNavTitleBar";

const Layout = ({ children }) => {
  const pagePathName = useLocation();
  const [header, setHeader] = useState(null);
  const id = pagePathName.pathname.split("/")[2];

  useEffect(() => {
    const userId = sessionStorage.getItem("userId");
    const pageName = pagePathName.pathname;

    switch (pageName) {
      case "/":
        if (userId !== null) {
          setHeader(() => <TopNavBar />);
        }
        break;
      case "/main":
        setHeader(() => <TopNavBar />);
        break;
      case `/detail/${id}`:
        setHeader(() => <TopNavBar />);
        break;
      case `/friendsdetail/${id}`:
        setHeader(() => (
          <TopNavTitleBar>
            {sessionStorage.getItem("clickedUserName")}님의 일정
          </TopNavTitleBar>
        ));
        break;
      case `/friends/${id}`:
        setHeader(() => (
          <TopNavTitleBar>
            {sessionStorage.getItem("clickedUserName")}님의 일정
          </TopNavTitleBar>
        ));
        break;
      case "/schedule":
        setHeader(() => <TopNavTitleBar>일정 추가</TopNavTitleBar>);
        break;
      case "/schedule/edit":
        setHeader(() => <TopNavTitleBar>일정 수정</TopNavTitleBar>);
        break;
      case "/signup":
        setHeader(() => <TopNavTitleBar> 회원가입 </TopNavTitleBar>);
        break;
      case "/signup/setProfileName":
        setHeader(() => <TopNavTitleBar>프로필 설정</TopNavTitleBar>);
        break;
      case "/signup/setProfileImg":
        setHeader(() => <TopNavTitleBar>프로필 설정</TopNavTitleBar>);
        break;
      case "/profile":
        setHeader(() => <TopNavTitleBar>마이페이지</TopNavTitleBar>);
        break;
      case "/scheduleinvitation":
        setHeader(() => <TopNavTitleBar>내게 온 초대목록</TopNavTitleBar>);
        break;
      case "/follow":
        setHeader(() => <TopNavTitleBar>팔로우 목록</TopNavTitleBar>);
        break;
      case "/pastEvents":
        setHeader(() => <TopNavTitleBar>나의 지난 일정</TopNavTitleBar>);
        break;
      case "/notification":
        setHeader(() => <TopNavTitleBar>알림</TopNavTitleBar>);
        break;
      case "/userSearch":
        setHeader(() => <TopNavTitleBar>유저 검색</TopNavTitleBar>);
        break;
      case "/editProfile":
        setHeader(() => <TopNavTitleBar>프로필 변경</TopNavTitleBar>);
        break;
      case "/login/auth/InputEmail":
        setHeader(() => <TopNavTitleBar>이메일 입력</TopNavTitleBar>);
        break;
      case "/ChangePassword":
        setHeader(() => <TopNavTitleBar>비밀번호 수정</TopNavTitleBar>);
        break;
      case "/developing":
        setHeader(() => <TopNavTitleBar>개발중...</TopNavTitleBar>);
        break;
      default:
        setHeader(null);
        break;
    }
  }, [pagePathName.pathname, id]);

  return (
    <div className="flex flex-1 justify-center">
      <div className="flex flex-col justify-between h-[100vh] min-w-[375px] bg-[#f8fcff]">
        {header}
        <div className="flex flex-1 overflow-scroll scrollbar-hide">
          {children}
        </div>
        {pagePathName.pathname === "/login" ||
        pagePathName.pathname === "/signup" ||
        pagePathName.pathname === "/signup/setProfileName" ||
        pagePathName.pathname === "/signup/setProfileImg" ||
        pagePathName.pathname === "/main" ||
        pagePathName.pathname === "/" ||
        pagePathName.pathname === `/detail/${id}` ? null : (
          <BottomNavi />
        )}
      </div>
    </div>
  );
};
export default Layout;
