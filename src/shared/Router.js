import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "../components/layout/Layout";
import styled from "styled-components";
import Callback from "../components/login/Callback";
import ScheduleRegisterPage from "../page/ScheduleRegisterPage";
import NaverLoginPage from "../page/NaverLoginPage";

const Router = () => {
  return (
    <BrowserRouter>
      <Container>
        <Layout>
          <h1 className="text-3xl font-bold underline">Hello world!</h1>
          <Routes>
            <Route path="/callback" element={<Callback />} />
            <Route path="/schedules" element={<ScheduleRegisterPage />} />
            <Route path="/naver/login" element={<NaverLoginPage />} />
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
