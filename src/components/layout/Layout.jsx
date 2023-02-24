import styled from "styled-components";
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
  console.log(id);
  useEffect(() => {
    const userId = window.localStorage.getItem("userId");
    const pageName = pagePathName.pathname;
    switch (pageName) {
      case "/":
        if (userId !== null) {
          setHeader(() => <TopNavBar />);
        } else {
          setHeader(() => <TopNavTitleBar></TopNavTitleBar>);
        }
        break;
      case "/main":
        setHeader(() => <TopNavBar />);
        break;
      case `/detail/${id}`:
        setHeader(() => <TopNavBar />);
        break;
      case "/schedule":
        setHeader(() => <TopNavTitleBar>일정 추가</TopNavTitleBar>);
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
      default:
        setHeader(null);
        break;
    }
  }, [pagePathName.pathname, id]);

  return (
    <OutWrap>
      <Container>
        {header}
        <Slider>{children}</Slider>
        {pagePathName.pathname === "/Login" ||
        pagePathName.pathname === "/signup" ||
        pagePathName.pathname === "/signup/setProfileName" ||
        pagePathName.pathname === "/signup/setProfileImg" ||
        pagePathName.pathname === `/detail/${id}` ? null : (
          <BottomNavi />
        )}
      </Container>
    </OutWrap>
  );
};

export default Layout;

const OutWrap = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;

  /* box-sizing: border-box; */
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
  min-width: 375px;
  background-color: #edf7ff;
  font-family: Pretendard-Regular;
`;

const Slider = styled.div`
  flex: 1;
  overflow: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  ::-webkit-scrollbar {
    display: none;
  }
`;
