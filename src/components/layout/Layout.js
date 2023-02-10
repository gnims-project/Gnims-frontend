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
  position: relative;
  opacity: 1;
  box-sizing: border-box;

  -ms-overflow-style: none;
  background-color: white;

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
    width: 600px;
    background-color: #f4f5f7;
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
  }
`;
