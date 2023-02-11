import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "../components/layout/Layout";
import styled from "styled-components";
import KakaoLogin from "../components/login/KakaoLogin";
import KakaoLoginLoding from "../components/login/KakaoLoginLoding";
import FollowList from "../components/follow/FollowList";

const Router = () => {
  return (
    <BrowserRouter>
      <Container>
        <Layout>
          <Routes>
            <Route path="/" element={<KakaoLogin />} />
            <Route path="auth/kakao/callback" element={<KakaoLoginLoding />} />
            <Route path="/follow" element={<FollowList />} />
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
