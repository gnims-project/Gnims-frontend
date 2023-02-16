import styled from "styled-components";
import React from "react";

const Layout = ({ children }) => {
  return <Container>{children}</Container>;
};

export default Layout;

const Container = styled.div`
  /* 모바일 크기 고정 */
  width: 100%;
  max-width: 375px;
  height: 100vh;
  position: absolute;
  opacity: 1;
  box-sizing: border-box;
  top: "calc(50% - 167px/2)";
  -ms-overflow-style: none;
  background-color: #edf7ff;

  font-family: Pretendard-Regular;
  //스크롤창 숨기기
  overflow-y: scroll;
  /* IE and Edge */
  -ms-overflow-style: none;
  /* Firefox */
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
  @media screen and (max-width: 768px) {
    width: 375px;
    background-color: #edf7ff;
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
  }
`;
