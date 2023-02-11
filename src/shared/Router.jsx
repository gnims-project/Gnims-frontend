import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "../components/layout/Layout";
import styled from "styled-components";
import LoginPage from "../page/LoginPage";
import SignupPage from "../page/SingupPage";
const Router = () => {
  return (
    <BrowserRouter>
      <Container>
        <Layout>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
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
