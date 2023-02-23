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
      case "/detail/:id":
        setHeader(() => <TopNavBar />);
        break;
      case "/schedule":
        setHeader(() => <TopNavTitleBar></TopNavTitleBar>);
        break;
      case "/signup":
        setHeader(() => <TopNavTitleBar></TopNavTitleBar>);
        break;
      case "/signup/setProfileName":
        setHeader(() => <TopNavTitleBar></TopNavTitleBar>);
        break;
      case "/signup/setProfileImg":
        setHeader(() => <TopNavTitleBar></TopNavTitleBar>);
        break;
      case "/profile":
        setHeader(() => <TopNavTitleBar></TopNavTitleBar>);
        break;
      case "/scheduleinvitation":
        setHeader(() => <TopNavTitleBar></TopNavTitleBar>);
        break;
      case "/follow":
        setHeader(() => <TopNavTitleBar></TopNavTitleBar>);
        break;
      case "/pastEvents":
        setHeader(() => <TopNavTitleBar></TopNavTitleBar>);
        break;
      case "/notification":
        setHeader(() => <TopNavTitleBar></TopNavTitleBar>);
        break;
      case "/userSearch":
        setHeader(() => <TopNavTitleBar></TopNavTitleBar>);
        break;
      default:
        setHeader(null);
        break;
    }
    console.log(header);
  }, []);

  return (
    <OutWrap>
      <Container>
        {header}
        <Slider>{children}</Slider>
        {pagePathName.pathname ===
        ("/Login" ||
          "/signup" ||
          "/signup/setProfileName" ||
          "/signup/setProfileImg") ? null : (
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
