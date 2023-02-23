import styled from "styled-components";
import React from "react";
import TopNavBar from "./TopNavBar";
import BottomNavi from "./BottomNavi";
import { useLocation } from "react-router-dom";

const Layout = ({ children }) => {
  const pagePathName = useLocation();
  return (
    <OutWrap>
      <Container>
        <div>
          {pagePathName !== "/login" && <TopNavBar />}
          <Slider>{children}</Slider>
        </div>
        {pagePathName !== "/login" && <BottomNavi />}
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
  overflow: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  ::-webkit-scrollbar {
    display: none;
  }
`;
